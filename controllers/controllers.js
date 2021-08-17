const uniqid = require('uniqid');
const genPDF = require('./helpers/genpdf');

const createAppointment = (req, res) => {
    const data = req.body;

    const apptID = uniqid();

    genPDF(data, apptID);

    res.redirect('/');
};

module.exports = { createAppointment };
