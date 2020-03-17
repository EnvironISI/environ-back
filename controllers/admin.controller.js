const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require('request');
var { adminFb, firebase } = require('../config/firebaseConfig.js');

var exports = module.exports = {};

//Admin
exports.setAdmin = function (req, res, err) {
    var uid = req.params.uid;
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie).then(decodedClaims => {
        adminFb.auth().getUser(decodedClaims.uid).then(user => {
            if (user.customClaims.admin) {
                adminFb.auth().setCustomUserClaims(uid, { admin: true }).then(() => {
                    res.status(200).send({ data: "Utilizador " + uid + " é agora Administrador!" });
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
exports.delete = function (req, res, err) {
    var uid = req.params.uid;
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        if (decodedClaims.uid == uid || decodedClaims.admin) {
            adminFb.database().ref("/users/" + uid).once('value').then(snapshot => {
                adminFb.auth().deleteUser(uid).then(() => {
                    var userInfo = snapshot.val();
                    var options = {
                        method: 'DELETE',
                        url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                        qs: { hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8' }
                    };
                    try {
                        request(options, function (error, response, body) {
                            if (error) res.status(500).send({ error: error });
                            if (uid == decodedClaims.uid) {
                                res.redirect('/logout');
                            }
                            adminFb.database().ref("/users/" + uid).remove(function () {
                                res.status(200).send({ data: "Empresa removida com sucesso!" });
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
        } else {
            res.redirect('/denied');
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })

}
exports.getUsers = function (req, res, err) {

    adminFb.auth().listUsers().then((userRecords) => {
        var resp = [];
        var obj;
        let i = 0;
        try {
            userRecords.users.forEach((user) => {
                var { uid, displayName, email, phoneNumber, photoURL, emailVerified } = user;
                adminFb.database().ref('/users/' + uid).once('value').then(async (snapshot) => {
                    var userInfo = snapshot.val();
                    var url = new URL(`https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`)
                    var params = { hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'} // or:
                    url.search = new URLSearchParams(params).toString();
                    var reqJson = await fetch(url.toString(), { method: 'GET', json: true }).then(result => {
                        return result.json();
                    }).then(body => {
                        let nif, country, city, setor, role;
                        if (body.properties.nif !== undefined)
                            nif = body.properties.nif.value;
                        if (body.properties.country !== undefined)
                            country = body.properties.country.value;
                        if (body.properties.city !== undefined)
                            city = body.properties.city.value;
                        if (body.properties.industry !== undefined)
                            setor = body.properties.industry.value;
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
                            emailVerified: emailVerified
                        };
                        return obj;
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({ error: error });
                    })
                    var respJson = await reqJson;
                    resp.push(respJson);
                        if ((i + 1) == userRecords.users.length) {
                            res.status(200).send(resp);
                            res.end()
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