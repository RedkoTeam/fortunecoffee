// Async Storage
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'

import LoginChecker from "../../util/validators/LoginChecker";
import db from "../../util/firestore/firestore";
import * as firebase from "firebase";

// 3 time an hour
// Counters will be stored inside the async storage.
// This needs to be called once, everytime the card's are read.
export default RegularCardCounter = async() =>{
    //Automatically try and get the user's FORTUNE READING COUNTER
  try{
    console.log('REGULAR CARD COUNTER STARTED');

    let _isLoggedIn = await LoginChecker();
    // These variables will be use IFF isLoggedIn : True
    let _dbRef;
    ////////////////////////////////////////////////////
    let _totalGems;
    let newTotalGems;
    let date; 
    let newDate;
    let currentDate = parseInt(new Date().getTime());
    let previousDate;
    let timeToReOpen;
    let result;

    // Set variables based on userLoginStatus
    // 1. User Is Logged In 
    if(_isLoggedIn){
      _dbRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      _totalGems = await (await _dbRef.get()).data().totalGems;
      newDate = new Date().getTime().toString();
      timeToReOpen  = ((newDate + 3600000) - newDate) / 1000;
      // 1.1 Logged In User has Sapphire Gem
      if(_totalGems > 8000){
        console.log("Logged in user has Sapphire Gem ")
        // If User purchased Sapphire Gem ( Unlimited Card Reading )
        // Gems is set to 9999
        await SaveItemInStorage("CARD_READING_COUNT", '9999');
        await SaveItemInStorage("CARD_READING_LAST_USE", newDate);
        result = {
          userCanView: true,
          timeRemaining: timeToReOpen
        }
        return result;
      }
      // 1.2 Logged In User has Gem Available
      else if(_totalGems>0 && _totalGems < 8000){
        newTotalGems = _totalGems - 1;
        // If User has Enough Gems
        _dbRef.update({
          totalGems: newTotalGems
        })
        await SaveItemInStorage("CARD_READING_COUNT", newTotalGems.toString());
        await SaveItemInStorage("CARD_READING_LAST_USE", newDate);
        result = {
          userCanView: true,
          timeRemaining: timeToReOpen
        }
        return result;
      }
      // 1.3 Logged In User is out of Gem
      //// 1.3.1 Logged In User has Passed one Hour => Gem resets to 2
      //// 1.3.2 Logged In User has not Passed one Hour => Need to wait
      else{
        date = await GetItemInStorage("CARD_READING_LAST_USE");
        previousDate = parseInt(date);
        // Add one hour to previous date
        if((previousDate + 3600000) < currentDate){
          console.log("More than 1 hour has passed")

          // Save the new item in Database as well
          _dbRef.update({
            totalGems: 2
          })
          // Save the new item in Async Storage
          await SaveItemInStorage("CARD_READING_LAST_USE", new Date().getTime().toString());
          await SaveItemInStorage("CARD_READING_COUNT", "2");

          result = {
            userCanView: true,
            timeRemaining : timeToReOpen
          }
          return result;
        }
        else{
          // If one hour has not Passed
          console.log("Date Exists but it has not been one hour")
          result = {
            userCanView: false,
            timeRemaining : timeToReOpen
          }
          return result;
        }
      }
    }
    // 2. User Is Not Logged In
    else{
      console.log("User Is Not Logged in:  Trying to Get Gem Count");
      _totalGems = await GetItemInStorage("CARD_READING_COUNT");
      console.log("User Is Not Logged in: Gem Availability: ", _totalGems);
      newDate = new Date().getTime().toString();
      timeToReOpen  = ((newDate + 3600000) - newDate) / 1000;
      // 2.1 Gem Not Exist => Create New Gem for User
      if(!_totalGems){
        await SaveItemInStorage("CARD_READING_COUNT", "2");
        await SaveItemInStorage("CARD_READING_LAST_USE", newDate);
        console.log(`New Date ${newDate}`)
        result = {
          userCanView: true,
          gemRemaining: 2,
          timeRemaining: timeToReOpen
        }
        return result;
      }
      // 2.2 Gem Exist 
      //// 2.2.1 Gem is > 0, 
      //// 2.2.2 Gem == 0, 
      ////// 2.2.2.1 Time Passed One Hour
      ////// 2.2.2.2 Time Has not Passed One hour
      else{
        console.log("Gem exists for guest")
        date = await GetItemInStorage("CARD_READING_LAST_USE");
        newTotalGems = parseInt(_totalGems) - 1;
        if(_totalGems>0){
          await SaveItemInStorage("CARD_READING_COUNT", newTotalGems.toString());
          await SaveItemInStorage("CARD_READING_LAST_USE", newDate);
          result = {
            userCanView: true,
            gemRemaining: newTotalGems,
            timeRemaining: timeToReOpen
          }
          return result;
        }
        else{
          console.log("Entered else statement");
          if((date + 3600000) < currentDate){
            console.log("More than 1 hour has passed")
            // Save the new item in Async Storage
            await SaveItemInStorage("CARD_READING_LAST_USE", newDate);
            await SaveItemInStorage("CARD_READING_COUNT", "2");
            result = {
              userCanView: true,
              gemRemaining: newTotalGems,
              timeRemaining : timeToReOpen
            }
            return result;
          }
          else{
            // If one hour has not Passed
            console.log("Date Exists but it has not been one hour")
            result = {
              userCanView: false,
              timeRemaining : timeToReOpen
            }
            return result;
          }
        }
      }
    }

    result = {
      userCanView: false,
      timeRemaining : NaN
    }
    return result;
  }
  catch(e){
    console.log("Error occured: ", e)
  }
}