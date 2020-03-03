const router = require('express').Router();
/*const controllerSpeaker = require('../controllers/speaker.controller.js');
const controllerSponsor = require('../controllers/sponsor.controller.js');
const controllerConference = require('../controllers/conference.controller.js');
const controllerMail = require('../controllers/mail.controller.js');*/
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
router.get('/', function(req, res) {
    res.send("FCA Book");
    res.end();
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        /*  res.status(jsonMessages.login.unauthorized.status).send(jsonMessages.login.unauthorized);*/
        return next();
    }
}
