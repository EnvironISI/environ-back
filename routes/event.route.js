const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "events");

const event = require('express').Router();
const eventsController = require('../controllers/event.controller');

event.get('/all', eventsController.events)
event.post('/request', eventsController.createEvent);
event.put('/admin/acception', eventsController.adminAccept);
event.put('/camara/acception', eventsController.camaraAccept)
event.get('/camara', eventsController.camaraEvents);
event.get('/user', eventsController.userEvents);
event.get('/accepted', eventsController.acceptedEvents);
event.post('/colaboradores', eventsController.colab)
event.post('/nrcolaboradores', eventsController.nrcolab);
event.post('/download', eventsController.handlePdf);

module.exports = event;