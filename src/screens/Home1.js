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
import askc from "../../assets/FortuneCoffeePNGassets/Psychic/ask-c.png"
import what from "../../assets/FortuneCoffeePNGassets/Psychic/What.png"
import cofc from "../../assets/FortuneCoffeePNGassets/Psychic/cof-c.png"
import horc from "../../assets/FortuneCoffeePNGassets/Psychic/hor-c.png"
import forc from "../../assets/FortuneCoffeePNGassets/Psychic/for-c.png"
import readc from "../../assets/FortuneCoffeePNGassets/Psychic/read-c.png"
import facec from "../../assets/FortuneCoffeePNGassets/Psychic/face-c.png"
import palmc from "../../assets/FortuneCoffeePNGassets/Psychic/palm-c.png"
import photoc from "../../assets/FortuneCoffeePNGassets/Psychic/photo-c.png"
import photooc from "../../assets/FortuneCoffeePNGassets/Psychic/photoo-c.png"
import virc from "../../assets/FortuneCoffeePNGassets/Psychic/vir-c.png"
import bgstars from "../../assets/FortuneCoffeePNGassets/HomePage/bgLune.png";
import chatbub from "../../assets/FortuneCoffeePNGassets/Psychic/chatbubble.png";
import gtcr from "../../assets/FortuneCoffeePNGassets/gtcr.png";
import NavBar from "../navbars/NavBar";
import * as firebase from "firebase";
import SaveItemInStorage from "../../util/SaveItemInStorage";
import GetItemInStorage from '../../util/GetItemInStorage'
import LogOutUser from "../../util/LogOutUser";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';
import Onboarding from "./Onboarding";
import db from '../../util/firestore/firestore';
import { assignWith } from "lodash";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import gemsbg from "../../assets/FortuneCoffeePNGassets/Subscription/Gemsbg.png";
import {Overlay} from "react-native-elements";

import FourButtonBackground from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/bgmenu.png';
import coffeeReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/cofr.png';
import palmReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/palmr.png'
import faceReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/facer.png'
import photoReading from '../../assets/FortuneCoffeePNGassets/photoreadingbuttons/Photor.png'
import {TouchEventBoundary} from "@sentry/react-native";

function Home1({ navigation }) {
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

      <Image source={what} style={{resizeMode: 'contain', width: widthPercentageToDP(60),height: heightPercentageToDP(15), marginTop: heightPercentageToDP(10), marginRight:widthPercentageToDP(30)}}/>
     
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('Psychic')
                }}>
      <Image source={askc} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(1),width: widthPercentageToDP(40),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('HoroscopeMain')
                }}>
      <Image source={horc} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(1),width: widthPercentageToDP(35),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('Home')
                }}>
      <Image source={readc} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(1),width: widthPercentageToDP(30),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('Home')
                }}>
      <Image source={forc} style={{resizeMode: 'contain', marginTop: heightPercentageToDP(1),width: widthPercentageToDP(25),height: heightPercentageToDP(5), marginRight:widthPercentageToDP(30)}}/>
      </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
      <NavBar/>
    </View>
);
}


export default Home1