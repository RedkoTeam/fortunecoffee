// If we want to use firestore instead of realtime database

import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAc2C78pwmxDNLaQUvFr_6UbmKcNquS_H0",
    authDomain: "fortune-coffeee.firebaseapp.com",
    databaseURL: "https://fortune-coffeee.firebaseio.com",
    projectId: "fortune-coffeee",
    storageBucket: "fortune-coffeee.appspot.com",
    messagingSenderId: "361779639421",
    appId: "1:361779639421:web:2916964e93b459de776d14",
    measurementId: "G-KE4PJMB3J5"
};

  // working for firebase.js
  // async function SignUp() {
  //   try {
  //     await firebase.register(email, password)
  //       .then(user => {
  //         console.log(user)
  //       })
  //   } catch (error) {
  //     console.log(error.toString(error))
  //   }
  // }

class Firebase {
    constructor() {
        
        app.initializeApp(firebaseConfig)
        
        // Firebase APIs //
        this.auth = app.auth()
        this.db = app.firestore()
    }

    // Auth API // 
    login = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password)
    }

    logout = () => {
        this.auth.signOut()
    }

    // handles login Authentification and also makes a users document that is equal to the uid created in authentification.
    register = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then(data => {
                return this.db.collection('users').doc(data.user.uid)
            })
            .catch(error => console.log(error))
    }

    // app.auth().currentUser.uid correct way to get current user's uid
    
    // for updating gem plans 
    addOptions = (options) => {
        console.log(app.auth().currentUser.uid)
        this.db.collection('users').doc(app.auth().currentUser.uid).update({
            plan: options,
        })
    }

    
    getInformation = () => {
        const docRef = this.db.collection("users").doc(app.auth().currentUser.uid);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    isInitialized = () => {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
}

export default new Firebase()