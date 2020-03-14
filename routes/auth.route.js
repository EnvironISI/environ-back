const authController = require('../controllers/auth.controller.js');
module.exports = function(app) {
    //Auth Routes
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/user', authController.user);
    app.get('/logout', authController.logout);
    app.get('/denied', (req, res) => {
        res.status(401).send('Acesso não autorizado!');
    })

    /* Alterar depois
    //User Routes
    app.post('/recoverPassword', authController.recoverPassword);
    app.post('/changeEmail', authController.changeEmail);
    app.put('/edit/', authController.edit);
    app.delete('/delete/me', authController.deleteMe)

    //Admin Routes
    app.delete('/delete/user/:uid', authController.delete);
    app.put('/setadmin/:uid', authController.setAdmin);*/
};
