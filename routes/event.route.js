const event = require('express').Router();
const eventsController = require('../controllers/event.controller');
const pdfController = require('../controllers/pdf.controller');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "events");

event.get('/all', eventsController.events)
event.post('/request', eventsController.createEvent);
event.put('/admin/acception', eventsController.adminAccept);
event.put('/camara/acception', eventsController.camaraAccept)
event.get('/camara', eventsController.camaraEvents);
event.get('/user', eventsController.userEvents);
event.get('/accepted', eventsController.acceptedEvents);
event.post('/colaboradores', eventsController.colab)
event.get('/download', pdfController.handlePdf);

module.exports = event;