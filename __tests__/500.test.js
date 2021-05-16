'use strict';

require('@code-fellows/supergoose')
const errorHnadler = require('../src/middlewares/error/500.js');
const test = require('supertest');
const server = require('../src/server.js');
const testServer = test(server.app);
describe('getting error on bad route error', () => {
    it('should send a 404 status code when bad route error', async () => {
        const error = await testServer.post('/bad-route');
        expect(error.status).toEqual(404);
    });
});
describe('getting error on server error', () => {
   it('should create a new user and return 201 status code', async () => {
       const user = {
           username: 'ali',
       };
       const newUser = await testServer.post('/signup').send(user);
       expect(newUser.status).toEqual(500);
   });
});
