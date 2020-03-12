const servicesController = require('../controllers/services.controller.js');
var {admin} = require('../config/firebaseConfig.js');

module.exports = function(app){
    app.get('/moloni', moloniAPI)
    app.post('/createEvent', moloniAPI, servicesController.createEvent);

}

function moloniAPI(){
    res.send(req)
}