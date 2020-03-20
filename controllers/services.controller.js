const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "services");

var { adminFb } = require('../config/firebaseConfig.js');
var { moloni } = require('../config/moloniConfig.js');

var exports = module.exports = {};

exports.products = function (req, res, err) {
    moloni.products('getAll', { company_id: 126979 }, function (error, result) {
        res.send(result);
    })
}

exports.createEvent = function (req, res, err) {
    const sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.auth().listUsers().then((userRecords) => {

            var name = req.body.name;
            var lat = req.body.latitude;
            var long = req.body.longitude;
            var address = req.body.address;
            var initTime = req.body.initTime;
            var endTime = req.body.endTime;
            var nrPart = req.body.nrPart;
            var summary = req.body.summary;
            var municipio = req.body.municipio;

            try {
                userRecords.users.forEach((user) => {
                    console.log(user.customClaims.camara);
                    console.log(municipio);
                    if (!user.customClaims.camara == municipio) {
                        res.status(400).send({error: "O Municipio ainda não se encontra registado no sistema da Environ."})
                        res.end();
                    }
                })
            } catch (error) { console.log(error) }

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
                    exemption_reason: "M99",
                    stock: 1,
                    properties: [
                        {
                            property_id: 11542,
                            value: "suspenso"
                        },
                        {
                            property_id: 11549,
                            value: user.email
                        },
                        {
                            property_id: 11623,
                            value: lat
                        },
                        {
                            property_id: 11625,
                            value: long
                        },
                        {
                            property_id: 11627,
                            value: nrPart
                        },
                        {
                            property_id: 11632,
                            value: initTime
                        },
                        {
                            property_id: 11633,
                            value: endTime
                        },
                        {
                            property_id: 11634,
                            value: address
                        },
                        {
                            property_id: 11640,
                            value: municipio
                        }
                    ],
                }
                moloni.products('insert', params, function (error, result) {
                    if (error) {
                        console.log(error)
                        res.status(400).send({ error: error });
                    } else {
                        res.status(200).send(result);
                    }
                })
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
            res.end();
        })
    }).catch(error => {
        console.log(error);
        res.redirect("/login");
    })
}

exports.adminAccept = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();
    var accept = req.sanitize('accept').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin) {
            if(accept == true){
                moloni.products('getOne', { company_id: 126979, product_id: eventId, }, function (error, result) {
                    var params = {
                        company_id: 126979,
                        product_id: eventId,
                        category_id: 2151197,
                        type: 2,
                        price: 0.0,
                        unit_id: 1076333,
                        has_stock: 1,
                        exemption_reason: "",
                        stock: 1000,
                        properties: [
                            {
                                property_id: 11542,
                                value: 'Pendente'
                            },
                            {
                                property_id: 11549,
                                value: result.properties[2].value
                            },
                            {
                                property_id: 11623,
                                value: result.properties[3].value
                            },
                            {
                                property_id: 11625,
                                value: result.properties[4].value
                            },
                            {
                                property_id: 11627,
                                value:result.properties[5].value
                            },
                            {
                                property_id: 11632,
                                value: result.properties[6].value
                            },
                            {
                                property_id: 11633,
                                value: result.properties[7].value
                            },
                            {
                                property_id: 11634,
                                value: result.properties[8].value
                            },
                            {
                                property_id: 11640,
                                value: result.properties[9].value
                            }
                        ],
                    }
                    moloni.products('update', params, function (error, result2) {
                        if (error) {
                            console.log(error)
                            res.status(400).send({ error: error });
                        } else {
                            res.status(200).send(result2);
                        }
                    })
                    if (error) res.status(400).send({ error: error });
                })
            }
            else{
                moloni.products('getOne', { company_id: 126979, product_id: eventId, }, function (error, result) {
                    var params = {
                        company_id: 126979,
                        product_id: eventId,
                        category_id: 2151197,
                        type: 2,
                        price: 0.0,
                        unit_id: 1076333,
                        has_stock: 1,
                        exemption_reason: "",
                        stock: 1000,
                        properties: [
                            {
                                property_id: 11542,
                                value: 'Rejeitado'
                            },
                            {
                                property_id: 11549,
                                value: result.properties[2].value
                            },
                            {
                                property_id: 11623,
                                value: result.properties[3].value
                            },
                            {
                                property_id: 11625,
                                value: result.properties[4].value
                            },
                            {
                                property_id: 11627,
                                value:result.properties[5].value
                            },
                            {
                                property_id: 11632,
                                value: result.properties[6].value
                            },
                            {
                                property_id: 11633,
                                value: result.properties[7].value
                            },
                            {
                                property_id: 11634,
                                value: result.properties[8].value
                            },
                            {
                                property_id: 11640,
                                value: result.properties[9].value
                            }
                        ],
                    }
                    moloni.products('update', params, function (error, result2) {
                        if (error) {
                            console.log(error)
                            res.status(400).send({ error: error });
                        } else {
                            res.status(200).send(result2);
                        }
                    })
                    if (error) res.status(400).send({ error: error });
                })
            }
            
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}

