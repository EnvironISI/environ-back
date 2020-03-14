const router = require('express').Router();
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

//Bloquear os acessos às restantes rotas
router.get('*', function(req, res) {
    res.redirect('/denied');
    res.end();
});

module.exports = router;
