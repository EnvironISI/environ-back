const router = require('express').Router();
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

const userController = require('../controllers/user.controller');
const adminController = require('../controllers/admin.controller');

//Bloquear os acessos
router.get('/*', function(req, res) {
    res.redirect('/denied');
    res.end();
});


/* Alterar depois */
 //User Routes
router.post('/recoverPassword', userController.recoverPassword);
router.post('/changeEmail', userController.changeEmail);
router.put('/edit/', userController.edit);
router.delete('/delete/me', userController.deleteMe)
router.get('/hello', (req, res) => {res.send('hello'); res.end()})

//Admin Routes
router.delete('/admin/delete/:uid', adminController.delete);
router.put('/admin/set/:uid', adminController.setAdmin);


module.exports = router;
