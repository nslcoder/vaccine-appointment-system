const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const { genPDF } = require('./helpers/genpdf');
const path = require('path');
const User = require('../models/User');

const renderIndex = (req, res) => {
    res.render('index');
};

const accessDashboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const username = user.name.split(' ').join('').toLowerCase();
    
        res.redirect(`/users/dashboard/${username}/${userId}`);
    } catch(err) {
        console.log(err); 
    };
};

const renderDashboard = async (req, res) => {
    try {
        const { username, userId } = req.params;
        const user = await User.findById(userId);
        const name = user.name;
        const email = user.email;
    
        res.render('dashboard', { name: name, email: email, username: username, userId: userId });   
    } catch(err) {
        console.log(err); 
    };
};

const renderRegister = (req, res) => {
    res.render('register');
};

const registerUser = (req, res) => {
    const { password } = req.body;

    bcrypt.hash(password, 10, async (err, hash) => {
        if(err) return console.log(err);
        req.body.password = hash;
        await User.create(req.body);
        res.redirect('/');
    });
};

const renderAppointment = (req, res) => {
    res.render('create');
}; 

const createAppointment = async (req, res) => {
    const { birthdate, gender, mobile, address, vaxstation, vaxdate, medcond, agreed  } = req.body;

    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    const { name, email } = user;

    const username = name.split(' ').join('').toLowerCase();

    const apptID = await uniqid();

    user.appointment.birthdate = birthdate;
    user.appointment.gender = gender;
    user.appointment.mobile = mobile;
    user.appointment.address = address;
    user.appointment.vaxstation = vaxstation;
    user.appointment.vaxdate = vaxdate;
    user.appointment.medcond = medcond;
    user.appointment.agreed = agreed;
    user.appointment.apptID = apptID;
    user.appointment.username = username;

    await user.save();

    const apptData = { name, email, birthdate, gender, mobile, address, vaxstation, vaxdate, medcond, agreed };

    await genPDF(apptData, apptID);

    res.redirect(`/users/dashboard/${username}/${userId}`)
};

const renderEdit = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const datevalue = user.appointment.birthdate.toISOString().split('T')[0];
        const vaxdatevalue = user.appointment.vaxdate.toISOString().split('T')[0];    

        res.render('edit', { appointment: user.appointment, datevalue: datevalue, vaxdatevalue: vaxdatevalue, userId: userId });
    } catch(err) {
        console.log(err);
    }
};

const editAppointment = async (req, res) => {
    const { username, userId } = req.params;

    const user = await User.findById(userId);

    user.appointment.birthdate = req.body.birthdate;
    user.appointment.gender = req.body.gender;
    user.appointment.mobile = req.body.mobile;
    user.appointment.address = req.body.address;
    user.appointment.vaxstation = req.body.vaxstation;
    user.appointment.vaxdate = req.body.vaxdate;
    user.appointment.medcond = req.body.medcond;

    await User.updateOne({ _id: userId}, user);

    res.redirect(`/users/dashboard/${username}/${userId}`);
};

const getAppointment = async (req, res) => {
    const username = req.params.username;
    const pdffile = path.join(__dirname, `../pdfstorage/${username}.pdf`);
    res.sendFile(pdffile);
} 

const logoutUser = async (req, res) => {
    req.logout();
    req.session.destroy(() => {
        res.redirect('/');
    })
};

module.exports = { renderIndex, renderRegister, accessDashboard, renderDashboard, registerUser, renderAppointment, createAppointment, renderEdit, editAppointment, getAppointment, logoutUser };
