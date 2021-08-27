const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const allRoutes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;
const dbURL = process.env.MONGODBURL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

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

