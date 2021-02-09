import React, {useEffect, useState,useRef} from "react";
import dummyPath from "../../assets/pencil.png";
import RegularCardCounter from "../../util/cardCounters/RegularCardCounter";
import CheckLoginToken from "../../util/validators/CheckLoginToken";
import LoginChecker from "../../util/validators/LoginChecker";
import RetrieveData from "../../util/GetItemInStorage";
import StoreData from "../../util/SaveItemInStorage";
import {cardsAndMeaning} from "../arrays/fortunesCardArray";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Image, ImageBackground, Text, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import signb from "../../assets/FortuneCoffeePNGassets/Psychic/sign-b.png"
import readyb from "../../assets/FortuneCoffeePNGassets/Psychic/ready-b.png"
import tellb from "../../assets/FortuneCoffeePNGassets/Psychic/tell-b.png"

import bgstars from "../../assets/FortuneCoffeePNGassets/HomePage/bgLune.png";
import chatbub from "../../assets/FortuneCoffeePNGassets/Psychic/chatbubble.png";
import NavBar from "../navbars/NavBar";
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';


import FourButtonBackground from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/bgmenu.png';
import coffeeReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/cofr.png';
import palmReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/palmr.png'
import faceReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/facer.png'
import photoReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/Photor.png'
import {TouchEventBoundary} from "@sentry/react-native";

function HomeH({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFortuneModalVisible, setFortuneModalVisible] = useState(false);
  const [front, setFront] = useState(dummyPath);
  const [meaning, setMeaning] = useState(dummyPath);
  const [showFourButtons, setShowFourButtons] = useState(false);



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleFortuneModal = () =>{
    setFortuneModalVisible(!isFortuneModalVisible)
  }

  /// Modal Viewer based on date. 
  const [userCanViewCard, setUserCanViewCard] = useState(false);

  // This use Effect is only called when the navigation lands here, This will reduce the amount of times
  // it will run on this page.
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("User Landed on homescreen")
      _CheckOnboarding().then(r => console.log("Checked on Boarding"));
      // Checks the login upon opening App
      CheckLoginToken().then(async (result)=>{
        console.log("User TYPE  : " , result)
        if(result === "USER"){
          let _checker = await LoginChecker();
          console.log("STATUS:" , _checker)
          setIsLoggedIn(true)
            // Check for subscription
            //GetSubscriptionHistory().then(r => console.log("Checking Subscriptions"));

           CheckSubscription().then(r=>{
               console.log("Checked Subscription")
           })

         // await DidUsersBuyGems();
        }
        if(result === "GUEST"){
          let _checker = await LoginChecker();
          console.log("STATUS:" , _checker)
          setIsLoggedIn(false)
          //await DidUsersBuyGems();
        }
      });
    });
    return unsubscribe;

  },[navigation])

  const _CheckOnboarding = async () => {
    await RetrieveData('ONBOARDING').then( async (val) => {
          if(val !== 'DONE') { // if onboarding
            await StoreData("ONBOARDING", 'PENDING');
            //console.log(`OnBoarding State 1: ${RetrieveData('ONBOARDING')}`);
            await StoreData("ONBOARDING", "DONE");
            navigation.navigate('OnBoarding');
          }
          else {
            console.log(`OnBoarding State: ${JSON.stringify(val)}`);
          }
        }
    )
  }

  const toggleModal2 = async () => {
    let random = Math.floor((Math.random() * cardsAndMeaning.length));
    // Put the card check inside the function of opening rather than the use Effect
    RegularCardCounter().then((result)=>{
      console.log("User can view card : " , result)
      setUserCanViewCard(result.userCanView)
      // update time remaining onto modal, must pass seconds ! .toHHMMSS = custom prototype
      setFront(cardsAndMeaning[random][0]);
      setMeaning(cardsAndMeaning[random][1]);
      setModalVisible(!isModalVisible);
    });

  }

  


  return (
    <View style={{flex: 1}}>
      <ImageBackground source={bgstars} style={styles.bgfull}>
      <ScrollView>   
      <Image source={chatbub} style={{resizeMode: 'contain', width: widthPercentageToDP(60),height: heightPercentageToDP(15), marginTop: heightPercentageToDP(10), marginRight:widthPercentageToDP(30)}}/>
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('Home1')
                }}>
      <Image source={signb} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(10),width: widthPercentageToDP(50),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('SignUp')
                }}>
      <Image source={readyb} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(1),width: widthPercentageToDP(35),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { 
                    navigation.navigate('OnBoarding')
                }}>
      <Image source={tellb} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(1),width: widthPercentageToDP(60),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
      <NavBar/>
    </View>
);
}


export default HomeH