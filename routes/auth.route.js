const authController = require('../controllers/auth.controller.js');
module.exports = function(app) {
    app.post('/register', authController.register);
    //app.post('/sessionLogin', authController.sessionLogin);
    app.post('/login', authController.login);
    app.get('/user', authController.user);
    app.get('/logout', authController.logout);
    app.get('/login', (req, res)=>{
        res.status(401).send({data: 'Acesso Não Autorizado'})
    });
    app.post('/recoverPassword', authController.recoverPassword);

    app.put('/edit/:uid', authController.edit);
    app.delete('/delete/user/:uid', authController.delete);
    app.delete('/delete/me', authController.deleteMe)
    app.put('/setadmin/:uid', authController.setAdmin);
};
