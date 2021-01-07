import React, {useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import {Image, ImageBackground, Linking, ScrollView, View,Text,TextInput} from "react-native";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import gemsbg from "../../assets/FortuneCoffeePNGassets/Subscription/Gemsbg.png";
import bgstars from '../../assets/Bgstars.png'
import CheckLoginToken from "../../util/validators/CheckLoginToken";
import LoginChecker from "../../util/validators/LoginChecker";
import Continue from '../../assets/FortuneCoffeePNGassets/Continue.png'
import NavBar from "../navbars/NavBar_Favorites";
import { heightPercentageToDP } from "../../util/scaler";


function Payment({navigation, route}) {
  const [result, setResult] = useState(null);

  console.log(route)

  const _handlePressButtonAsync = async () => {
      console.log(route.params.subscription)
      let subscriptionRoute = route.params.subscription;
      // Switch cases for each subscription location
      switch(subscriptionRoute){
          case "Amethyst": {
              console.log("Amethyst selected")
              let result = await WebBrowser.openBrowserAsync('https://fortunecoffeepaymentserver.herokuapp.com/amethyst');
              setResult(result);
              break;
          }
          case "Rose Quartz": {
              console.log("Rose Quartz Selected")
              let result = await WebBrowser.openBrowserAsync('https://fortunecoffeepaymentserver.herokuapp.com/rose');
              setResult(result);
              break;
          }
          case "Sapphire": {
              console.log("Sapphire selected")
              let result = await WebBrowser.openBrowserAsync('https://fortunecoffeepaymentserver.herokuapp.com/sapphire');
              setResult(result);
              break;
          }
          case "Tiger's Eye": {
              console.log("Tiger's Eye selected")
              let result = await WebBrowser.openBrowserAsync('https://fortunecoffeepaymentserver.herokuapp.com/tiger');
              setResult(result);
              break;
          }
          default:{

          }
      }

  };

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        CheckLoginToken().then(async (result)=>{
          console.log("User TYPE  : " , result)
          // Navigate the user's based off of results
          // TODO, log the user in via firestore
          if(result === "USER"){
            console.log("THE USER IS A USER")
            // Login The user
            LoginChecker().then((results) =>{
              console.log("USER IS LOGGED IN : " , results)
              _handlePressButtonAsync();
              
            });
          }
          if(result === "GUEST"){
            LoginChecker().then((results) =>{
              console.log("USER IS LOGGED IN : " , results)

              if(!results){
                  navigation.navigate('SignUp')
              }
            });
          }
        });
      });
    return unsubscribe;
},[navigation])

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backButtonStyle}>
            <Image source={backButton} />
        </TouchableOpacity>
        <Text>{result && JSON.stringify(result)}</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backButtonStyle}>
            <Text> Nice! You recieved fortunes and gems!</Text>

        </TouchableOpacity>
    </View>
        )
}



export default Payment