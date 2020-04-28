const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "packages");

var request = require('request');

var { adminFb } = require('../config/firebaseConfig.js');
var { moloni } = require('../config/moloniConfig.js');
var { hubspot } = require('../config/hubspotConfig');

var exports = module.exports = {};

exports.getToken = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(() => {
        request({
            url: 'https://identity.primaverabss.com/core/connect/token',
            method: 'POST',
            auth: {
                user: 'Environ', // TODO : put your application client id here
                pass: 'ec6b1693-3175-45b6-9337-5c0d3d8f727f' // TODO : put your application client secret here
            },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'application',
            }
        }, function (err, result) {
            if (result) {
                var json = JSON.parse(result.body);
                console.log(json.access_token);
                res.send(json.access_token);
            }
            else {
                console.log("Could not obtain acess token.");
            }
        });
    }).catch(() => {
        res.redirect('/denied');
        res.end();
    })
}

exports.all = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        request({
            url: 'https://identity.primaverabss.com/core/connect/token',
            method: 'POST',
            auth: {
                user: 'Environ', // TODO : put your application client id here
                pass: 'ec6b1693-3175-45b6-9337-5c0d3d8f727f' // TODO : put your application client secret here
            },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'application',
            }
        }, function (err, result) {
            if (result) {
                var json = JSON.parse(result.body);
                request({
                    url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + json.access_token
                    },
                    json: true
                }, function (err, result, body) {
                    if (body) {
                        console.log(body)
                        let resp = [];
                        body.forEach(item => {
                            if(item.itemKey !== 'PORTES'){
                                let obj = {
                                    id: item.id,
                                    name: item.itemKey,
                                    description: item.description,
                                    summary: item.complementaryDescription,
                                    image: item.image,
                                    ativo: item.isActive
                                }
                                resp.push(obj);
                            }
                        })
                        res.status(200).send(resp);
                    } else {
                        console.log(err);
                        res.status(500).send(err);
                        res.end();
                    }
                })
            }
            else {
                console.log("Could not obtain acess token.");
                res.status(500).send(err);
                res.end();
            }
        });
    }).catch(() => {
        res.redirect('/denied');
        res.end();
    })
}
exports.getByID = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var id = req.params.id;
    adminFb.auth().verifySessionCookie(sessionCookie, true).then(() => {
        request({
            url: 'https://identity.primaverabss.com/core/connect/token',
            method: 'POST',
            auth: {
                user: 'Environ', // TODO : put your application client id here
                pass: 'ec6b1693-3175-45b6-9337-5c0d3d8f727f' // TODO : put your application client secret here
            },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'application',
            }
        }, function (err, result) {
            if (result) {
                var json = JSON.parse(result.body);
                request({
                    url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + id,
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + json.access_token
                    },
                    json: true
                }, function (err, result, body) {
                    if (body) {
                        let obj = {
                            id: body.id,
                            name: body.itemKey,
                            description: body.description,
                            summary: body.complementaryDescription,
                            image: body.image,
                            ativo: body.isActive
                        }
                        res.status(200).send(obj);
                    } else {
                        console.log(err);
                        res.status(500).send(err);
                        res.end();
                    }
                })
            }
            else {
                console.log("Could not obtain acess token.");
                res.status(500).send(err);
                res.end();
            }
        })
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.getByCamara = function (req, res, err){
    var sessionCookie = req.cookies.session || '';
    adminFb.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        if(decodedClaims.camara){
            adminFb.auth().getUser(decodedClaims.uid).then(user => {
            }).catch(err => {
                console.log(err);
                res.status(500).send(err);
                res.end();
            })
        }
        else{
            res.redirect('denied');
            res.end();
        }
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.create = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin || decodedClaims.camara) {
            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'Environ', // TODO : put your application client id here
                    pass: 'ec6b1693-3175-45b6-9337-5c0d3d8f727f' // TODO : put your application client secret here
                },
                form: {
                    'grant_type': 'client_credentials',
                    'scope': 'application',
                }
            }, function (err, result) {
                if (result) {
                    var json = JSON.parse(result.body);

                    var itemKey = req.sanitize('itemKey').escape();
                    var description = req.sanitize('description').escape();
                    var image = req.sanitize('image').escape();
                    var summary = req.sanitize('summary').escape();

                    if(image === undefined){
                        image = 'https://w0.pngwave.com/png/169/167/package-delivery-mail-box-parcel-box-png-clip-art-thumbnail.png'
                    }

                    request({
                        url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items',
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + json.access_token
                        },
                        body: {
                            itemKey: itemKey,
                            description: description,
                            complementaryDescription: summary,
                            isExternallyManaged: false,
                            baseUnit: "HR",
                            itemType: 2,
                            image: image
                        },
                        json: true
                    }, function (err, result, body) {
                        if (body) {
                            res.status(200).send({id: body});
                            res.end();
                        } else {
                            console.log(err);
                            res.status(500).send(JSON.parse(err));
                            res.end();
                        }
                    })
                }
                else {
                    console.log("Could not obtain acess token.");
                    res.status(500).send(JSON.parse(err));
                    res.end();
                }
            })
        }
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.edit = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var id = req.params.id;

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.admin || decodedClaims.camara){
            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'Environ', // TODO : put your application client id here
                    pass: 'ec6b1693-3175-45b6-9337-5c0d3d8f727f' // TODO : put your application client secret here
                },
                form: {
                    'grant_type': 'client_credentials',
                    'scope': 'application',
                }
            }, function (err, result) {
                if (result) {
                    var json = JSON.parse(result.body);

                    var itemKey = req.sanitize('itemKey').escape();
                    var description = req.sanitize('description').escape();
                    var image = req.sanitize('image').escape();
                    var summary = req.sanitize('summary').escape();

                    if(image !== undefined){
                        request({
                            url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + id + "/image",
                            method: 'PUT',
                            headers: {
                                Authorization: 'Bearer ' + json.access_token
                            },
                            body: {
                                value: image
                            },
                            json: true
                        }, function (err, result, body) {
                            if (body) {
                                res.status(200).send(body);
                                res.end();
                            } else {
                                console.log(err);
                                res.status(500).send(err);
                                res.end();
                            }
                        })
                    }
                    else if(description !== undefined){
                        request({
                            url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + id + "/description",
                            method: 'PUT',
                            headers: {
                                Authorization: 'Bearer ' + json.access_token
                            },
                            body: {
                                value: description
                            },
                            json: true
                        }, function (err, result, body) {
                            if (body) {
                                res.status(200).send(body);
                                res.end();
                            } else {
                                console.log(err);
                                res.status(500).send(err);
                                res.end();
                            }
                        })
                    }
                    else if(itemKey !== undefined){
                        request({
                            url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + id + "/itemKey",
                            method: 'PUT',
                            headers: {
                                Authorization: 'Bearer ' + json.access_token
                            },
                            body: {
                                value: itemKey
                            },
                            json: true
                        }, function (err, result, body) {
                            if (body) {
                                res.status(200).send(body);
                                res.end();
                            } else {
                                console.log(err);
                                res.status(500).send(JSON.parse(err));
                                res.end();
                            }
                        })
                    }
                    else if(summary !== undefined){
                        request({
                            url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + id + "/complementaryDescription",
                            method: 'PUT',
                            headers: {
                                Authorization: 'Bearer ' + json.access_token
                            },
                            body: {
                                value: summary
                            },
                            json: true
                        }, function (err, result, body) {
                            if (body) {
                                res.status(200).send(body);
                                res.end();
                            } else {
                                console.log(err);
                                res.status(500).send(JSON.parse(err));
                                res.end();
                            }
                        })
                    }
                    else{
                        res.status(500).send('error');
                        res.end();
                    }
                }
                else {
                    console.log("Could not obtain acess token.");
                    res.status(500).send(err);
                    res.end();
                }
            })
        }
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}
exports.delete = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var id = req.params.id;

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if(decodedClaims.admin || decodedClaims.camara){
            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'Environ', // TODO : put your application client id here
                    pass: 'ec6b1693-3175-45b6-9337-5c0d3d8f727f' // TODO : put your application client secret here
                },
                form: {
                    'grant_type': 'client_credentials',
                    'scope': 'application',
                }
            }, function (err, result) {
                if (result) {
                    var json = JSON.parse(result.body);
                    request({
                        url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + id,
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + json.access_token
                        },
                        json: true
                    }, function (err, result, body) {
                        res.status(200).send(body);
                        res.end();
                    })
                }
            })
        }
    }).catch(() => {
        res.redirect('denied');
        res.end();
    })
}