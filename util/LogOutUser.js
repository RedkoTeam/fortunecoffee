import * as firebase from "firebase";
import SaveItemInStorage from "./SaveItemInStorage";

const LogOutUser = async () =>{
    // sign the user out of firebase.
    await firebase.auth().signOut().then(async (results)=>{
        await SaveItemInStorage("AUTH_EMAIL", "GUEST")
        await SaveItemInStorage("AUTH_PASSWORD", "GUEST")

        // Set async storage to 0's on logout, dont want users spamming this 
        await SaveItemInStorage("FORTUNE_READING_COUNT", "0")
        await SaveItemInStorage("FORTUNE_READING_LAST_USE", new Date().getTime().toString())

        await SaveItemInStorage("CARD_READING_LAST_USE", "0");

    }).catch(async(e) =>{
        console.log(e);
        await SaveItemInStorage("AUTH_EMAIL", "GUEST")
        await SaveItemInStorage("AUTH_PASSWORD", "GUEST")

        // Set async storage to 0's on logout, dont want users spamming this 
        await SaveItemInStorage("FORTUNE_READING_COUNT", "0")
        await SaveItemInStorage("FORTUNE_READING_LAST_USE", new Date().getTime().toString())

        await SaveItemInStorage("CARD_READING_LAST_USE", "0");
    });
    console.log("Logged user out!")

}

export default LogOutUser