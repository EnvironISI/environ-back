const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require("request");
var {admin, firebase} = require('../config/firebaseConfig.js');

var exports = module.exports = {};

exports.user = function(req, res, err){
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        admin.auth().getUser(decodedClaims.uid).then(user => {
            console.log(user)
            admin.database().ref('/users/' + decodedClaims.uid).once('value').then(snapshot => {
                var userInfo = snapshot.val();
                let info = [];
                let role;
                var options = {
                    method: 'GET', 
                    url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                    qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'},
                    json: true
                };
                request(options, function (error, response, body) {
                    if(error) res.status(500).send({error: error});
                    if(user.customClaims.empresa) role = 'empresa';
                    else if(user.customClaims.admin) role = 'admin';
                    else if(user.customClaims.camara) role = 'camara';
                    info = {
                        uid: user.uid, 
                        name: user.displayName,
                        email: user.email, 
                        emailVerfied: user.emailVerified, 
                        phoneNumber: user.phoneNumber, 
                        photoUrl: user.photoURL,
                        role: role,
                        disabled: user.disabled,
                        nif: body.properties.nif.value,
                        country: body.properties.country.value,
                        city: body.properties.city.value,
                        setor: body.properties.industry.value
                    };
                    res.status(200).send({user: info, token: sessionCookie});
                }) 
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error});
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error})
        })
    }).catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      console.log(error)
      res.redirect('/login');
    });
}
exports.login = function(req, res, err){
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        // Get the user's ID token as it is needed to exchange for a session cookie.
        return user.user.getIdToken().then(idToken => {
            // Session login endpoint is queried and the session cookie is set.
            // CSRF protection should be taken into account.
            // ...
            //res.status(200).send({idToken: idToken});
            // Set session expiration to 5 days.
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            // Create the session cookie. This will also verify the ID token in the process.
            // The session cookie will have the same claims as the ID token.
            // To only allow session cookie setting on recent sign-in, auth_time in ID token
            // can be checked to ensure user was recently signed in before creating a session cookie.
            admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
                // Set cookie policy for session cookie.
                const options = {expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000), httpOnly: false, secure: false};
                res.cookie('session', sessionCookie, options);
                res.send({status: 'success'})
            }, error => {
                console.log(error);
                res.redirect('/login');
            });
        });
    }).then(() => {
        // A page redirect would suffice as the persistence is set to NONE.
        return firebase.auth().signOut();
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    })
}
exports.logout = function(req, res, err){
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    res.clearCookie('session');
    admin.auth().verifySessionCookie(sessionCookie).then((decodedClaims) => {
        return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    }).then(() => {
        res.status(200).send({data: 'Logout Successfully'});
    }).catch(error => {
        console.log(error);
        res.redirect('/login');
    })
}
exports.register = function(req, res, err){
    var name = req.sanitize('name').escape();
    var email = req.sanitize('email').escape();
    var phone = req.sanitize('phone').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    var sector = req.sanitize('sector').escape();
    var nif = req.sanitize('nif').escape();
    var password = req.sanitize('password').escape();
    let type = req.sanitize('type').escape();

    if(type == "camara" || type == "empresa"){
        admin.auth().createUser({
            email: email,
            password: password,
            phoneNumber: phone,
            displayName: name
        }).then(function(result){
            var options = {method: 'POST', 
            url: 'https://api.hubapi.com/companies/v2/companies',
            qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'},
            headers: {'Content-Type': 'application/json' },
            body:{ 
                properties:
            [{ name: 'name', value: name },
                { name: 'email', value: email},
                { name: 'phone', value: phone},
                { name: 'city', value: city},
                { name: 'country', value: country},
                { name: 'industry', value: sector},
                { name: 'nif', value: nif}] 
            },
            json: true 
            };
            request(options, function (error, response, body) {
                if (error) res.status(500).send({error: error});
                // Store hash in database
                admin.database().ref('/users/'+ result.uid).set({hubspot_id: body.companyId, email: email}).then(() => {
                    if(type == "empresa"){
                        admin.auth().setCustomUserClaims(result.uid, {empresa: true}).then(() => {
                            res.status(200).send({data: "Companhia " + name + " foi criada com o ID: " + body.companyId});
                        }).catch(error => {
                            console.log(error)
                            res.status(500).send({error: error})
                        })
                    }
                    else if(type == "camara"){
                        admin.auth().setCustomUserClaims(result.uid, {camara: true}).then(() => {
                            res.status(200).send({data: "Companhia " + name + " foi criada com o ID: " + body.companyId});
                        }).catch(error => {
                            console.log(error)
                            res.status(500).send({error: error})
                        })
                    }
                }).catch(error => {
                    console.log(error)
                    res.status(500).send({error: error})
                })
            })
        }).catch(function(error) {
            console.log(error)
            res.status(500).send({error: error})
        })
    }else{
        res.status(400).send({error: "Insira o tipo camara ou empresa"})
    }
}
exports.edit = function(req, res, err){
    const uid = req.params.uid;

    const photo_url = req.body.photo_url;
    var name = req.sanitize('name').escape();
    var email = req.sanitize('email').escape();
    var phone = req.sanitize('phone').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    //var sector = req.sanitize('sector').escape();
    var nif = req.sanitize('nif').escape();

    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        if(uid == decodedClaims.uid || decodedClaims.admin){
            admin.database().ref('/users/' + uid).once('value').then(snapshot => {
                var userInfo = snapshot.val();

                var options = {
                    method: 'PUT', 
                    url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                    qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'},
                    headers: {'Content-Type': 'application/json' },
                    body:{ 
                        properties:
                        [{ name: 'name', value: name },
                        { name: 'email', value: email},
                        { name: 'phone', value: phone},
                        { name: 'city', value: city},
                        { name: 'country', value: country},
                        //{ name: 'industry', value: sector},
                        { name: 'nif', value: nif}] 
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
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error})
            })
        }else{
            res.redirect('/login');
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/login');
    })
}
exports.delete = function(req, res, err){
    var uid = req.params.uid;
    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        if(decodedClaims.uid == uid || decodedClaims.admin){
            admin.database().ref("/users/"+uid).once('value').then(snapshot => { 
                admin.auth().deleteUser(uid).then(() => { 
                    var userInfo = snapshot.val(); 
                    var options = {method: 'DELETE', 
                        url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                        qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'}
                    };
                    request(options, function (error, response, body) {
                        if (error) res.status(500).send({error: error});
                        if(uid == decodedClaims.uid){
                            res.redirect('/logout');
                        }
                        admin.database().ref("/users/"+uid).remove(function(){
                            res.status(200).send({data: "Empresa removida com sucesso!"});
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
        }else{
            res.redirect('/login');
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/login');
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
        res.redirect('/login');
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
    var email = req.sanitize('email').escape();

    admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        admin.auth().updateUser(decodedClaims.uid, {email: email}).then(() => {
            admin.auth().generateEmailVerificationLink(email, {url: 'https://isienviron.firebaseapp.com/'}).then((link) => {
                res.status(200).send({data: "Link " + link + " verificar email" })
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
        res.redirect('/login')
    })
}
exports.setAdmin = function(req, res, err){
    var uid = req.params.uid;
    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie).then(decodedClaims => {
        admin.auth().getUser(decodedClaims.uid).then(user => {
            if(user.customClaims.admin){
                admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
                    res.status(200).send({data: "Utilizador " + uid + " é agora Administrador!"});
                })
            }
            else{
                res.status(401).send('Não está autorizado fazer esta ação');
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error});
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/login');
    })
}