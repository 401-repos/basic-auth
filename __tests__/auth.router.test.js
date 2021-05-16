'use strict';

require('@code-fellows/supergoose');
const server = require('../src/server.js');
const test = require('supertest');
const bcrypt = require('bcrypt')
const base64 = require('base-64');
const {
    run
} = require('jest');
const testServer = test(server.app);
describe('testing POST to /signup to create a new user', () => {
    it('should create a new user and return 201 status code',async () => {
        const user = { username: 'ali', password: 'user123' };
        const newUser = await  testServer.post('/signup').send(user);
        expect(newUser.status).toEqual(201);
        expect(newUser.body.username).toEqual(user.username);
        const comparing = await bcrypt.compare(user.password, newUser.body.password)
        expect(comparing).toEqual(true);
    });
});
describe('testing POST to /signin to login as a user (use basic auth)',  () => {
   it('should sign in and return 200 status code', async () => {
       const user = { username: 'ali', password: 'user123' };
       const newUser = await testServer.post('/signup').send(user);
       const auth = `${user.username}:${user.password}`;
       const encoded = await base64.encode(auth);
       console.log(encoded);
       const signin = await testServer.post('/signin').set("Authorization", `Basic ${encoded}`);
       expect(signin.status).toEqual(200);   
   });
});