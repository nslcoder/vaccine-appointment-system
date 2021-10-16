const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const { genPDF } = require('./helpers/genpdf');
const path = require('path');
const { existsSync } = require('fs');
const User = require('../models/User');

// Render the main page
const renderIndex = (req, res) => {
    try {
        res.render('index');
    } catch(err) {
        res.send(err);
    }
};

// Redirects the authenticated user to the dashboard
const accessDashboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const username = user.name.split(' ').join('').toLowerCase();
    
        res.redirect(`/users/dashboard/${username}/${userId}`);
    } catch(err) {
        res.send(err); 
    };
};

// Render the dashboard 
const renderDashboard = async (req, res) => {
    try {
        const { username, userId } = req.params;
        const user = await User.findById(userId);
        const name = user.name;
        const email = user.email;
    
        res.render('dashboard', { name: name, email: email, username: username, userId: userId });   
    } catch(err) {
        res.send(err); 
    };
};

// Render the register page
const renderRegister = (req, res) => {
    try {
        res.render('register');
    } catch(err) {
        res.send(err);
    }
};

// Register a user
const registerUser = (req, res) => {
    try {
        const { password } = req.body;

        bcrypt.hash(password, 10, async (err, hash) => {
            if(err) return console.log(err);
            req.body.password = hash;
            await User.create(req.body);
            res.redirect('/');
        });
    } catch(err) {
        res.send(err);
    }
};

// Render the form to create an appointment
const renderAppointment = (req, res) => {
    try {
        const { _id: userId, name } = req.user;
        const username = name.split(' ').join('').toLowerCase();

        if(req.user.appointment.apptID !== undefined) { 
            res.redirect(`/users/dashboard/${username}/${userId}`);
        } else {
            res.render('create');
        }
    } catch(err) {
        res.send(err);
    }
}; 

// Create an appointment
const createAppointment = async (req, res) => {
    try {
        const user = req.user;
    
        const { name, email, _id: userId } = user;
    
        const username = name.split(' ').join('').toLowerCase();
    
        const { birthdate, gender, mobile, address, vaxstation, vaxdate, medcond, agreed  } = req.body;
    
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
    
        res.redirect(`/users/dashboard/${username}/${userId}`);
    } catch(err) {
        res.send(err);
    }
};

// Render the edit form
const renderEdit = async (req, res) => {
    try {
        const user = req.user;
        const { _id: userId, name } = user;
        const username = name.split(' ').join('').toLowerCase();

        if(user.appointment.apptID == undefined) {
            res.redirect(`/users/dashboard/${username}/${userId}`);
        } else {
            const datevalue = user.appointment.birthdate.toISOString().split('T')[0];
            const vaxdatevalue = user.appointment.vaxdate.toISOString().split('T')[0];    
    
            res.render('edit', { appointment: user.appointment, datevalue: datevalue, vaxdatevalue: vaxdatevalue, userId: userId });
        }
    } catch(err) {
        res.send(err);
    }
};

// Edit the appointment
const editAppointment = async (req, res) => {
    try {
        const user = req.user;
        const { username, userId } = req.params;
    
        user.appointment.birthdate = req.body.birthdate;
        user.appointment.gender = req.body.gender;
        user.appointment.mobile = req.body.mobile;
        user.appointment.address = req.body.address;
        user.appointment.vaxstation = req.body.vaxstation;
        user.appointment.vaxdate = req.body.vaxdate;
        user.appointment.medcond = req.body.medcond;
    
        await user.save();
    
        const { name, email, appointment } = user;
    
        const apptData = { 
            name,
            email,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            mobile: req.body.mobile,
            address: req.body.address,
            vaxstation: req.body.vaxstation,
            vaxdate: req.body.vaxdate
        }
    
        const apptID = appointment.apptID;
    
        await genPDF(apptData, apptID);
    
        res.redirect(`/users/dashboard/${username}/${userId}`);
    } catch(err) {
        res.send(err);
    }
};

// View the appointment
const getAppointment = async (req, res) => {
    try {
        const { userId, username } = req.params;
        const pdffile = path.join(__dirname, `../pdfstorage/${username}.pdf`);
    
        if(existsSync(pdffile)) {
            res.sendFile(pdffile);
        } else {
            res.redirect(`/users/dashboard/${username}/${userId}`);
        }
    } catch(err) {
        res.send(err);
    }
};

// Logout the user from the dashboard
const logoutUser = async (req, res) => {
    try {
        req.logout();
        res.redirect('/');
    } catch(err) {
        res.send(err);
    }
};

// Render the 404 page
const render404 = (req, res) => {
    try {
        res.render('404');
    } catch(err) {
        res.send(err);
    }
};

module.exports = { renderIndex, renderRegister, accessDashboard, renderDashboard, registerUser, renderAppointment, createAppointment, renderEdit, editAppointment, getAppointment, logoutUser, render404 };
