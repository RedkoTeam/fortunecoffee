const firebase = require("firebase");
const config = require('../config');
const app = require('express')

// if (app.settings.env === "development") {

//     const firebase_app = firebase.initializeApp({
//         apiKey: config.firebase.apiKey,
//         authDomain: config.firebase.authDoamin,
//         databaseURL: config.firebase.databaseURL,
//         projectId: config.firebase.projectId,
//         storageBucket: config.firebase.storageBucket,
//         messagingSenderId: config.firebase.messagingSenderId,
//         appId: config.firebase.appId,
//         measurementId: config.firebase.measurementId
//     })

//     module.exports = firebase_app;

// } else {

    const firebase_app = firebase.initializeApp({
        apiKey: config.firebase_deployed.apiKey,
        authDomain: config.firebase_deployed.authDoamin,
        databaseURL: config.firebase_deployed.databaseURL,
        projectId: config.firebase_deployed.projectId,
        storageBucket: config.firebase_deployed.storageBucket,
        messagingSenderId: config.firebase_deployed.messagingSenderId,
        appId: config.firebase_deployed.appId,
        measurementId: config.firebase_deployed.measurementId
    })

    module.exports = firebase_app;
// }

