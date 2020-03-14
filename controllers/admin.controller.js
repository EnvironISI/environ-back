const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

var request = require('request');
var {admin, firebase} = require('../config/firebaseConfig.js');

var exports = module.exports = {};

//Admin
exports.setAdmin = function(req, res, err){
    var uid = req.params.uid;
    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie).then(decodedClaims => {
        admin.auth().getUser(decodedClaims.uid).then(user => {
            if(user.customClaims.admin){
                admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
                    res.status(200).send({data: "Utilizador " + uid + " é agora Administrador!"});
                })
            }
            else{
                res.status(401).send('Não está autorizado fazer esta ação');
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({error: error});
        })
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })
}
exports.delete = function(req, res, err){
    var uid = req.params.uid;
    var sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        if(decodedClaims.uid == uid || decodedClaims.admin){
            admin.database().ref("/users/"+uid).once('value').then(snapshot => { 
                admin.auth().deleteUser(uid).then(() => { 
                    var userInfo = snapshot.val(); 
                    var options = {method: 'DELETE', 
                        url: `https://api.hubapi.com/companies/v2/companies/${userInfo.hubspot_id}`,
                        qs: {hapikey: 'e2c3af5b-f5fa-4cb8-a190-0409f322b8f8'}
                    };
                    request(options, function (error, response, body) {
                        if (error) res.status(500).send({error: error});
                        if(uid == decodedClaims.uid){
                            res.redirect('/logout');
                        }
                        admin.database().ref("/users/"+uid).remove(function(){
                            res.status(200).send({data: "Empresa removida com sucesso!"});
                        }).catch(error => {
                            console.log(error);
                            res.status(500).send({error: error})
                        })
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({error: error})
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send({error: error})
            })
        }else{
            res.redirect('/denied');
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
    })

}