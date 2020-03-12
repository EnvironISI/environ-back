const authController = require('../controllers/auth.controller.js');
var {admin} = require('../config/firebaseConfig.js');
module.exports = function(app) {
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.get('/user', authController.user);
    app.get('/logout', authController.logout);
    app.get('/login', (req, res)=>{res.status(401).send('Login não efetuado')});

    app.put('/edit/:uid', authController.edit);
    app.delete('/delete/:uid', authController.delete);
};
