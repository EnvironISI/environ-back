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
          res.status(200).send(user);
      })
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      console.log(error)
      res.redirect('/login');
    });
}
exports.login = function(req, res, err){
    /*var password = req.sanitize('password').escape();
    var email = req.sanitize('email').escape();

    firebase.auth().signInWithEmailAndPassword(email, password).then(result =>{
        result.user.getIdToken().then(idToken => {
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            admin.auth().createSessionCookie(idToken, {expiresIn})
            .then((sessionCookie) => {
                // Set cookie policy for session cookie.
                const options = {maxAge: expiresIn, httpOnly: true, secure: true};
                res.cookie('session', sessionCookie, options);
                res.status(200).send({data: result.user, token: idToken});
            }, error => {
                console.log(error);
                res.status(401).send('UNAUTHORIZED REQUEST!');
            });
        });
    }).then(() => {
        // A page redirect would suffice as the persistence is set to NONE.
        return firebase.auth().signOut();
    }).catch(function(error) {
        res.status(500).send(error)
    });*/
    // Get the ID token passed and the CSRF token.

    const idToken = req.body.idToken
    const csrfToken = req.body.csrfToken
    // Guard against CSRF attacks.

    if (csrfToken !== req.cookies.csrfToken) {
        res.status(401).send('UNAUTHORIZED REQUEST!');
        return;
    }

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = {expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000), httpOnly: true, secure: true};
        res.cookie('session', sessionCookie, options);
        console.log('nice')
        res.end(JSON.stringify({status: 'success'}));
    }, error => {
        console.log(error);
        res.status(401).send('UNAUTHORIZED REQUEST!');
    });
}
exports.logout = function(req, res, err){
    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        res.clearCookie('session');
        res.status(200).send('Logout Successfully');
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
            if (error) throw new Error(error);
            // Store hash in database
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
/*exports.recoverPassword = function(req, res, err){
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
}*/