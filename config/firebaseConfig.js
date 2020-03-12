const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require('../isienviron-firebase-adminsdk-2g8b8-00fd0102b6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://isienviron.firebaseio.com",
    storageBucket: "isienviron.appspot.com"
});

firebase.initializeApp({
    apiKey: "AIzaSyB8MYslNwT_i3mCs7UhuiU4ZlF8TFmU5P8",
    authDomain: "isienviron.firebaseapp.com",
    databaseURL: "https://isienviron.firebaseio.com",
    projectId: "isienviron",
    storageBucket: "isienviron.appspot.com",
    messagingSenderId: "636194129852",
    appId: "1:636194129852:web:52d385c18b8140a59fcdb9",
    measurementId: "G-7X3BC6HX5X"
});
  
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
firebase.auth().useDeviceLanguage();

module.exports = {
    admin: admin,
    firebase: firebase
}