const user = require('express').Router();
const userController = require('../controllers/user.controller');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

user.put('/edit', userController.edit);
user.post('/recoverPassword', userController.recoverPassword);
user.post('/changeEmail', userController.changeEmail);
user.delete('/delete/me', userController.deleteMe)

module.exports = user;