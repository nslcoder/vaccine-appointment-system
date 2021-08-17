const uniqid = require('uniqid');
const { genPDF } = require('./helpers/genpdf');

const createAppointment = async (req, res) => {
    const data = req.body;

    const apptID = uniqid();

    await genPDF(data, apptID);

    res.redirect('/');
};

module.exports = { createAppointment };
