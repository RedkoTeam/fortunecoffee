const firebase = require('./firebase_connect.js');

module.exports = {
    saveData: function (req, cb) {

        firebase.database().ref("users/" + req.username).set({
            name: req.name,
            email: req.email,
            phone: req.phone,
            address: req.address,
            customer_stripe_id: req.customer_stripe_id,
            subscription: req.subscription,
        });

        cb(null, { "statuscode": 200, "message": "Inserted successfully" });
    },
    // ADDED FIREBASE W/ JOSH ---------------------->
    // saveAfterPayment(req, firebase_id, cb) {


    //     // db.collection('users').doc(firebase_id).set(Object.assign({
    //     //     name: req.name,
    //     //     email: req.email,
    //     //     phone: req.phone,
    //     //     address: req.address,
    //     //     description: req.description,
    //     //     customer_stripe_id: req.customer_stripe_id,
    //     //     subscription: req.subscription,
    //     // }));

    //     cb(null, { "statuscode": 200, "message": "Inserted successfully" });
    // },
};