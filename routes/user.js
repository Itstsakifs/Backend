const express = require('express');
const app = express.Router();
const userController = require('../controller/user');


//crud user
app.get('/user', userController.getAll);
app.get('/user/:id', userController.getID);
app.post('/user', userController.create);
app.put('/user/:id', userController.update);
app.delete('/user/:id', userController.delete);

module.exports = app;