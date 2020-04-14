const match = require('express').Router();
const matchController = require('../controllers/match.controller');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "match");



module.exports = match;