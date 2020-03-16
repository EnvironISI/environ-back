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
                    res.status(400).send({error: error});
                }else{
                    res.status(200).send(result);
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
            moloni.products('getOne', {company_id: 126979, product_id: eventId,}, function(error, result){
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
                            value: result.properties[1].value 
                        },
                        {
                            property_id: 11549,
                            value:  result.properties[2].value
                        }
                    ],
                }
                moloni.products('update', params, function(error, result2){
                    if(error) {
                        console.log(error)
                        res.status(400).send({error: error});
                    }else{
                        res.status(200).send(result2);
                    }
                })
                if(error) res.status(400).send({error: error});
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

    var eventId = req.sanitize('eventId').escape();
    var accept = req.sanitize('accept').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.admin || decodedClaims.camara){
            moloni.products('getOne', {company_id: 126979, product_id: eventId,}, function(error, result){
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
                            value: result.properties[0].value
                        },
                        {
                            property_id: 11543,
                            value: accept 
                        },
                        {
                            property_id: 11549,
                            value:  result.properties[2].value
                        }
                    ],
                }
                moloni.products('update', params, function(error, result2){
                    if(error) {
                        console.log(error)
                        res.status(400).send({error: error});
                    }else{
                        res.status(200).send(result2);
                    }
                })
                if(error) res.status(400).send({error: error});
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

exports.delete = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.admin || decodedClaims.empresa){
            moloni.products('delete', {company_id: 126979, product_id: eventId}, function(error, result){
                if(error){
                    res.status(400).send({error: error});
                    res.end();
                }
                res.status(200).send(result);
            })
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}
