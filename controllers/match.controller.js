const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "match");

var request = require('request');

var { adminFb } = require('../config/firebaseConfig.js');
var { moloni } = require('../config/moloniConfig.js');
var { hubspot } = require('../config/hubspotConfig');

var exports = module.exports = {};

exports.getMatches = function(req, res, err){

}

exports.doMatch  = function(req, res, err){
    
}