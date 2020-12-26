// Async Storage
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'

// 5 times a week max..
// Counters will be stored inside the async storage.
export default FortuneCardCounter = async () =>{
  //Automatically try and get the user's FORTUNE READING COUNTER
  try{
    // Just need to pass in a Key for storage, need to await the promise
    const date = await GetItemInStorage("FORTUNE_READING_LAST_USE");
    // If the date doesnt exist
    if(!date){
      // If the date doesnt exist, this must be a new user. Create the new date as well as the count 
      // Grab today's date and store it down, Saved as a string, parse it when retriving
      console.log("Fortune Reading doesn't exist, setting one now")
      await SaveItemInStorage("FORTUNE_READING_LAST_USE", new Date().getTime().toString())
      let newDate = await GetItemInStorage("FORTUNE_READING_LAST_USE")

      console.log("Fortune Reading New Date : ", newDate)
      // Try and get the count
      const fortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT")
      if(!fortuneCardCount){
          // If there is no count create one
        await SaveItemInStorage("FORTUNE_READING_COUNT", "5");
        let newFortuenCardCount = await GetItemInStorage("FORTUNE_READING_COUNT");
        console.log("Reset new count : ", fortuneCardCount)

        // Pull the count, remove one and return true
        console.log("Deleting from current count")
        let newFortuneCount = (parseInt(newFortuenCardCount.toString())) - 1;
        await SaveItemInStorage("FORTUNE_READING_COUNT", newFortuneCount.toString())
        let currentFortuneCount = await GetItemInStorage("FORTUNE_READING_COUNT")
        console.log("Remaining Tries: ", currentFortuneCount)
        return true;

      }else{

        console.log("Current count of FortuneCardCount: ", fortuneCardCount)
        // If there is no count create one
        await SaveItemInStorage("FORTUNE_READING_COUNT", "5");
        let newFortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT");
        console.log("Reset new count : ", newFortuneCardCount)

        // Pull the count, remove one and return true
        console.log("Deleting from current count")
        let newFortuneCount = (parseInt(fortuneCardCount.toString())) - 1;
        await SaveItemInStorage("FORTUNE_READING_COUNT", newFortuneCount.toString())
        let currentFortuneCount = await GetItemInStorage("FORTUNE_READING_COUNT")
        console.log("Remaining Tries: ", currentFortuneCount)
        return true;
      }

    }
    // If the date exist
    else{
      console.log("Fortune Card Date Exists : " , date)
       // Try and get the count
       let oneWeek = 604800000;
       let previousDate = parseInt(date);
       let currentDate = parseInt(new Date().getTime().toString());

       // Check the previous date to current date
       if((previousDate + oneWeek) < currentDate){
        // ----------- IF the user is past one week --------------- //
        console.log("It has been past one week")
        // Check the count
        const fortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT")

        // Set the new date. 
        await SaveItemInStorage("FORTUNE_READING_LAST_USE",new Date().getTime().toString())

        
        // If the count does't exist
          if(!fortuneCardCount){
            // If there is no count create one
            await SaveItemInStorage("FORTUNE_READING_COUNT", "5");
            let newFortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT");
            console.log("Reset new count : ", newFortuneCardCount)

            // Pull the count, remove one and return true
            console.log("Deleting from current count")
              let newFortuneCount = (parseInt(fortuneCardCount.toString())) - 1;
              await SaveItemInStorage("FORTUNE_READING_COUNT", newFortuneCount.toString())
              let currentFortuneCount = await GetItemInStorage("FORTUNE_READING_COUNT")
              console.log("Remaining Tries: ", currentFortuneCount)
              return true;

          }else{
           await SaveItemInStorage("FORTUNE_READING_COUNT", "5");
           let newFortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT");
           console.log("Reset new count : ", newFortuneCardCount)

           // Pull the count, remove one and return true
           console.log("Deleting from current count")
           let newFortuneCount = (parseInt(fortuneCardCount.toString())) - 1;
           await SaveItemInStorage("FORTUNE_READING_COUNT", newFortuneCount.toString())
           let currentFortuneCount = await GetItemInStorage("FORTUNE_READING_COUNT")
           console.log("Remaining Tries: ", currentFortuneCount)
           return true;

          }

       }else{

        // ----------- IF the user is not past one week --------------- //
          console.log("It has not been past one week")
          // Double check that the fortune exist
          const fortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT")
          // If the count does't exist
          if(!fortuneCardCount){
            // If there is no count create one, something must have gone wrong, just reset
            await SaveItemInStorage("FORTUNE_READING_COUNT", "5");
            let newFortuneCardCount = await GetItemInStorage("FORTUNE_READING_COUNT");
            console.log("Reset new count : ", newFortuneCardCount)

            // Pull the count, remove one and return true
            console.log("Deleting from current count")
              let newFortuneCount = (parseInt(fortuneCardCount.toString())) - 1;
              await SaveItemInStorage("FORTUNE_READING_COUNT", newFortuneCount.toString())
              let currentFortuneCount = await GetItemInStorage("FORTUNE_READING_COUNT")
              console.log("Remaining Tries: ", currentFortuneCount)
              return true;

          }else{
            // The fortune exists. Pull and set the count
            console.log("Total Count's Left : ", fortuneCardCount)

            if(fortuneCardCount > 0){
              console.log("Deleting from current count")
              let newFortuneCount = (parseInt(fortuneCardCount.toString())) - 1;
              await SaveItemInStorage("FORTUNE_READING_COUNT", newFortuneCount.toString())
              let currentFortuneCount = await GetItemInStorage("FORTUNE_READING_COUNT")
              console.log("Remaining Tries: ", currentFortuneCount)
              return true;
            }else{
              console.log("RETURNING, hey you used all ur card counts, please wait for a week.")
              return false;
            }

          }
        
      } 
    }
  }catch(e){
    console.log("Error Occured : " , e)
}
}
