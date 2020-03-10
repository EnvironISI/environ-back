const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require("request");
var {admin, firebase} = require('../config/firebaseConfig.js');

var exports = module.exports = {};

exports.user = function(req, res, err){
    res.send(req.user.uid);
    /*admin.auth().getUser(req.user.uid).then((userRecord) => {
        res.status(200).send({user: req.user, roles: userRecord.customClaims})
    });*/
}
exports.login = function(req, res, err){
    var password = req.sanitize('password').escape();
    var email = req.sanitize('email').escape();

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (result){
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        result.user.getIdToken().then((idToken) => {
            admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
            
                // Set cookie policy for session cookie and set in response.
                const options = {maxAge: expiresIn, httpOnly: true, secure: true};
                res.cookie('__session', sessionCookie, options);
                
                admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
                    res.status(200).send(result.user);
                });
                    
            }, error => {
                res.status(401).send('UNAUTHORIZED REQUEST!');
                console.log(error);
            });
        })
    }).catch(function(error) {
        res.status(500).send(error)
    });
}
exports.logout = function(req, res, err){
    firebase.auth().signOut().then(result => {
        res.clearCookie("__session");
        res.status(200).send("Logout Sucessfully")
    }).catch(function (err) {
        res.status(500).send(err);
    });
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
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){

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
            if (error) throw new Error(error);
            // Store hash in database
            admin.auth().updateUser(result.user.uid, {
                phoneNumber: phone,
                displayName: name
            }).then(() => {
                admin.database().ref('/users/'+ result.user.uid).set({hubspot_id: body.companyId, email: email}, function(error){
                    if(error){
                        res.status(400).send(error);
                    }
                    else{
                        admin.auth().setCustomUserClaims(result.user.uid, {empresa: true}).then(() => {
                            res.status(200).send("Companhia " + name + " foi criada com o ID: " + body.companyId);
                        });
                    }
                });
            })
        })
    })
    .catch(function(error) {
        res.status(500).send(error)
    })
}
exports.edit = function(req, res, err){
    const uid = req.params.uid;
    const photo_url = req.body.photo_url;
    const display_name = req.sanitize('display_name').escape();
    var name = req.sanitize('name').escape();
    var email = req.sanitize('email').escape();
    var phone = req.sanitize('phone').escape();
    var city = req.sanitize('city').escape();
    var country = req.sanitize('country').escape();
    //var sector = req.sanitize('sector').escape();
    var nif = req.sanitize('nif').escape();

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
            // Store hash in database
            admin.database().ref('/users/'+ uid).set({hubspot_id: body.companyId, email: email}, function(error){
                if(error){
                    res.status(400).send(error);
                }
                else{
                    admin.auth().setCustomUserClaims(uid, {empresa: true}).then(() => {
                        admin.auth().updateUser(uid, {
                            email: email,
                            displayName: display_name,
                            photoURL: photo_url
                        }).then(() => {
                            res.status(200).send("Empresa " + name + " foi alterada");
                        })
                    });
                }
            });
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send("Server Error");
    })
}
exports.delete = function(req, res, err){
    var uid = req.params.uid;

    admin.database().ref("/users/"+uid).once('value').then(function(snapshot){ 
        admin.auth().deleteUser(uid).then(function(){ 
            var userInfo = snapshot.val(); 
            var options = {method: 'DELETE', 
            url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
            qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'}
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                if(uid == firebase.auth().currentUser.uid){
                    firebase.auth().signOut();
                    console.log("logout com sucesso")
                }
                admin.database().ref("/users/"+uid).remove(function(){
                    res.status(200).send("Empresa removida com sucesso!");
                })
            })
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send("Server Error");
    })

}
exports.recoverPassword = function(req, res, err){
    var email = req.body.email;
    admin.auth().getUserByEmail(email).then(function(userRecord){
        firebase.auth().sendPasswordResetEmail(userRecord.email).then(function() {
            // Email sent.
            res.status(200).send('Email to recover password has been sent');
        })
    }).catch(function(error) {
        console.log(error);
        res.status(500).send(error);
    });
}