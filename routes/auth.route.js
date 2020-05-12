const authController = require('../controllers/auth.controller.js');
module.exports = function(app) {
    //Auth Routes
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/user', authController.user);
    app.get('/logout', authController.logout);
    app.post('/requestEmailVerification', authController.requestEmailVerification);
    app.post('/notification/token', authController.saveNotiToken);
    app.get('/denied', (req, res) => {
        res.status(401).send('Acesso não autorizado!');
    })
    
};
