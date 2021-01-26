import React, {useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import {Image, ImageBackground, Linking, ScrollView, View,Text,TextInput} from "react-native";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
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
  // This handles the checkign if the user has gotten new gems or not.
  const SetPreviousData = async () =>{
    let _isLoggedIn = await LoginChecker();
    let _dbRef;
    let _totalFortunes;

    if(_isLoggedIn){
      console.log("Using data from logged in users")
      _dbRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      _totalFortunes = await (await _dbRef.get()).data().totalFortunes;
      await SaveItemInStorage("OLD_FORTUNE_COUNT", _totalFortunes.toString())
      console.log("Setting previous fortune data : ", _totalFortunes)
    }
  }

  const DidUsersBuyGems = async () =>{
    let _dbRef;
    let _totalFortunes;
    let _isLoggedIn = await LoginChecker();

    if(_isLoggedIn){
      console.log("Checking Data to see if the user bought gems")
      _dbRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      _totalFortunes = await (await _dbRef.get()).data().totalFortunes;

      let oldFortuneData = await GetItemInStorage("OLD_FORTUNE_COUNT")
      console.log("OLD FORTUNE COUNT : ", oldFortuneData)
      let parsedOld = parseInt(oldFortuneData);
      if(parsedOld < _totalFortunes ){
        console.log("The user bought gems!");
        navigation.navigate('Gems')
      }else{
        console.log("The user didn't buy gems!")
        navigation.navigate('Home')
      }
    }

  }

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
              await SetPreviousData();
              let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/amethyst/${userName}`);
              if(result){
                await DidUsersBuyGems();
              }
              break;
          }
          case "Rose Quartz": {
              console.log("Rose Quartz Selected")
              await SetPreviousData();
              let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/rose/${userName}`);
              if(result){
                await DidUsersBuyGems();
              }
              break;
          }
          case "Sapphire": {
              console.log("Sapphire selected")
              await SetPreviousData();
              let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/sapphire/${userName}`);
              if(result){
                await DidUsersBuyGems();
              }
              break;
          }
          case "Tiger's Eye": {
              console.log("Tiger's Eye selected")
              await SetPreviousData();
              let result = await WebBrowser.openBrowserAsync(`https://fortunecoffeepaymentserver.herokuapp.com/tiger/${userName}`);
              if(result){
                await DidUsersBuyGems();
              }
              break;
          }
          default:{

          }
      }

  };

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
            LoginChecker().then((results) =>{
              console.log("USER IS LOGGED IN : " , results)
              if(!results){
                  navigation.navigate('SignUp')
              }else{
                
              _handlePressButtonAsync();

              }
            });
      });
    return unsubscribe;
},[navigation])

  return (
    <View style={styles.container}>
        <ImageBackground source={bgstars} style={styles.bgfull}>
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