const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var {admin, firebase} = require('../config/firebaseConfig.js');

var exports = module.exports = {};

//User
exports.edit = function(req, res, err){
    var name = req.sanitize('name').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    var nif = req.sanitize('nif').escape();
    var phone = req.body.phone;
    var photo_url = req.body.photo_url;

    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        admin.database().ref('/users/' + decodedClaims.uid).once('value').then(snapshot => {
            admin.auth().getUser(uid).then(user => {
                if(photo_url == null) photo_url = user.photoURL
                if(phone == null) phone = user.phoneNumber
                var userInfo = snapshot.val();

                var options = {
                    method: 'PUT', 
                    url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                    qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'},
                    headers: {'Content-Type': 'application/json' },
                    body:{ 
                        properties:
                            [{ name: 'name', value: name },
                            { name: 'city', value: city},
                            { name: 'country', value: country},
                            { name: 'nif', value: nif},
                            { name: 'phone', value: phone}] 
                        },
                    json: true 
                };

                request(options, function (error, response, body) {
                    if(error) res.status(500).send({error: error});
                    // Store hash in database
                    admin.auth().updateUser(uid, {
                        displayName: name,
                        photoURL: photo_url
                    }).then(() => {
                        res.status(200).send({data: "Empresa " + name + " foi alterada"});
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({error: error})
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({error: error})
                })
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error})
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })
}
exports.recoverPassword = function(req, res, err){
    var email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        // Email sent.
        res.status(200).send({data: "Email sent successfully"});
    }).catch(error => {
        console.log(error)
        res.status(500).send({error: error});
    })
}
exports.changeEmail = function(req, res, err){
    var sessionCookie = req.cookies.session || '';
    var email = req.body.email;

    admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        admin.auth().createCustomToken(decodedClaims.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.updateEmail(email).then(() => {
                    res.status(200).send({data: "Email alterado com sucesso"});
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({error: error})
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error})
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error})
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied')
    })
}
exports.changePhone = function(req, res, err){
    var sessionCookie = req.cookies.session || '';
    var phone = req.body.phone;

    admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        admin.auth().createCustomToken(decodedClaims.uid).then(token => {
            firebase.auth().signInWithCustomToken(token).then(result => {
                result.user.updatePhoneNumber(phone).then(() => {
                    res.status(200).send({data: "Número de telemóvel alterado com sucesso"});
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({error: error})
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error})
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error})
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied')
    })
}
exports.deleteMe = function(req, res, err){
    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        admin.database().ref("/users/" + decodedClaims.uid).once('value').then(snapshot => { 
            admin.auth().deleteUser(decodedClaims.uid).then(() => { 
                var userInfo = snapshot.val(); 
                var options = {method: 'DELETE', 
                    url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                    qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'}
                };
                request(options, function (error, response, body) {
                    if (error) res.status(500).send({error: error});
                    admin.database().ref("/users/" + decodedClaims.uid).remove(function(){
                        res.status(200).send({data: "Empresa removida com sucesso!"});
                        res.redirect('/logout');
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({error: error})
                    })
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error})
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error})
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })

}