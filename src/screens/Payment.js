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
import db from '../../util/firestore/firestore';
import * as firebase from "firebase";


function Payment({navigation, route}) {
  const [result, setResult] = useState(null);

  console.log(route)

  const _handlePressButtonAsync = async () => {
      console.log(route.params.subscription)
      let subscriptionRoute = route.params.subscription;
      // Switch cases for each subscription location
      let _dbRef;
      let userName;
      _dbRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      userName = await (await _dbRef.get()).data().userName;
      switch(subscriptionRoute){
          case "Amethyst": {
              console.log("Amethyst selected")
              console.log("userName: " , userName)
              let url = `https://fortunecoffeepaymentserver.herokuapp.com/amethyst/${userName}`;
              //let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/amethyst/${userName}`);
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
              } else {
                console.log(`Don't know how to open this URL: ${url}`);
              }
              navigation.navigate('Home');
              break;
          }
          case "Rose Quartz": {
              console.log("Rose Quartz Selected")
              let url = `https://fortunecoffeepaymentserver.herokuapp.com/rose/${userName}`;
              //let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/amethyst/${userName}`);
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
              } else {
                console.log(`Don't know how to open this URL: ${url}`);
              }
              navigation.navigate('Home');
              break;
          }
          case "Sapphire": {
              console.log("Sapphire selected")
              let url = `https://fortunecoffeepaymentserver.herokuapp.com/sapphire/${userName}`;
              //let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/amethyst/${userName}`);
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
              } else {
                console.log(`Don't know how to open this URL: ${url}`);
              }
              navigation.navigate('Home');
              break;
          }
          case "Tiger's Eye": {
              console.log("Tiger's Eye selected")
              let url = `https://fortunecoffeepaymentserver.herokuapp.com/tiger/${userName}`;
              //let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/amethyst/${userName}`);
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
              } else {
                console.log(`Don't know how to open this URL: ${url}`);
              }
              navigation.navigate('Home');
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
        <ImageBackground source={gemsbg} style={styles.bgfull}>
                <View style={{ flex: 0.7, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginBottom:"50%" }}>
                    <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
        </ImageBackground>
        </View>
        )
}



export default Payment