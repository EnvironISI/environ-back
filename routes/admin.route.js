const admin = require('express').Router();
const adminController = require('../controllers/admin.controller');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var {adminFb} = require('../config/firebaseConfig.js');

//Admin Routes
admin.delete('/delete/user/:uid', isAdmin, adminController.delete);
admin.put('/set/:uid', isAdmin, adminController.setAdmin);
admin.get('/users', isAdmin, adminController.getUsers);

function isAdmin(req, res, next){
    var sessionCookie = req.cookies.session;

    try{
        adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
            if(!decodedClaims.admin){
                res.redirect('/denied');
            }
            else{
                next();
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send({error: error});
        })
    }catch(error){
        console.log(error)
        res.redirect('/denied');
    }
}

module.exports = admin;