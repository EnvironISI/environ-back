const authController = require('../controllers/auth.controller.js');
var {admin} = require('../config/firebaseConfig.js');
module.exports = function(app) {
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/user', isLoggedIn, authController.user);
    //app.get('/logout', isLoggedIn, authController.logout);
    //app.get('/login', (req, res)=>{res.status(401).send('Login não efetuado')});

    app.put('/edit/:uid', isLoggedIn, authController.edit);
    app.delete('/delete/:uid', isLoggedIn, authController.delete);
    //app.post('/recoverPassword', authController.recoverPassword);

    function isLoggedIn(req, res, next) {
        const sessionCookie = req.cookies.session || '';
        admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
            .then((decodedClaims) => {
                console.log(decodedClaims);
                next();
              //serveContentForUser('/profile', req, res, decodedClaims);
            })
            .catch(error => {
              // Session cookie is unavailable or invalid. Force user to login.
              res.redirect('/login');
            });
        /*if(req.headers.authtoken){
            var idToken = req.headers.authtoken;
            admin.auth().verifyIdToken(idToken).then(function(decodeToken){
                admin.auth().getUser(decodeToken.uid).then(user => {
                    req.user = user;
                    next();
                })
            }).catch(error =>{
                res.status(403).send("Não autorizado!");
            })
        }else{
            res.status(403).send("Não autorizado!");
        }*/
    }
};
