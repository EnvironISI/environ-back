const servicesController = require('../controllers/services.controller.js');
var request = require('request');

module.exports = function(app){
    app.get('/products', servicesController.products)
    app.post('/createEvent', servicesController.createEvent);
}