exports.camaraAccept = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();
    var accept = req.sanitize('accept').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin || decodedClaims.camara) {
            if(accept == true){
                moloni.products('getOne', { company_id: 126979, product_id: eventId }, function (error, result) {
                    var params = {
                        company_id: 126979,
                        product_id: eventId,
                        category_id: 2151197,
                        type: 2,
                        price: 0.0,
                        unit_id: 1076333,
                        has_stock: 1,
                        exemption_reason: "",
                        stock: 1000,
                        properties: [
                            {
                                property_id: 11542,
                                value: 'Aceite'
                            },
                            {
                                property_id: 11549,
                                value: result.properties[2].value
                            },
                            {
                                property_id: 11623,
                                value: result.properties[3].value
                            },
                            {
                                property_id: 11625,
                                value: result.properties[4].value
                            },
                            {
                                property_id: 11627,
                                value:result.properties[5].value
                            },
                            {
                                property_id: 11632,
                                value: result.properties[6].value
                            },
                            {
                                property_id: 11633,
                                value: result.properties[7].value
                            },
                            {
                                property_id: 11634,
                                value: result.properties[8].value
                            },
                            {
                                property_id: 11640,
                                value: result.properties[9].value
                            }
                        ],
                    }
                    moloni.products('update', params, function (error, result2) {
                        if (error) {
                            console.log(error)
                            res.status(400).send({ error: error });
                        } else {
                            res.status(200).send(result2);
                        }
                    })
                    if (error) res.status(400).send({ error: error });
                })
            }else{
                moloni.products('getOne', { company_id: 126979, product_id: eventId }, function (error, result) {
                    var params = {
                        company_id: 126979,
                        product_id: eventId,
                        category_id: 2151197,
                        type: 2,
                        price: 0.0,
                        unit_id: 1076333,
                        has_stock: 1,
                        exemption_reason: "",
                        stock: 1000,
                        properties: [
                            {
                                property_id: 11542,
                                value: 'Rejeitado'
                            },
                            {
                                property_id: 11549,
                                value: result.properties[2].value
                            },
                            {
                                property_id: 11623,
                                value: result.properties[3].value
                            },
                            {
                                property_id: 11625,
                                value: result.properties[4].value
                            },
                            {
                                property_id: 11627,
                                value:result.properties[5].value
                            },
                            {
                                property_id: 11632,
                                value: result.properties[6].value
                            },
                            {
                                property_id: 11633,
                                value: result.properties[7].value
                            },
                            {
                                property_id: 11634,
                                value: result.properties[8].value
                            },
                            {
                                property_id: 11640,
                                value: result.properties[9].value
                            }
                        ],
                    }
                    moloni.products('update', params, function (error, result2) {
                        if (error) {
                            console.log(error)
                            res.status(400).send({ error: error });
                        } else {
                            res.status(200).send(result2);
                        }
                    })
                    if (error) res.status(400).send({ error: error });
                })
            }
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}

exports.delete = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin || decodedClaims.empresa) {
            moloni.products('delete', { company_id: 126979, product_id: eventId }, function (error, result) {
                if (error) {
                    res.status(400).send({ error: error });
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

/*exports.camaras = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        var resp = [];
        adminFb.auth().listUsers().then((userRecords) => {
            try {
                userRecords.users.forEach((user) => {
                    if (user.customClaims.camara) {
                        resp.push(user.displayName)
                    }
                })
            } catch (error) { console.log(error) }
            res.status(200).send(resp);
            res.end()
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
            res.end();
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })
}*/