
////////////////////
// Firebase //
////////////////////
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase-firestore'


// Async storage
import SaveItemInStorage from './SaveItemInStorage'
import GetItemInStorage from './GetItemInStorage'


export default LoginChecker = async () =>{
    try{
        const user = await firebase.auth().currentUser;
        console.log(user)
        // If the user isn't logged in then login
        const email = await GetItemInStorage("AUTH_EMAIL");
        const password = await GetItemInStorage("AUTH_PASSWORD");
        if(!user){
            if(email && password){
                try{
                    firebase.
                    auth()
                        .signInWithEmailAndPassword(email, password)
                        .then((data) => {
                        console.log(data)
                        console.log('User signed in!');
                        SetTokenInLocalStorage(email, password)
                        return true;

                        // Store to firebase
                        })
                        .catch(async (error) => {
                        console.log(error)
                        if (error.code === 'auth/email-already-in-use') {
                            console.log(error.code)
                            return false;
                        }
                        if (error.code === 'auth/invalid-email') {
                            console.log(error.code)
                            return false;

                        }
                        console.log(error.code)
                        return false;

                        });
                    }catch(e){
                    console.log(e)
                    return false;

                    }
            }      
        }else{
            console.log("The User is already logged in!")
            return true;
        }
    }catch(e){
            console.log(e)
            return false;
    }

    const SetTokenInLocalStorage = async (email, pass) => {
        try{
        // THIS IS A BAD WAY OF DOING THIS. But due to time constraint, we just do it like this for now
        // IN the future need to implement a token based login, should never expose user's credentials like so
        await SaveItemInStorage("AUTH_EMAIL", email)
        await SaveItemInStorage("AUTH_PASSWORD", pass)
        console.log("Stored New Credentials")
        }catch(e){
        console.log(e);
        }
    }
  

}