// Async Storage
import AsyncStorage from '@react-native-community/async-storage'
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'
// 1 time an hour
// Counters will be stored inside the async storage.
// This needs to be called once, everytime the card's are read.
export default RegularCardCounter = async() =>{
    //Automatically try and get the user's FORTUNE READING COUNTER
    try{
      // Just need to pass in a Key for storage, need to await the promise
      const date = await GetItemInStorage("CARD_READING_LAST_USE");
      
      if(!date){
        // Grab today's date and store it down, Saved as a string, parse it when retriving
         let newDate = await SaveItemInStorage("CARD_READING_LAST_USE", new Date().getTime().toString())
         // We don't store a new date until the User actually loads a card. 
         console.log("No Previous Date Found, Setting new date : ", newDate)
         return true;
      }else{
        console.log("Regular Card Date Exists : ", date)
         // Compare today's date with the previous date. Return true or false;

         

         
        return false;
      }
    }catch(e){
      console.log("Error Occured : " , e)
    }
  
  }