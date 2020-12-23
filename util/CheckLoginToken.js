// Async Storage
import AsyncStorage from '@react-native-community/async-storage'
import SaveItemInStorage from './SaveItemInStorage'
import GetItemInStorage from './GetItemInStorage'

// Users will be checked with each login for token, if not set it
export default CheckLoginToken = async () =>{
    //Automatically try and get the user's token
      try{
        // Just need to pass in a Key for storage, need to await the promise
        const token = await GetItemInStorage("AUTH_TOKEN");

        
        
        if(!token){
          // Set the default user to Guest if the user is not logged in
          console.log("No token found, setting as guest")
          // Save the AUTH_TOKEN as GUEST
          await SaveItemInStorage("AUTH_TOKEN", "GUEST")
          return "GUEST";
        }else{
          // If the previous token was GUEST
          if(token === "GUEST"){ 
            return "GUEST"
          }

          // TODO, IF THE TOKEN RETURNS A ACTUAL TOKENFROM FIRESTONE
          // RETURN THE AUTH TOKEN INSTEAD AND LOG THE USER IN 






        }
      }catch(e){
        console.log("Error Occured : " , e)
      }
  }
  