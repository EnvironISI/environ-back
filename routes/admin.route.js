const admin = require('express').Router();
const adminController = require('../controllers/admin.controller');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

//Admin Routes
admin.delete('/delete/user/:uid', adminController.delete);
admin.put('/set/:uid', adminController.setAdmin);

module.exports = admin;