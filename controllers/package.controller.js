const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "packages");

var request = require('request');
const nodemailer = require("nodemailer");

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
                user: 'ENVIRONISI', // TODO : put your application client id here
                pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
            },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'application',
            }
        }, function (err, result) {
            if (result) {
                var json = JSON.parse(result.body);
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
                user: 'ENVIRONISI', // TODO : put your application client id here
                pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
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
                        let resp = [];
                        body.forEach(item => {
                            console.log(item)
                            if (item.itemKey !== 'PORTES') {
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
    }).catch((error) => {
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
                user: 'ENVIRONISI', // TODO : put your application client id here
                pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
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
exports.create = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin || decodedClaims.camara) {
            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'ENVIRONISI', // TODO : put your application client id here
                    pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
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

                    if (image === undefined) {
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
                            res.status(200).send({ id: body });
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
        if (decodedClaims.admin || decodedClaims.camara) {
            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'ENVIRONISI', // TODO : put your application client id here
                    pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
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

                    if (image !== undefined) {
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
                    else if (description !== undefined) {
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
                    else if (itemKey !== undefined) {
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
                    else if (summary !== undefined) {
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
                    else {
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
        if (decodedClaims.admin || decodedClaims.camara) {
            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'ENVIRONISI', // TODO : put your application client id here
                    pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
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
exports.sendMail = function (req, res, err) {

    var sessionCookie = req.cookies.session || '';
    var email = req.sanitize('email').escape();
    var municipioName = req.sanitize('municipio').escape();
    var msg = req.sanitize('msg').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        adminFb.auth().listUsers().then(userRecords => {
            for (var i = 0; i < userRecords.users.length; i++) {
                var municipio = userRecords.users[i];
                if (municipio.displayName.includes(municipioName)) {
                    // async..await is not allowed in global scope, must use a wrapper
                    async function main() {
                        // Generate test SMTP service account from ethereal.email
                        // Only needed if you don't have a real mail account for testing

                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: "smtp.mailtrap.io",
                            port: 587,
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user: "61b073d6be421f", // generated ethereal user
                                pass: "73e0153d1d5efc" // generated ethereal password
                            }
                        });

                        // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: email, // sender address
                            to: municipio.email, // list of receivers
                            subject: "Nova opção de pacote requisitado pela empresa " + email, // Subject line
                            text: msg // plain text body
                        });

                        console.log("Message sent: %s", info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                        // Preview only available when sending through an Ethereal account
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    }
                    await main().catch(console.error);
                }
            }
            res.status(200).send({msg: "Email enviado com sucesso!"});
            res.end();
        })
    }).catch(() => {
        res.redirect('/denied');
        res.end()
    })
}