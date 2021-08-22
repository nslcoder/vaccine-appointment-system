const express = require('express');
const router = express.Router();

const { createAppointment, getAppointment } = require('../controllers/controllers');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/appointments/:appointName', getAppointment);

router.post('/appointments', createAppointment);

module.exports = router;