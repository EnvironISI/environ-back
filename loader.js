const app = require('./server');
const router = require('./routes/main.route');
const admin = require('./routes/admin.route');
const user = require('./routes/user.route');
const package = require('./routes/package.route');
const event = require('./routes/event.route');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.set('trust proxy', 1);
app.use(session({
  secret: 'webbookfca',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000,
    httpOnly: true,
  }
}));
app.use(expressValidator());
app.use(function(req, res, next) {
  // check if session exists
  if (global.sessData === undefined) {
    global.sessData = req.session;
    global.sessData.ID = req.sessionID;
  }
  else { // yes, cookie was already present
    console.log('session exists', global.sessData.ID);
  }
  next();
});

//Hubspot Routes - Authentication
require('./routes/auth.route.js')(app);

app.use('/admin', admin);
app.use('/user', user);
app.use('/event', event);
app.use('/package', package);
app.use('/', router);
module.exports = app;
