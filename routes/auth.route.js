const authController = require('../controllers/auth.controller.js');
module.exports = function(app, firebase) {
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/user', isLoggedIn, authController.user);
    app.get('/logout', isLoggedIn, authController.logout);
    app.get('/login', (req, res)=>{res.send('Login não efetuado')});

    app.put('/edit/:uid', isLoggedIn, authController.edit);
    app.delete('/delete/:uid', isLoggedIn, authController.delete);

    function isLoggedIn(req, res, next) {
        var user = firebase.auth().currentUser;
        if(user !== null) {
            req.user = user;
            next();
        }else{
            res.redirect('/login');
        }
    }

};
