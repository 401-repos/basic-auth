'use strict';
const express = require('express');
const userAuthRoute = express.Router();
const {
    encrypt,
    decrypt
} = require('./middleware/basic.js');

userAuthRoute.post('/signup', encrypt, async (req, res) => {
    res.status(201).json(req.userData);
});


userAuthRoute.post('/signin', decrypt, async (req, res) => {
    if (req.validLogin) {
        res.status(200).json(req.userData);
    } else {
        throw new Error('Invalid User')
    }
});

module.exports = userAuthRoute;