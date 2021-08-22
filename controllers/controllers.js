const uniqid = require('uniqid');
const { genPDF } = require('./helpers/genpdf');
const path = require('path');

const getAppointment = async (req, res) => {
    const appointName = req.params.appointName;
    const pdffile = path.join(__dirname, `../pdffiles/${appointName}.pdf`);
    res.sendFile(pdffile);
}

const createAppointment = async (req, res) => {
    const data = req.body;
    const { name } = req.body;

    const appointName = name.split(' ').join('').toLowerCase();

    const apptID = uniqid();

    await genPDF(data, apptID);

    res.redirect(`/appointments/${appointName}`);
};

module.exports = { createAppointment, getAppointment };
