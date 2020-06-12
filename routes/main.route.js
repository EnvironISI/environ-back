const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

const router = require('express').Router();

//Bloquear os acessos às restantes rotas
router.get('*', function(req, res) {
    res.redirect('/denied');
    res.end();
});

module.exports = router;
