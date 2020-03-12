const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "services");
var {admin} = require('../config/firebaseConfig.js');
var request = require('request');

var exports = module.exports = {};

exports.createEvent = function(req, res, err){
    var nome = req.body.nome;
    var token = req.cookies.moloni

    var options = {method: 'POST', 
        url: 'https://api.moloni.pt/v1/products/insert/?access_token='+token,
        qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'},
        headers: {'Content-Type': 'application/json' },
        body:{ 
            properties:
           [{ name: 'name', value: name },
            { name: 'email', value: email},
            { name: 'phone', value: phone},
            { name: 'city', value: city},
            { name: 'country', value: country},
            { name: 'industry', value: sector},
            { name: 'nif', value: nif}] 
        },
        json: true 
        };
}

