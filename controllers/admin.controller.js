const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var { adminFb } = require('../config/firebaseConfig.js');
var { hubspot } = require('../config/hubspotConfig');
var { moloni } = require('../config/moloniConfig');

var exports = module.exports = {};


//Admin
exports.setAdmin = function (req, res, err) {
    var email = req.sanitize('email').escape();
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie).then(decodedClaims => {
        adminFb.auth().getUser(decodedClaims.uid).then(user => {
            if (user.customClaims.admin) {
                adminFb.auth().getUserByEmail(email).then(user => {
                    adminFb.auth().setCustomUserClaims(user.uid, { admin: true }).then(() => {
                        res.status(200).send({ data: "O Utilizador " + email + " é agora Administrador!" });
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error });
                })
            }
            else {
                res.status(401).send('Não está autorizado fazer esta ação');
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })
}
exports.deleteUser = function (req, res, err) {
    var email = req.sanitize('email').escape();

    adminFb.auth().getUserByEmail(email).then(user => {
        adminFb.database().ref("/users/" + user.uid).once('value').then(snapshot => {
            var userInfo = snapshot.val();
            hubspot.companies.delete(userInfo.hubspot_id).then(() => {
                adminFb.database().ref("/users/" + user.uid).remove(function () {
                    adminFb.auth().deleteUser(user.uid).then(() => {
                        res.status(200).send({ msg: "Utilizador removido com sucesso!" });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({ error: error })
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error })
                })
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
        })
    })

}
exports.getUsers = function (req, res, err) {

    adminFb.auth().listUsers().then((userRecords) => {
        var resp = [];
        let i = 0;
        try {
            userRecords.users.forEach((user) => {
                var { uid, displayName, email, phoneNumber, photoURL, emailVerified, disabled } = user;
                adminFb.database().ref('/users/' + uid).once('value').then(async (snapshot) => {
                    var userInfo = snapshot.val();
                    var obj;
                    var reqJson = hubspot.companies.getById(userInfo.hubspot_id).then(body => {
                        let nif, country, city, setor, role, createdate;
                        if (body.properties.nif !== undefined)
                            nif = body.properties.nif.value;
                        if (body.properties.country !== undefined)
                            country = body.properties.country.value;
                        if (body.properties.city !== undefined)
                            city = body.properties.city.value;
                        if (body.properties.industry !== undefined)
                            setor = body.properties.industry.value;
                        if (body.properties.createdate !== undefined)
                            createdate = body.properties.createdate.value;
                        if (user.customClaims.empresa)
                            role = 'empresa';
                        else if (user.customClaims.admin)
                            role = 'admin';
                        else if (user.customClaims.camara)
                            role = 'camara';
                        obj = {
                            uid: uid,
                            name: displayName,
                            email: email,
                            phoneNumber: phoneNumber,
                            photoUrl: photoURL,
                            role: role,
                            nif: nif,
                            country: country,
                            city: city,
                            setor: setor,
                            emailVerified: emailVerified,
                            disabled: disabled,
                            createdate: createdate
                        };
                        return obj;
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send(error);
                    })
                    var respJson = await reqJson;
                    resp.push(respJson);
                    if ((i + 1) == userRecords.users.length) {
                        res.status(200).send(resp);
                        res.end();
                    }
                    i++;
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error });
                    res.end();
                });
            })
        } catch (error) { console.log(error) }
    }).catch(error => {
        console.log(error);
        res.status(500).send({ error: error });
        res.end();
    })
}
exports.enableUser = function (req, res, err) {
    var email = req.sanitize('email').escape();

    adminFb.auth().getUserByEmail(email).then(user => {
        if (user.disabled == true) {
            adminFb.auth().updateUser(user.uid, {
                disabled: false
            }).then(() => {
                res.status(200).send({ msg: "Account enabled Successfully" });
                res.end();
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
                res.end();
            })
        }
        else {
            res.status(400).send({ error: "Account is already enabled" });
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
}
exports.deleteEvent = function (req, res, err) {
    var eventId = req.sanitize('eventId').escape();
    var sessionCookie = req.cookies.session || '';

    moloni.products('getOne', { company_id: 126979, product_id: eventId }, function (error, event) {
        if (error) console.log(error);
        moloni.products('delete', { company_id: 126979, product_id: eventId }, function (error, result) {
            if (error) {
                res.status(400).send({ error: error });
                res.end();
            }
            adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
                adminFb.auth().getUser(decodedClaims.uid).then(from => {
                    var msg = 'O seu evento ' + event.name + " foi eliminado!";
                    sendNotifications.sendNoti(msg, from, event.properties[1].value, "evento");
                })
            })

            res.status(200).send(result);
            res.end();
        })
    })
}
exports.getUserByEmail = function (req, res, err) {
    var email = req.sanitize('email').escape();

    adminFb.auth().getUserByEmail(email).then(user => {
        adminFb.database().ref('/users/' + user.uid).once('value').then(async (snapshot) => {
            var userInfo = snapshot.val();
            var obj;
            var reqJson = hubspot.companies.getById(userInfo.hubspot_id).then(body => {
                let nif, country, city, setor, role, createdate;
                if (body.properties.nif !== undefined)
                    nif = body.properties.nif.value;
                if (body.properties.country !== undefined)
                    country = body.properties.country.value;
                if (body.properties.city !== undefined)
                    city = body.properties.city.value;
                if (body.properties.industry !== undefined)
                    setor = body.properties.industry.value;
                if (body.properties.createdate !== undefined)
                    createdate = body.properties.createdate.value;
                if (user.customClaims.empresa)
                    role = 'empresa';
                else if (user.customClaims.admin)
                    role = 'admin';
                else if (user.customClaims.camara)
                    role = 'camara';
                obj = {
                    uid: uid,
                    name: displayName,
                    email: email,
                    phoneNumber: phoneNumber,
                    photoUrl: photoURL,
                    role: role,
                    nif: nif,
                    country: country,
                    city: city,
                    setor: setor,
                    emailVerified: emailVerified,
                    disabled: disabled,
                    createdate: createdate
                };
                return obj;
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
            var respJson = await reqJson;
            res.status(200).send(respJson);
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
            res.end();
        });
    })
}