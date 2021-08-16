const express = require('express');
const router = express.Router();

const { createAppointment } = require('../controllers/controllers');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/appointments', createAppointment);

module.exports = router;