const service = require('express').Router();
const servicesController = require('../controllers/service.controller');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

service.get('/all', servicesController.products)
service.post('/request', servicesController.createEvent);
service.put('/admin/acception', servicesController.adminAccept);
service.put('/camara/acception', servicesController.camaraAccept)
service.delete('/delete', servicesController.delete)
service.post('/package/create', servicesController.packageCreate);
service.get('/camara', servicesController.camaraEvents);
service.get('/user', servicesController.userEvents)
//service.get('/camaras', servicesController.camaras)

module.exports = service;