const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "packages");

var request = require('request');

var { adminFb } = require('../config/firebaseConfig.js');
var { moloni } = require('../config/moloniConfig.js');
var { hubspot } = require('../config/hubspotConfig');

var exports = module.exports = {};

exports.all = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        request({
            url: 'https://identity.primaverabss.com/core/connect/token',
            method: 'POST',
            auth: {
                user: 'Environ', // TODO : put your application client id here
                pass: '555b4688-d440-4b35-baab-da4a880ad8a0' // TODO : put your application client secret here
            },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'application',
            }
        }, function (err, result) {
            if (result) {
                var json = JSON.parse(result.body);
                console.log(json.access_token);
                res.send('ok');

            }
            else {
                console.log("Could not obtain acess token.");
            }
        });
    }).catch(() => {
        res.redirect('/denied');
        res.end();
    })
}
exports.getByID = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.create = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.admin || decodedClaims.camara){

        }
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.edit = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.delete = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}