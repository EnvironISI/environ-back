const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

const admin = require('express').Router();
const adminController = require('../controllers/admin.controller');

var { adminFb } = require('../config/firebaseConfig.js');

//Admin Routes

admin.put('/set', isAdmin, adminController.setAdmin);
admin.get('/users', isAdmin, adminController.getUsers);
admin.delete('/delete/user', isAdmin, adminController.deleteUser);
admin.put('/enable/user', isAdmin, adminController.enableUser);
admin.delete('/delete/event', isAdmin, adminController.deleteEvent);
admin.get('/user/mail', isAdmin, adminController.getUserByEmail);

function isAdmin(req, res, next) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (!decodedClaims.admin) {
            res.redirect('/denied');
        }
        else {
            next();
        }
    }).catch(() => {
        res.redirect('/denied');
    })
}

module.exports = admin;