const express = require('express');
const app = express.Router();
const userController = require('../controller/user');
const loginController = require('../controller/login');

//crud user
app.get('/user', userController.getAll);
app.get('/user/:id', userController.getID);
app.post('/user', userController.create);
app.put('/user/:id', userController.update);
app.delete('/user/:id', userController.delete);

//login
app.post('/login', loginController.login);

module.exports = app;