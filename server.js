const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const express = require('express');
const app = express();
var logger = require('morgan');
const cors = require("cors");

app.use(cors({
  exposedHeaders: ['Location'],
  credentials: true, 
  origin: ['http://localhost:8080', 'https://environ-front.herokuapp.com', 'http://environ-front.herokuapp.com', 'http://192.168.64.2', 'https://03cb7f2191214f1ab392e47e8fc4af58.vfs.cloud9.eu-central-1.amazonaws.com']
}));
app.use(logger('dev'));
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));
app.listen(port, function(err) {
  if (!err) {
    console.log('Your app is listening on ' + host + ' and port ' + port);
  }
  else {
    console.log(err);
  }
});

module.exports = app;
require('./loader.js');
