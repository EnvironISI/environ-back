var { adminFb } = require('./firebaseConfig');

var exports = module.exports = {};

exports.sendNotiAdmin = function (creator, eventName) {
    adminFb.auth().getUserByEmail("environisi@gmail.com").then(user => {
        adminFb.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            var userInfo = snapshot.val();
            var message = {
                data: {
                    avatar: creator.photoURL,
                    user: creator.displayName,
                    msg: 'Criou um Evento ' + eventName + "!"
                },
                delivery_receipt_requested: true,
                token: userInfo.notiToken
            }

            adminFb.messaging().send(message).then(() => {
                console.log('Noti Sent o Environ.')
            }).catch(error => {
                console.log(error)
            })
        })
    })
}