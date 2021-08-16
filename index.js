const express = require('express');
const allRoutes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', allRoutes);

app.listen(port, () => {
    console.log(`The server is listening at port ${port}.`);
});

