// Async Storage
import AsyncStorage from '@react-native-community/async-storage'
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'
// 5 times a week max..
// Counters will be stored inside the async storage.
export default FortuneCardCounter = async () =>{
  //Automatically try and get the user's FORTUNE READING COUNTER
  try{
    // Just need to pass in a Key for storage, need to await the promise
    const date = await GetItemInStorage("FORTUNE_READING_LAST_USE");
    if(!date){
      // CheckUserBasedOffToday'sDate()
      // Grab today's date and store it down, Saved as a string, parse it when retriving
      await SaveItemInStorage("FORTUNE_READING_LAST_USE", new Date().getTime().toString() )
    }else{
      console.log("Fortune Card Date Exists : " , date)
      // Format the string into real date.
      const currentDate = new Date(parseInt(Date));

    }
  }catch(e){
    console.log("Error Occured : " , e)
}
}