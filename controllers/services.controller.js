const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "services");

var request = require('request');
var {adminFb} = require('../config/firebaseConfig.js');
var {moloni} = require('../config/moloniConfig.js');

var exports = module.exports = {};

exports.products = function(req, res, err){
    moloni.products('getAll', {company_id:126979}, function(error, result){
        res.send(result);
    })
}

exports.createEvent = function(req, res, err){
    const sessionCookie = req.cookies.session || '';

    var name = req.body.name;
    var summary = req.body.summary;

    console.log(req.cookies)

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.auth().getUser(decodedClaims.uid).then(user => {
            var params = {
                company_id: 126979, 
                category_id: 2151197, 
                type: 2, 
                name: name,
                reference: name,
                summary: summary,
                price: 0.0,
                unit_id: 1076333,
                has_stock: 1,
                exemption_reason: "none",
                stock: 1000,
                properties: [
                    {
                        property_id: 11542,
                        value: "pendente"
                    },
                    {
                        property_id: 11543,
                        value: "pendente" 
                    },
                    {
                        property_id: 11549,
                        value:  user.email
                    }
                ],
            }
            moloni.products('insert', params, function(error, result){
                if(error) {
                    console.log(error)
                    res.status(400).send(JSON.stringify({error: error}));
                }else{
                    res.status(200).send(JSON.stringify({data: result}));
                }
            })
        })
    }).catch(error => {
        console.log(error);
        res.redirect("/login");
    })
}

exports.adminAccept = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();
    var accept = req.sanitize('accept').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.admin){
            var params = {
                company_id: 126979,
                product_id: eventId,
                category_id: 2151197,
                type: 2,
                price: 0.0,
                unit_id: 1076333,
                has_stock: 1,
                exemption_reason: "none",
                stock: 1000,
                properties: [
                    {
                        property_id: 11542,
                        value: accept
                    },
                    {
                        property_id: 11543,
                        value: "pendente" 
                    },
                    {
                        property_id: 11549,
                        value:  user.email
                    }
                ],
            }
            moloni.products('update', params, function(){
                if(error) {
                    console.log(error)
                    res.status(400).send(JSON.stringify({error: error}));
                }else{
                    res.status(200).send(JSON.stringify({data: result}));
                }
            })
        }
        else{
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}

exports.camaraAccept = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.camara || decodedClaims.admin){

        }
        else{
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}

