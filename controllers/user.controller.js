const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

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
                    params.properties.push({ name: 'name', value: name });
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
                        res.status(500).send({ error: error });
                        res.end();
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error });
                    res.end();
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error });
                res.end();
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
            res.end();
        });
    });
}
exports.recoverPassword = function (req, res, err) {
    var email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        // Email sent.
        res.status(200).send({ msg: "Email para recuperar a password enviado com sucesso!" });
        res.end();
    }).catch(error => {
        console.log(error);
        res.status(500).send({ error: error });
        res.end();
    });
}
exports.changeEmail = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var email = req.sanitize('email').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        adminFb.auth().createCustomToken(decodedClaims.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.updateEmail(email).then(() => {
                    result.user.sendEmailVerification(() => {
                        res.status(200).send({ msg: "Email alterado com sucesso! Para ativar a conta, verifique o seu email!" });
                        res.end();
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).send({ error: error });
                        res.end();
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error });
                    res.end();
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error });
                res.end();
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
            res.end();
        });
    }).catch(() => {
        res.redirect('/denied')
        res.end();
    });
}
exports.changePhone = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var verificationId = req.body.verificationId;
    var verificationCode = req.body.verificationCode;

    var phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId,
        verificationCode);

    adminFb.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        adminFb.auth().createCustomToken(decodedClaims.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.updatePhoneNumber(phoneCredential).then(() => {
                    res.status(200).send({ msg: "Número de telemóvel alterado com sucesso!" });
                    res.end();
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: error });
                    res.end();
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error: error });
                res.end();
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
            res.end();
        });
    }).catch(() => {
        res.redirect('/denied');
        res.end();
    });
}
exports.changePassword = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var newPassword = req.sanitize('password').escape();
    adminFb.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        adminFb.auth().updateUser(decodedClaims.uid, {
            password: newPassword
        }).then(() => {
            res.status(200).send({ msg: "Password alterada com sucesso!" });
            res.end();
        }).catch(error => {
            res.status(500).send({ error: error });
            res.end();
        });
    }).catch(() => {
        res.redirect('/denied');
        res.end();
    });
}
exports.deleteMe = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.auth().updateUser(decodedClaims.uid, {
            disabled: true
        }).then(() => {
            res.status(200).send({ msg: 'Conta desativada com sucesso!' });
            res.end();
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error });
            res.end();
        });
    }).catch(() => {
        res.redirect('denied');
        res.end();
    });
}
exports.getNotifications = function (req, res, err) {
    const sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        var refUID = adminFb.database().ref('/notifications/' + decodedClaims.uid);
        refUID.once('value').then(snapshot => {
            if (!snapshot.hasChildren()) {
                res.status(200).send({ msg: 'Não tem notificações' });
            }
            else {
                var notifications = snapshot.val();
                var count = 0;
                notifications.forEach(element => {
                    if (element.status == "unread") {
                        count++;
                    }
                });
                res.status(200).send({ notifications: notifications, length: count });
            }

        })
    })
}
exports.readNotification = function (req, res, err) {
    const sessionCookie = req.cookies.session || '';
    var notificationID = req.sanitize('notificationID').escape();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        var refUID = adminFb.database().ref('/notifications/' + decodedClaims.uid + "/" + notificationID);
        refUID.once('value').then(snapshot => {
            var notification = snapshot.val();
            adminFb.database().ref('/notifications/' + decodedClaims.uid + "/" + notificationID).set({ status: 'read', from: notification.from, avatar: notification.avatar, msg: notification.msg, date: notification.date, notificationID: notification.notificationID, type: notification.type }).then(() => {
                res.status(200).send('Read');
            })
        })
    })
}
exports.news = function (req, res, err) {
    var info;
    var date = new Date;

    date.setDate(date.getDate() - 15);
    var ano = date.getFullYear().toString(),
        mes = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
        dia = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate().toString();

    var url =
        "https://newsapi.org/v2/everything?" +
        "q=Environment%20OR%20Preservation%20OR%20Cleaning%20forests%20OR%20Pollution&" +
        "from=" + ano + "-" + mes + "-" + dia + "&" +
        "pageSize=20&" +
        "sortBy=popularity&" +
        "apiKey=1602c707c35b423f946e6f8c60b76dde";

    var request = new Request(url);
    
    fetch(request)
        .then(response => response.json())
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
        })

}
exports.doneTutorial = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        adminFb.database().ref('/users/' + decodedClaims.uid).once('value').then(snapshot => {
            var user = snapshot.val();
            adminFb.database().ref('/users/' + decodedClaims.uid).set({hubspot_id: user.hubspot_id, email: user.email, newUser: 0}).then(() => {
                res.status(200).send('Lido')
            })
        })
    }).catch(error => {
        console.log(error);
    })

}