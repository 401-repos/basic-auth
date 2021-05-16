'use strict';
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require('mongoose');
const {
  run,app
} = require('./src/server.js');




mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Database is running");
    run(PORT);
  })
  .catch(e => console.error('Could not start server', e.message));

/*Testing
You should manually test your routes using httpie from the command line or an application such as Postman or Insomnia. Additionally, you are required to write automated tests as well:

POST to /signup to create a new user
POST to /signin to login as a user (use basic auth)
Need tests for auth middleware and the routes
Does the middleware function (send it a basic header)
Do the routes assert the requirements (signup/signin)
This is going to require more “end to end” testing that you’ve done in the past
To test signin, your tests actually need to create a user first, then try and login, so there’s a dependency built in
Ensure that you use supergoose to test your routes and your database*/