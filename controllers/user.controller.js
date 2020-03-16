const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require('request');
var { adminFb, firebase } = require('../config/firebaseConfig.js');

var exports = module.exports = {};

//User
exports.edit = function (req, res, err) {
    var name = req.sanitize('name').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    var nif = req.sanitize('nif').escape();
    var phone = req.body.phone;
    var photo_url = req.body.photo_url;

    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.database().ref('/users/' + decodedClaims.uid).once('value').then(snapshot => {
            adminFb.auth().getUser(decodedClaims.uid).then(user => {
                if (photo_url == null) photo_url = user.photoURL
                if (phone == null) phone = user.phoneNumber
                var userInfo = snapshot.val();

                var options = {
                    method: 'PUT',
                    url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                    qs: { hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8' },
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        properties:
                            [{ name: 'name', value: name },
                            { name: 'city', value: city },
                            { name: 'country', value: country },
                            { name: 'nif', value: nif },
                            { name: 'phone', value: phone }]
                    },
                    json: true
                };
                try {
                    request(options, function (error, response, body) {
                        if (error) res.status(500).send({ error: error });
                        // Store hash in database
                        adminFb.auth().updateUser(decodedClaims.uid, {
                            displayName: name,
                            photoURL: photo_url
                        }).then(() => {
                            res.status(200).send({ data: "Empresa " + name + " foi alterada" });
                        }).catch(error => {
                            console.log(error);
                            res.status(500).send({ error: error })
                        })
                    })
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: error })
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error })
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })
}
exports.recoverPassword = function (req, res, err) {
    var email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        // Email sent.
        res.status(200).send({ data: "Email sent successfully" });
    }).catch(error => {
        console.log(error)
        res.status(500).send({ error: error });
    })
}
exports.changeEmail = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var email = req.sanitize('email').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        adminFb.auth().createCustomToken(decodedClaims.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.updateEmail(email).then(() => {
                    res.status(200).send({ data: "Email alterado com sucesso" });
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error })
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error })
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied')
    })
}
exports.changePhone = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var phone = req.body.phone;

    adminFb.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        adminFb.auth().createCustomToken(decodedClaims.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.updatePhoneNumber(phone).then(() => {
                    res.status(200).send({ data: "Número de telemóvel alterado com sucesso" });
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error })
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error })
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied')
    })
}
exports.deleteMe = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.database().ref("/users/" + decodedClaims.uid).once('value').then(snapshot => {
            var userInfo = snapshot.val();
            var options = {
                method: 'DELETE',
                url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                qs: { hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8' }
            };
            try {
                request(options);
                adminFb.database().ref("/users/" + decodedClaims.uid).remove(function () {
                    adminFb.auth().deleteUser(decodedClaims.uid).then(() => {
                        res.clearCookie('session');
                        res.status(200).send({ data: "Empresa removida com sucesso!" });
                        res.end();
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({ error: error })
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error })
                })
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: error })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({ error: error })
    })
}