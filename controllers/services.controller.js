const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "services");
var {admin} = require('../config/firebaseConfig.js');
var {moloni} = require('../config/moloniConfig.js');
var request = require('request');

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

    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        admin.auth().getUser(decodedClaims.uid).then(user => {
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
                warehouses: [],
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
                    res.status(400).send(error);
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

