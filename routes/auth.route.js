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
        if(req.headers.authtoken){
            var idToken = req.headers.authtoken;
            admin.auth().verifyIdToken(idToken).then(function(decodeToken){
                admin.auth().getUser(decodeToken.uid).then(user => {
                    req.user = user;
                    next();
                })
            }).catch(error =>{
                console.log(error);
                res.status(500).send(error);
            })
        }
    }
};
