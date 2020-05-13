var { adminFb } = require('../config/firebaseConfig');

var exports = module.exports = {};

exports.sendNoti = function (msg, creator, email) {
    adminFb.auth().getUserByEmail(email).then(user => {
        adminFb.database().ref('/users/' + user.uid).once('value').then(snapshot => {
            var userInfo = snapshot.val();

            var avatar = creator.photoURL;
            var from = creator.displayName;
            var date = Date.now();

            var ref = adminFb.database().ref('/notifications/');

            ref.child(user.uid).once("value").then(snapshot => {
                if (!snapshot.hasChildren()) {
                    adminFb.database().ref('/notifications/' + user.uid + "/0" ).set({ status: 'unread', from: from, avatar: avatar, msg: msg, date: date})
                } else {
                    ref.child(user.uid).orderByKey().limitToLast(1).once("value").then(snapshot => {
                        const data = snapshot.val() || null;     
                        var number = parseInt(Object.keys(data)[0])
                        number++;
                        adminFb.database().ref('/notifications/' + user.uid + "/" + number.toString()).set({ status: 'unread', from: from, avatar: avatar, msg: msg, date: date })
                    })
                }
            })

            if (userInfo.notiToken) {
                var message = {
                    notification: {
                        body: msg,
                        title: "Nova notificação de " + from
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