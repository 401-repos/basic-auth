'use strict';

const express = require('express');
const errorHandler = require('./middlewares/error/500.js');
const notFound = require('./middlewares/error/404.js');
const userAuthRoute = require('./auth/router.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userAuthRoute);

app.use(errorHandler);
app.use('*', notFound);

function run (PORT) {
    app.listen(PORT, () => {
        console.log('Hearing server on ' + PORT);
    });
}

module.exports = {
    run, app
}