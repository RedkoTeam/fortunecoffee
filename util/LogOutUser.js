import * as firebase from "firebase";
import SaveItemInStorage from "./SaveItemInStorage";

const LogOutUser = async () =>{
    // sign the user out of firebase.
    await firebase.auth().signOut().then(async (results)=>{
        await SaveItemInStorage("AUTH_EMAIL", "GUEST")
        await SaveItemInStorage("AUTH_PASSWORD", "GUEST")
    }).catch(async(e) =>{
        console.log(e);
        // REPLACE THE LOGINS WITH GUEST
        await SaveItemInStorage("AUTH_EMAIL", "GUEST")
        await SaveItemInStorage("AUTH_PASSWORD", "GUEST")
    });
    console.log("Logged user out!")

}

export default LogOutUser