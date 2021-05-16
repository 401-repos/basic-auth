'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/users-model.js');
const e = require('express');

async function decrypt(req, res, next) {
    const header = req.headers.authorization.split(' ');
    const encoded = header.pop();
    const decoded = await base64.decode(encoded);
    const [username, password] = decoded.split(':');

    try {
        const user = await Users.findOne({
            username: username
        })

        console.log(user);
        req.validLogin = await bcrypt.compare(password, user.password);
        req.userData = user;
        next();

    } catch (err) {
        res.status(403).send("Invalid Login");
    }
}

async function encrypt(req, res, next) {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const username = req.body.username;
        const newUser = new Users({
            username: username,
            password: password
        });
        req.userData = await newUser.save();
        next();
    } catch (err) {
        next("Can't create user");
    }
}
module.exports = {
    encrypt,
    decrypt
}