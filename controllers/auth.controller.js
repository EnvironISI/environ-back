const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require("request");
var { adminFb, firebase } = require('../config/firebaseConfig.js');

var exports = module.exports = {};

exports.user = function (req, res, err) {
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.auth().getUser(decodedClaims.uid).then(user => {
            adminFb.database().ref('/users/' + decodedClaims.uid).once('value').then(snapshot => {
                var userInfo = snapshot.val();
                let info = [];
                let role;
                var { uid, displayName, email, emailVerified, phoneNumber, photoURL, disabled } = user;
                var options = {
                    method: 'GET',
                    url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                    qs: { hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8' },
                    json: true
                };
                try {
                    request(options, function (error, response, body) {
                        var nif, country, city, setor;
                        if (body.properties.nif !== undefined) nif = body.properties.nif.value;
                        if (body.properties.country !== undefined) country = body.properties.country.value;
                        if (body.properties.city !== undefined) city = body.properties.city.value;
                        if (body.properties.industry !== undefined) setor = body.properties.industry.value;
                        if (error) res.status(500).send({ error: error });
                        if (user.customClaims.empresa) role = 'empresa';
                        else if (user.customClaims.admin) role = 'admin';
                        else if (user.customClaims.camara) role = 'camara';
                        info = {
                            uid: uid,
                            name: displayName,
                            email: email,
                            emailVerfied: emailVerified,
                            phoneNumber: phoneNumber,
                            photoUrl: photoURL,
                            role: role,
                            disabled: disabled,
                            nif: nif,
                            country: country,
                            city: city,
                            setor: setor
                        };
                        res.status(200).send({ user: info, token: sessionCookie });
                    })
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: error })
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error });
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
        })
    }).catch((error) => {
        // Session cookie is unavailable or invalid. Force user to login.
        console.log(error)
        res.redirect('/denied');
    });
}
exports.login = function (req, res, err) {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        if(!user.user.emailVerified){
            res.status(400).send({error: "Por favor, verifique o seu email primeiro!"});
            res.end();
        }
        else{
            return user.user.getIdToken().then(idToken => {
                const expiresIn = 60 * 60 * 24 * 5 * 1000;
                adminFb.auth().createSessionCookie(idToken, { expiresIn }).then((sessionCookie) => {
                    // Set cookie policy for session cookie.
                    const options = { expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000), httpOnly: false, secure: false };
                    res.cookie('session', sessionCookie, options);
                    res.send({ status: 'success' })
                }, error => {
                    console.log(error);
                    res.redirect('/denied');
                });
            });
        }
    }).then(() => {
        // A page redirect would suffice as the persistence is set to NONE.
        return firebase.auth().signOut();
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    })
}
exports.logout = function (req, res, err) {
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    adminFb.auth().verifySessionCookie(sessionCookie).then((decodedClaims) => {
        res.clearCookie('session');
        return adminFb.auth().revokeRefreshTokens(decodedClaims.sub);
    }).then(() => {
        res.status(200).send({ data: 'Logout Successfully' });
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })
}
exports.register = function (req, res, err) {
    var name = req.sanitize('name').escape();
    var email = req.sanitize('email').escape();
    var phone = req.sanitize('phone').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    var sector = req.sanitize('sector').escape();
    var responsible = req.sanitize('responsible').escape();
    var nif = req.sanitize('nif').escape();
    var password = req.sanitize('password').escape();
    let type = req.sanitize('type').escape();

    if (type == "camara" || type == "empresa") {
        adminFb.auth().createUser({
            email: email,
            password: password,
            phoneNumber: phone,
            displayName: name
        }).then(function (result) {
            adminFb.auth().createCustomToken(result.uid).then(token => {
                firebase.auth().signInWithCustomToken(token).then(result => {
                    return result.user.sendEmailVerification();
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error })
                })
            }).then(() => {
                var options = {
                    method: 'POST',
                    url: 'https://api.hubapi.com/companies/v2/companies',
                    qs: { hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8' },
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        properties:
                            [{ name: 'name', value: name },
                            { name: 'email', value: email },
                            { name: 'phone', value: phone },
                            { name: 'city', value: city },
                            { name: 'country', value: country },
                            { name: 'industry', value: sector },
                            { name: 'nif', value: nif},
                            { name: 'responsible', value: responsible}]
                    },
                    json: true
                };
                try {
                    request(options, function (error, response, body) {
                        if (error) res.status(500).send({ error: error });
                        // Store hash in database
                        adminFb.database().ref('/users/' + result.uid).set({ hubspot_id: body.companyId, email: email }).then(() => {
                            if (type == "empresa") {
                                adminFb.auth().setCustomUserClaims(result.uid, { empresa: true }).then(() => {
                                    res.status(200).send({ data: "Companhia " + name + " foi criada com o ID: " + body.companyId });
                                }).catch(error => {
                                    console.log(error)
                                    res.status(500).send({ error: error })
                                })
                            }
                            else if (type == "camara") {
                                adminFb.auth().setCustomUserClaims(result.uid, { camara: true }).then(() => {
                                    res.status(200).send({ data: "Companhia " + name + " foi criada com o ID: " + body.companyId });
                                }).catch(error => {
                                    console.log(error)
                                    res.status(500).send({ error: error })
                                })
                            }
                        }).catch(error => {
                            console.log(error)
                            res.status(500).send({ error: error })
                        })
                    })
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: error })
                }
            }).catch(error => {
                console.log(error)
                res.status(500).send({ error: error })
            })
        }).catch(function (error) {
            console.log(error)
            res.status(500).send({ error: error })
        })
    } else {
        res.status(400).send({ error: "Insira o tipo camara ou empresa" })
    }
}
exports.requestEmailVerification = function (req, res, err){
    var email = req.sanitize('email').escape();
    adminFb.auth().getUserByEmail(email).then(user => {
        adminFb.auth().createCustomToken(user.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.sendEmailVerification().then(() => {
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({error: error});
                    res.end();
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error});
                res.end();
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error});
            res.end();
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send({error: error});
        res.end();
    })
}