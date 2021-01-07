// Async Storage
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'

import CheckLoginToken from "../../util/validators/CheckLoginToken";
import LoginChecker from "../../util/validators/LoginChecker";

import db from "../../util/firestore/firestore";
import * as firebase from "firebase";

// 1 time an hour
// Counters will be stored inside the async storage.
// This needs to be called once, everytime the card's are read.
export default RegularCardCounter = async() =>{
    //Automatically try and get the user's FORTUNE READING COUNTER
    try{
      // Just need to pass in a Key for storage, need to await the promise

{
  /*
            fortuneCardCounterRef = db.collection('users').doc(firebase.auth.currentUser.uid);
          fortuneCardCounterRef.set({
            FORTUNE_READING_LAST_USE : 0
          })
          console.log('FortuneCardCounter saved onto database')
   */
}
      console.log('REGULAR CARD COUNTER STARTED');

      var isLoggedIn = await LoginChecker();
      console.log(`User logged in Status:${isLoggedIn}`)

      var dbRef;
      var date;
      let newDate;
      let result;

      console.log('Setting date var');
      if(isLoggedIn){
        dbRef = db.collection('users').doc(firebase.auth().currentUser.uid);
        date = await (await dbRef.get()).data().CARD_READING_LAST_USE;

        result = {
          userCanView : false,
          timeRemaining : timeToReOpen
        }
        return result;
      }
      else{
        date = await GetItemInStorage("CARD_READING_LAST_USE");
      }
      {/*const date = await GetItemInStorage("CARD_READING_LAST_USE"); */}
   

      console.log(date);

      // If no date stored
      if(!date){
        // Grab today's date and store it down, Saved as a string, parse it when retriving
          // This is a date time, in miliseconds. 
         newDate = await SaveItemInStorage("CARD_READING_LAST_USE", new Date().getTime().toString())
         // We don't store a new date until the User actually loads a card. 
         console.log("No Previous Date Found, Setting new date : ", newDate)
                                // Add's one hour to current time  / set to seconds
         let timeToReOpen  = ((newDate + 3600000) - newDate) / 1000;
         result = {
           userCanView : true,
           timeRemaining : timeToReOpen
         }
         return result;
      }else{
        console.log("Regular Card Date Exists : ", date)
         // Compare today's date with the previous date. Return true or false;
        // 1000 = 1 second
        // 60,000 = 1 minute 
        // 3,600,000 = 1 hour; 
        if(date){
          try{
            let currentDate = parseInt(new Date().getTime());
            let previousDate =  parseInt(date);
            // Add one hour to previous date
            if((previousDate + 3600000) < currentDate){
              console.log("More than 1 hour has passed")

              // Save the new item in strage
              await SaveItemInStorage("CARD_READING_LAST_USE", new Date().getTime().toString())
              console.log("Regular cards , Storeing a new date : ", currentDate)
              let timeToReOpen  = ((newDate + 3600000) - newDate) / 1000;
              result = {
                userCanView: true,
                timeRemaining : timeToReOpen
              }
              return result;
            }
            // If the date hasn't been one hour. Then return the time remaining
            else{
              // If date doesnt exist 
              console.log("Date exists, but 1 hour hasn't passed")
              let previousDate =  parseInt(date);
              let timeToReOpen  = ((previousDate + 3600000) - currentDate) / 1000;
              result = {
                userCanView: false,
                timeRemaining : timeToReOpen
              }
              return result;
            }
          }catch(e){
            console.log(e)
          }
        }
        // If all else fails, return false and date remaining
        console.log("Date Exists but it has not been one hour")
        let previousDate =  parseInt(date);
        let currentDate = parseInt(new Date().getTime());
        let timeToReOpen  = ((previousDate + 3600000) - currentDate) / 1000;
        result = {
          userCanView: false,
          timeRemaining : timeToReOpen
        }
        return result;
      }
    }catch(e){
      console.log("Error Occured : " , e)
    }
  
  }