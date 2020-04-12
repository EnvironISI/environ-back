const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require('request');
var { adminFb, firebase } = require('../config/firebaseConfig.js');
var { hubspot } = require('../config/hubspotConfig');

var exports = module.exports = {};

//User
exports.edit = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var name = req.sanitize('name').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    var nif = req.sanitize('nif').escape();
    var photo_url = req.body.photo_url;
    let params = {
        properties: []
    };
    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        adminFb.database().ref('/users/' + decodedClaims.uid).once('value').then(snapshot => {
            adminFb.auth().getUser(decodedClaims.uid).then(user => {
                if (name != null) {
                    params.properties.push({ name: 'name', value: name })
                } else {
                    name = user.displayName;
                };
                if (city != null) params.properties.push({ name: 'city', value: city });
                if (country != null) params.properties.push({ name: 'country', value: country });
                if (nif != null) params.properties.push({ name: 'nif', value: nif });
                if (photo_url == null) photo_url = user.photoURL
                var userInfo = snapshot.val();
                hubspot.companies.update(userInfo.hubspot_id, params).then(() => {
                    adminFb.auth().updateUser(decodedClaims.uid, {
                        displayName: name,
                        photoURL: photo_url
                    }).then(() => {
                        res.status(200).send({ msg: "Empresa " + name + " foi alterada com sucesso!" });
                        res.end();
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({ error: error })
                        res.end();
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error })
                    res.end();
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error })
                res.end();
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
            res.end();
        })
    })
}
exports.recoverPassword = function (req, res, err) {
    var email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        // Email sent.
        res.status(200).send({ msg: "Email para recuperar a password enviado com sucesso!" });
    }).catch(error => {
        console.log(error);
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
                    res.status(200).send({ msg: "Email alterado com sucesso!" });
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
    }).catch(() => {
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
                    res.status(200).send({ msg: "Número de telemóvel alterado com sucesso!" });
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
    }).catch(() => {
        res.redirect('/denied')
    })
}
exports.deleteMe = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.auth().updateUser(decodedClaims.uid, {
            disabled: true
        }).then(() => {
            res.status(200).send({ msg: 'Conta desativada com sucesso!' });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
        })
    }).catch(() => {
        res.redirect('denied');
    })
}