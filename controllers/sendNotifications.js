var { adminFb } = require('../config/firebaseConfig');

var exports = module.exports = {};

exports.sendNoti = function (creator, eventName, email) {
    adminFb.auth().getUserByEmail(email).then(user => {
        adminFb.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            var userInfo = snapshot.val();

            var avatar = creator.photoURL;
            var from = creator.displayName;
            var msg = 'Criou um Evento ' + eventName + "!";

            adminFb.database().ref('/notifications/'+ user.uid).once("value").then(snapshot => {
                if(!snapshot.hasChildren()){
                    adminFb.database().ref('/notifications/' + user.uid + "/0").set({ status: 'unread', from: from, avatar: avatar, msg: msg })
                }else{
                    var number = parseInt(snapshot.key());
                    var newnumber = number++;
                    adminFb.database().ref('/notifications/' + user.uid + "/" + newnumber.toString()).set({ status: 'unread', from: from, avatar: avatar, msg: msg })
                }  
            })

            if (userInfo.notiToken) {
                var message = {
                    notification: {
                        body : msg,
                        title : from
                    },
                    token: userInfo.notiToken
                }

                adminFb.messaging().send(message).catch(error => {
                    console.log(error)
                })
            }
        })
    })
}