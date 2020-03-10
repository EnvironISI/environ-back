const authController = require('../controllers/auth.controller.js');
var {firebase, admin} = require('../config/firebaseConfig.js');
module.exports = function(app) {
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/user', isLoggedIn, authController.user);
    app.get('/logout', isLoggedIn, authController.logout);
    app.get('/login', (req, res)=>{res.status(401).send('Login não efetuado')});

    app.put('/edit/:uid', isLoggedIn, authController.edit);
    app.delete('/delete/:uid', isLoggedIn, authController.delete);
    app.post('/recoverPassword', authController.recoverPassword);
    function isLoggedIn(req, res, next) {
        firebase.auth().currentUser.getIdToken(true).then(function(idToken){
            var user = firebase.auth().currentUser;
            if(user != null){
                req.user = user;
                next();
            }else{
                res.redirect('/login');
            }
        }).catch(error =>{
            console.log(error);
            res.status(500).send(error);
        })
    }

};
