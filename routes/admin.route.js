const admin = require('express').Router();
const adminController = require('../controllers/admin.controller');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var { adminFb } = require('../config/firebaseConfig.js');

//Admin Routes

admin.put('/set', isAdmin, adminController.setAdmin);
admin.get('/users', isAdmin, adminController.getUsers);
admin.delete('/delete/user', isAdmin, adminController.delete);
admin.put('/enable/user', isAdmin, adminController.enableUser);
//n sei para que serve
admin.put('/accept/user', isAdmin, adminController.acceptUser)

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