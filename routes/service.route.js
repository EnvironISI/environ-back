const service = require('express').Router();
const servicesController = require('../controllers/services.controller');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

service.get('/all', servicesController.products)
service.post('/createEvent', servicesController.createEvent);

module.exports = service;