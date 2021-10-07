const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');

const allRoutes = require('./routes/routes');

// Specify the passport strategy to use 
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, function(err, result) {
            if(err) return console.log(err);
            if(!result) {
                return done(null, false, { message: "Incorrect password" });
            } else {
                return done(null, user);
            }
        });
      });
    }
  ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

const app = express();
const port = process.env.PORT || 5000;
const dbURL = process.env.MONGODBURL;

// Set up a view engine
app.set('view engine', 'ejs');

// Specify middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secrte: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log(err);
    });

app.use('/', allRoutes);

app.listen(port, () => {
    console.log(`The server is listening at port ${port}.`);
});

