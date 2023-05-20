const express = require('express');
const app = express.Router();
const loginController = require('../controller/login');

//login
app.post('/login', loginController.login);

module.exports = app;