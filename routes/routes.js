const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

const { renderIndex, renderRegister, accessDashboard, renderDashboard, registerUser, renderAppointment, createAppointment, renderEdit, editAppointment, getAppointment, logoutUser } = require('../controllers/controllers');

router.get('/', renderIndex);

router.post('/users/login', passport.authenticate('local', { failureRedirect: '/'}), accessDashboard);

router.get('/users/dashboard/:username/:userId', connectEnsureLogin.ensureLoggedIn('/'), renderDashboard);

router.get('/register', renderRegister);

router.post('/users/register', registerUser);

router.get('/users/dashboard/appointments', connectEnsureLogin.ensureLoggedIn('/'), renderAppointment)

router.put('/users/dashboard/appointments', connectEnsureLogin.ensureLoggedIn('/'), createAppointment);

router.get('/users/dashboard/appointments/:username/:userId', connectEnsureLogin.ensureLoggedIn('/'), renderEdit);

router.put('/users/dashboard/appointments/:username/:userId', connectEnsureLogin.ensureLoggedIn('/'), editAppointment);

router.get('/users/appointments/pdf/:username/:userId', connectEnsureLogin.ensureLoggedIn('/'), getAppointment);

router.get('/users/logout', connectEnsureLogin.ensureLoggedIn('/'), logoutUser);

module.exports = router;
