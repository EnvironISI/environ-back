const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors({
  exposedHeaders: ['Location'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  allowedOrigins: ['http://localhost:8080', 'https://environ-front.herokuapp.com/', 'http://environ-front.herokuapp.com/']
}));
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
