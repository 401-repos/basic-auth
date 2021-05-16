'use strict';

require('@code-fellows/supergoose');
const server = require('../src/server.js');
const test = require('supertest');
const bcrypt = require('bcrypt')
const base64 = require('base-64');
const {
    run
} = require('jest');
const Users = require('../src/auth/models/users-model.js');
const testServer = test(server.app);
describe('testing POST to /signup to create a new user', () => {
    it('should create a new user and return 201 status code', async () => {
        const user = {
            username: 'ali',
            password: 'user123'
        };
        const newUser = await testServer.post('/signup').send(user);
        const dataFromDB = await Users.find({});
        expect(dataFromDB.length).toEqual(1)
    });
});