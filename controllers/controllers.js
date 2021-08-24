const uniqid = require('uniqid');
const { genPDF } = require('./helpers/genpdf');
const path = require('path');
const Appointment = require('../models/Appointment');

const getAppointment = async (req, res) => {
    const appointName = req.params.appointName;
    const pdffile = path.join(__dirname, `../pdfstorage/${appointName}.pdf`);
    res.sendFile(pdffile);
}

const createAppointment = async (req, res) => {
    const data = req.body;
    const { name, birthdate, gender, email, mobile, address, vaxstation, vaxdate, medcond, agreed  } = data;

    const appointName = name.split(' ').join('').toLowerCase();

    const apptID = uniqid();

    const apptDoc = { name, birthdate, gender, email, mobile, address, vaxstation, vaxdate, medcond, agreed, apptID, appointName };

    Appointment.create(apptDoc);

    await genPDF(data, apptID);

    res.redirect(`/appointments/${appointName}`);
};

module.exports = { createAppointment, getAppointment };
