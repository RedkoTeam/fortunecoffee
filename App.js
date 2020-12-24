
import React, { useRef, useEffect, useState, useCallback, Componenet, useFocusEffect } from 'react';

import './fixtimerbug';
import {fortunesArray} from './fortunesArray';
import {numbersArray} from './numbersArray';
import {lettersArray} from './lettersArray';
import {wordsArray} from './wordsArray';
import {adviceArray} from './adviceArray';
import {thanksArray} from './thanksArray';
import {horoscopeArray} from './horoscopeArray';


import { Button, 
  View, 
  Text,
  Image, 
  TouchableOpacity,
  TextInput, 
  ImageBackground, 
  StyleSheet, 
  FlatList, 
  ScrollView, 
  StatusBar , 
  Animated, 
  Easing, 
  InteractionManager, 
  Linking, 
  KeyboardAvoidingView
  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ViewPager from '@react-native-community/viewpager';

import StoreData from './util/SaveItemInStorage';
import RetrieveData from './util/GetItemInStorage';




/*import { WebView } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';*/

////////////////////
// Firebase //
////////////////////
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { firebaseConfig } from './config';




//checks to see if app is already initialized before running again
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// 

// FIRESTORE
const db = firebase.firestore();

////////////////////
// IMAGES & ICONS //
////////////////////

//ONBOARDING//
import OnboardingBg from './assets/FortuneCoffeePNGassets/Onboarding/Onboarding.png'
import OnboardingBg1 from './assets/FortuneCoffeePNGassets/Onboarding/Onboarding-1.png'
import OnboardingBg2 from './assets/FortuneCoffeePNGassets/Onboarding/Onboarding-2.png'
import Next from './assets/FortuneCoffeePNGassets/Onboarding/Next.png'
import getStarted from './assets/FortuneCoffeePNGassets/Onboarding/getStarted.png'

//HOROSCOPE//
import PiscesCard from './assets/FortuneCoffeePNGassets/horoscopes/Piscesc.png'
import PiscesTxt from './assets/FortuneCoffeePNGassets/horoscopes/PISCES.png'
import AriesCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Libra.png'
import AriesTxt from './assets/FortuneCoffeePNGassets/horoscopes/ARIES.png'
import AquariusCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aquarius.png'
import AquariusTxt from './assets/FortuneCoffeePNGassets/horoscopes/AQUARIUS.png'
import CancerCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Cancer.png'
import CancerTxt from './assets/FortuneCoffeePNGassets/horoscopes/CANCER.png'
import GeminiCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Gemini.png'
import GeminiTxt from './assets/FortuneCoffeePNGassets/horoscopes/GEMINI.png'
import LeoCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Leo.png'
import LeoTxt from './assets/FortuneCoffeePNGassets/horoscopes/LEO.png'
import LibraCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Libra.png'
import LibraTxt from './assets/FortuneCoffeePNGassets/horoscopes/LIBRA.png'
import SagittariusCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Sagittarius.png'
import SagittariusTxt from './assets/FortuneCoffeePNGassets/horoscopes/SAGITTARIUS.png'
import ScorpioCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Scorpio.png'
import ScorpioTxt from './assets/FortuneCoffeePNGassets/horoscopes/SCORPIO.png'
import TaurusCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Taurus.png'
import TaurusTxt from './assets/FortuneCoffeePNGassets/horoscopes/TAURUS.png'
import VirgoCard from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Virgo.png'
import VirgoTxt from './assets/FortuneCoffeePNGassets/horoscopes/VIRGO.png'
import linehors from './assets/FortuneCoffeePNGassets/horoscopes/Line_57.png'
import hottxt from './assets/FortuneCoffeePNGassets/horoscopes/hottxt.png'
import advicetxt from './assets/FortuneCoffeePNGassets/horoscopes/ADVICE.png'
import appre from './assets/FortuneCoffeePNGassets/horoscopes/Appreciate.png'
import career from './assets/FortuneCoffeePNGassets/horoscopes/Career.png'
import love from './assets/FortuneCoffeePNGassets/horoscopes/Love.png'
import luck from './assets/FortuneCoffeePNGassets/horoscopes/Luck.png'
import number from './assets/FortuneCoffeePNGassets/horoscopes/Number.png'
import letter from './assets/FortuneCoffeePNGassets/horoscopes/Letter.png'


//HOROSCOPE MAIN//
import Horoscopetxt from './assets/FortuneCoffeePNGassets/horoscopes/Horoscopes.png'
import Aquariusbttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aquarius-bttn.png'
import Piscesbttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Pisces-bttn.png'
import Ariesbttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aries-bttn.png'
import Cancerbttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Cancer-bttn.png'
import Capribttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Capricorn-bttn.png'
import Geminibttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Gemini-bttn.png'
import Leobttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Leo-bttn.png'
import Librabttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Libra-bttn.png'
import Sagittariusbttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Sagittarius-bttn.png'
import Scorpiobttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Scorpio-bttn.png'
import Taurusbttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Taurus-bttn.png'
import Virgobttn from './assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Virgo-bttn.png'

//MODALS//
import submod from './assets/submod.png'
import submodfo from './assets/submodfo.png'
import getCrystalsBtn from './assets/getcrysbtn.png'


//NAVBAR//
import Ellipse1 from './assets/FortuneCoffeePNGassets/HomePage/ellipse.png';
import Home from './assets/FortuneCoffeePNGassets/HomePage/Home.png';
import HomeB from './assets/FortuneCoffeePNGassets/HomePage/homeb.png';
import Shop from './assets/FortuneCoffeePNGassets/HomePage/Shop.png';
import Favorites from './assets/FortuneCoffeePNGassets/HomePage/Favorites.png';
import FavoritesW from './assets/FortuneCoffeePNGassets/HomePage/favw.png';
import homeSelected from './assets/FortuneCoffeePNGassets/HomePage/homeSelected.png';
import Psychicbtn from './assets/FortuneCoffeePNGassets/HomePage/psyhbtn.png';
import PsychicbtnW from './assets/FortuneCoffeePNGassets/HomePage/psW.png';
import Horosbtn from './assets/FortuneCoffeePNGassets/HomePage/horosbtn.png';
import HorosbtnW from './assets/FortuneCoffeePNGassets/HomePage/horW.png';
import Profilebtn from './assets/FortuneCoffeePNGassets/HomePage/Profile.png';
import ProfilebtnW from './assets/FortuneCoffeePNGassets/HomePage/proW.png';

//HOMEPAGE//
import TakePhoto from './assets/FortuneCoffeePNGassets/HomePage/TakePhoto.png';
import VirtualCoffee from './assets/FortuneCoffeePNGassets/HomePage/VirtualCoffee.png';
import SignInButton from './assets/FortuneCoffeePNGassets/HomePage/SignInButton.png';
import SignUpButton from './assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png';
import LargeTitleApp from './assets/FortuneCoffeePNGassets/HomePage/FortuneCoffeeTitle.png';
import PickCard from './assets/FortuneCoffeePNGassets/HomePage/PickCard.png';
import Cards from './assets/FortuneCoffeePNGassets/HomePage/allCards.png';
import bgstars from './assets/Bgstar.png';
import bgcoming from './assets/bgcoming.png';

//SHOP PAGE// 
import shop from './assets/FortuneCoffeePNGassets/shopPage/Shop.png';
import galaxy from './assets/FortuneCoffeePNGassets/shopPage/galaxy.png';
import originalPhoto from './assets/FortuneCoffeePNGassets/shopPage/originalPhoto.png';
import originalBuyButton from './assets/FortuneCoffeePNGassets/shopPage/originalBuyButton.png';
import coconutPhoto from './assets/FortuneCoffeePNGassets/shopPage/coconutPhoto.png';
import coconutButton from './assets/FortuneCoffeePNGassets/shopPage/coconutBuyButton.png';
import coffeeCaramelPhoto from './assets/FortuneCoffeePNGassets/shopPage/coffeeCaramelPhoto.png';
import coffeeCaramelButton from './assets/FortuneCoffeePNGassets/shopPage/coffeeCaramelButton.png';
import hazelnutPhoto from './assets/FortuneCoffeePNGassets/shopPage/hazelnutPhoto.png';
import hazelnutButton from './assets/FortuneCoffeePNGassets/shopPage/hazelnutButton.png';
import coffeeChocolatePhoto from './assets/FortuneCoffeePNGassets/shopPage/coffeeChocolatePhoto.png';
import coffeeChocolateButton from './assets/FortuneCoffeePNGassets/shopPage/coffeeChocolateButton.png';
import strawberryPhoto from './assets/FortuneCoffeePNGassets/shopPage/strawberryPhoto.png';
import strawberryButton from './assets/FortuneCoffeePNGassets/shopPage/strawberryButton.png';

//SIGN// 
import facebookTitle from './assets/FortuneCoffeePNGassets/Sign/ContinueFacebook.png';
import googleTitle from './assets/FortuneCoffeePNGassets/Sign/ContinueGoogle.png';
import signTitle from './assets/FortuneCoffeePNGassets/Sign/signTitle.png';
import signBackground from './assets/FortuneCoffeePNGassets/Sign/SignBackground.png';

// SIGN UP PAGE //
import signUpButton from './assets/FortuneCoffeePNGassets/Sign/signUpButton.png';
import haveAcctText from './assets/FortuneCoffeePNGassets/Sign/haveAcctText.png';
import loginText from './assets/FortuneCoffeePNGassets/Sign/loginText.png';
import signEmailText from './assets/FortuneCoffeePNGassets/Sign/signEmailText.png';
import signUpBelowTitle from './assets/FortuneCoffeePNGassets/Sign/signUpbelowTitle.png';
// SIGN IN PAGE //
import loginButton from './assets/FortuneCoffeePNGassets/Sign/LogInButton.png';
import forgotPasswordText from './assets/FortuneCoffeePNGassets/Sign/forgotPasswordText.png';
import createNewText from './assets/FortuneCoffeePNGassets/Sign/createaNewText.png';
import accoutText from './assets/FortuneCoffeePNGassets/Sign/accountText.png';
// READING ANIMATION PAGE //
import coffee from './assets/FortuneCoffeePNGassets/readingAnimationPage/coffee.png';
import readingCoffee from './assets/FortuneCoffeePNGassets/readingAnimationPage/readingCoffee.png';
import readingAnimationBackground from './assets/FortuneCoffeePNGassets/readingAnimationPage/readingAnimationBackground.png';
// VIRTUAL COFFEE READING PAGE //
import backgroundOne from './assets/FortuneCoffeePNGassets/virtualPage/backgroundOne.png';
import backgroundTwo from './assets/FortuneCoffeePNGassets/virtualPage/backgroundTwo.png';
import backgroundThree from './assets/FortuneCoffeePNGassets/virtualPage/backgroundThree.png';
import backgroundFour from './assets/FortuneCoffeePNGassets/virtualPage/backgroundFour.png';
import backgroundFive from './assets/FortuneCoffeePNGassets/virtualPage/backgroundFive.png';
import coffee_v from './assets/FortuneCoffeePNGassets/virtualPage/coffee_v.png';
import dontWantToWaitText from './assets/FortuneCoffeePNGassets/virtualPage/dontWantToWait.png';
import getCrystalsButton from './assets/FortuneCoffeePNGassets/virtualPage/getCrystalsButton.png';
import pysicReadingText from './assets/FortuneCoffeePNGassets/virtualPage/ourPysicReading.png';
import tapToDrinkText from './assets/FortuneCoffeePNGassets/virtualPage/tapToDrink.png';

// READING PAGE //
import backButton from './assets/FortuneCoffeePNGassets/reading/backButton.png';
import coffeeImg from './assets/FortuneCoffeePNGassets/reading/coffee.png';
import readingBackground from './assets/FortuneCoffeePNGassets/reading/readingBackground.png';
import saveButton from './assets/FortuneCoffeePNGassets/reading/saveButton.png';
import shareButton from './assets/FortuneCoffeePNGassets/reading/shareButton.png';
import userImg from './assets/FortuneCoffeePNGassets/reading/user.png';
import yourFortune from './assets/FortuneCoffeePNGassets/reading/yourFortune.png';

// FAVORITES PAGE //
// galaxy
// backButton
import fortuneBox from './assets/FortuneCoffeePNGassets/savedFortunes/Box.png';
import etcButton from './assets/FortuneCoffeePNGassets/savedFortunes/etcButton.png';
import savedFortunesTitle from './assets/FortuneCoffeePNGassets/savedFortunes/savedFortuneTitle.png';


// SUBSCRIPTION PAGE //
import sub1 from './assets/FortuneCoffeePNGassets/Subscription/subscription1.png';
import sub2 from './assets/FortuneCoffeePNGassets/Subscription/subscription2.png';
import sub3 from './assets/FortuneCoffeePNGassets/Subscription/subscription3.png';
import sub4 from './assets/FortuneCoffeePNGassets/Subscription/subscription4.png';
import subscriptionDescription from './assets/FortuneCoffeePNGassets/Subscription/subscriptionDescription.png';
import subBackground from './assets/FortuneCoffeePNGassets/Subscription/subscriptionBackground.png'

// SUBSCRIPTION Details//
import amet from './assets/FortuneCoffeePNGassets/subscriptioncards/Amet.png';
import rosq from './assets/FortuneCoffeePNGassets/subscriptioncards/Roseq.png';
import tige from './assets/FortuneCoffeePNGassets/subscriptioncards/Tige.png';
import saph from './assets/FortuneCoffeePNGassets/subscriptioncards/Saph.png';


// Fortune Page //
import Modal from 'react-native-modal';
import FlipCard from 'react-native-flip-card';
import card from './assets/FortuneCoffeePNGassets/MiddleCard-1.png';
import card2 from './assets/FortuneCoffeePNGassets/MiddleCard-2.png';

// GET CRYSTAL PAGE //
import crystalBackground from './assets/FortuneCoffeePNGassets/crystalBackground.png';
import getCrystals from './assets/FortuneCoffeePNGassets/getCrystals.png';
import xButton from './assets/FortuneCoffeePNGassets/bi_x.png';

//TAKE PHOTO //
'use strict';
import * as ImagePicker from 'expo-image-picker';
import {Component} from 'react';
import {AppRegistry, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import useAVirtualCoffee from './assets/useAVirtualCoffee.png';
import virtualImage from './assets/virtualImage.png';
import submitPhoto from './assets/submitPhoto.png';
import photoGallery from './assets/photoGallery.png';

//Saved Fortunes //

//Psyhic//




//Profile //
import profileImage from './assets/FortuneCoffeePNGassets/Profile.png';
import skipImage from './assets/FortuneCoffeePNGassets/Skip.png';
import continueImage from './assets/FortuneCoffeePNGassets/Continue.png';
import { Input } from 'react-native-elements';
import profile_bg from './assets/FortuneCoffeePNGassets/Profile_bg.png';
import pencil from './assets/pencil.png';
import pageButton from './assets/pageButton.png';

//random cards
import {cardsAndMeaning} from './fortunesCardArray';
//import {cardsFrontReversed, cardsAndMeaning, cardsMeaning, cardsFront} from './fortunesCardArray';
import dummyPath from './assets/pencil.png';
import { Alert } from 'react-native';


// Card utils
import CheckLoginToken from './util/CheckLoginToken'
import RegularCardCounter from './util/cardCounters/RegularCardCounter.js'
import FortuneCardCounter from './util/cardCounters/FortuneCardCounter.js'

// Protypes
import prototype from './util/prototypes/ProtoTypes'
import AsyncStorage from '@react-native-community/async-storage';

////////////////////
// Styling  //
////////////////////

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 17
  },
  mainContainer: {
    flex:1,
    backgroundColor: '#070631',
    width:'100%'
  },
  shopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#070631',
  },
  getCrystalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapCard: {
    color: '#FFF',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 250,
  },
  cardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButton1: {
    right: 90,
    top: 30
  },
  authButton2: {
    left: 90,
    top: 30,
  },
  appTitle: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  ellipse: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#483D8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    paddingBottom: 50,
    borderRadius: 30,
  }, 
  getCrystalImage: {
    width: 300,
    height: 38,
    paddingBottom: 50,
    borderRadius: 30,
    marginTop: 265
  },
  instructions: {
    color: '#888',
    fontSize: 18,
  },
  underTitle: {
    color: '#0080ff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  xbutton: {
    padding: 20,
    borderRadius: 5,
    marginLeft: 280,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  textBox: {
    margin: 15,
    height: "7%",
    width: '87%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    resizeMode:'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    opacity: 0.7,
  },
  readingAnimationBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    width:'100%',
    opacity: 0.8
  },
  readingCoffeeImage: {
    top: 0,
  },
  virtualContainer: {
    flex: 1,
    backgroundColor: '#070631',
    width:'100%'

  },
  virtualOne: {
    flex: 1,
    resizeMode:'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    opacity: 0.7,
  },

  bgfull: {
    flex: 1,
    resizeMode:'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    opacity: 1,
  },

  bgfull2: {
    flex: 1,
    resizeMode:'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    opacity: 0.3,
  },

  flexInRows: {
    position:'absolute',
    top: 0, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    margin: 16,
  },
  flexInRowsCoffee: {
    flex: 1,
    paddingTop: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'100%',
    alignItems:'flex-end',
  },
  readingTableContainer: {
    flex: 1, 
    width:'100%',
    alignContent:'stretch',
    padding: 15,
  },

  readingTableContainer2: {
    width:'90%',
    alignContent:'stretch',
    padding:10,
    
  },


  helloUserTextContainer: {
    fontSize:35,
    fontStyle:'normal',
    fontWeight:'bold',
    color:'#FFFFFF',
    textShadowColor: 'rgba(47, 145, 211, 0.76)',
    textShadowOffset: {
      width:2,
      height:2
    },
    textShadowRadius:1
  },
  coffeeImageDimension: {
    width: 370,
    height: 550,
    resizeMode: 'contain', 
  },
  coffeeBuyButton: {
    width: 310,
    height: 40,
    resizeMode:'contain',
    position: 'absolute',
    bottom: 25,
    left: 35, 
  },
  shopBackgroundContainer: {
    position:'absolute', 
    width:'100%', 
    height:'100%'
  },
  crystalBackground: {
    flex:1,
    width: 350,
    height: 400,
    justifyContent: "center",
    marginHorizontal: 12,
    marginBottom: 450
  },
  subBackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 2
  },
  cameraContainer: {
    flex: 1,
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor : '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 5,
    margin: 40,
  },
  savedFortuneTextBox: {
    height: "4%",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    marginTop:10,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  savedFortuneTextBox2: {
    height: "100%",
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  savedFortuneTextBox3: {
    height: "100%",
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  flexRowX: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    paddingTop: '10%',
    padding: 12,
  },
  backButtonStyle: {
    position: 'absolute', 
    top: 40,
    left: 15
  }
});


 
////////////////////
// Screen Layouts //
////////////////////

// Completed and Ready for code review
//ReadingAnimation back to PhotoReading 
function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFortuneModalVisible, setFortuneModalVisible] = useState(false);
  const [front, setFront] = useState(dummyPath);
  const [meaning, setMeaning] = useState(dummyPath);

  // const checkLoggedIn = () => {
  //   if(db.collection('users').doc(firebase.auth().currentUser.uid)) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    // Fortune Modal

    const toggleFortuneModal = () =>{
      setFortuneModalVisible(!isFortuneModalVisible)
    }
  
  
    /// Modal Viewer based on date. 
    const [userCanViewCard, setUserCanViewCard] = useState(false);
    const [cardCheckTimeRemaining, setCardCheckTimeRemaining] = useState("00:00:00")
      
    // UseEffect for checking the card before each trigger
    // Rather than putting it inside the function, we put it on the useeffect for checking
    useEffect(()=>{
      // setIsLoggedIn(checkLoggedIn)
      let mounted = true;
  
      // If mounted . Check the state then storage.
      if(mounted){
        if(isModalVisible === true){
          console.log("Modal is visible")
          // Check the counter based on async storage, not fire ..
          RegularCardCounter().then((result)=>{
            if(mounted){
            console.log("User can view card : " , result)
            setUserCanViewCard(result.userCanView)
            console.log("Time Remaining in seconds : ", result.timeRemaining)
            // update time remaining onto modal, must pass seconds ! .toHHMMSS = custom prototype
              setCardCheckTimeRemaining(result.timeRemaining.toString().toHHMMSS());
            }
          });
        }
      }
      return () =>{
        mounted = false;
      }
    },[isModalVisible])
  

    // This use Effect is only called when the navigation lands here, This will reduce the amount of times
    // it will run on this page.
    useEffect(()=>{
      let mounted = true;
      if(mounted)
      {
        // Checks the login upon opening App
        CheckLoginToken().then(async (result)=>{
          console.log("User TYPE  : " , result)
          // Navigate the user's based off of results
          // TODO, log the user in via firestore
          if(result === "User"){
            navigation.navigate("HomeLoggedIn")
          }
        });
        _CheckOnboarding();
      }
      return ()=>{
        mounted = false;
      }
    },[navigation])

    const _CheckOnboarding = async () => {
      await RetrieveData('ONBOARDING').then( (val) => {
        if(val !== 'DONE') { // if onboarding 
          StoreData("ONBOARDING", 'PENDING');
          console.log(`Onboarding State 1: ${RetrieveData('ONBOARDING')}`);
          StoreData("ONBOARDING", "DONE");
          navigation.navigate('Onboarding');
        }
        else {
          console.log(`Onboarding State: ${JSON.stringify(val)}`);
        }
      }
      )
    }
  
    const toggleModal2 = () => {
      setModalVisible(!isModalVisible);
      let random = Math.floor((Math.random() * cardsAndMeaning.length));
      setFront(cardsAndMeaning[random][0]);
      setMeaning(cardsAndMeaning[random][1]);
    }
  
    state = {
      open: true,
    };
    toggleImage = () => {
      this.setState(state => ({ open: !state.open }));
    }
  
    const Render_CardModule = () =>{
  
      // TODO, give the real estamate time.
      // Result Returns, an object, i sent back the calculatorions. 
  
      // Just needs to show the time in 00:00 format. It's back in seconds. 
      return userCanViewCard ? (
        <> 
      {/* Show module if user can view*/}
            <Modal isVisible={isModalVisible} style={{ alignItems: "center", flex: 1 }}>
              <View>
                <Text style={styles.tapCard}>Tap card to flip</Text>
                <Button title="Hide Card" onPress={toggleModal} />
                <View style={{ marginBottom: 500 }}>
                  <FlipCard
                    flipHorizontal={true}
                    flipVertical={false}>
                    <View style={styles.face}>
                      {/* <Text>The Face</Text> */}
                      <Image source={front} style={styles.cardStyle} />
                    </View>
                    <View>
                      {/* <Text>The Back</Text> */}
                      <Image source={meaning} style={styles.cardStyle} />
                    </View>
                  </FlipCard>
                </View>
              </View>
            </Modal>
        </>
      ) : <>
      {/* What to show iff the user is over the max setting.*/}
      <Modal isVisible={isModalVisible} style={{ alignItems: "center", flex: 1 }}>
          <View>
            <Text style={styles.tapCard}>Already checked!{cardCheckTimeRemaining} remaining</Text>
            <Button title="Hide Card" onPress={toggleModal} />
            <View style={{ marginBottom: 500 }}>
            </View>
          </View>
        </Modal>
      </>;
    }
  
    const CheckFortuneCountCoffeeReading = () =>{
       // navigation.navigate('VirtualOne')
       FortuneCardCounter().then((result)=>{
        console.log("THe user can go to next screen : ", result)
        if(result){
        // Continue to Virtual Coffee Reading.
          navigation.navigate('VirtualOne')
        }else{
          // dont navigate
         console.log("User, maxed out the time, not navigating")
         toggleFortuneModal();
  
        }
       });
  
    }
    
    const CheckFortuneCountPhoto = () =>{
      // navigation.navigate('VirtualOne')
      FortuneCardCounter().then((result)=>{
       console.log("THe user can go to next screen : ", result)
       if(result){
        // Continue to photo navigation page.
         navigation.navigate('Virtual')
       }else{
         // dont navigate
         console.log("User, maxed out the time, not navigating")
         toggleFortuneModal();
       }
      });
  
   }
  
    const RenderTheFortuneButtons = () =>{
      return (
        <> 
         <Modal isVisible={isFortuneModalVisible} style={{ alignItems: "center", flex: 1 }}>
          <View>
            <Text style={styles.tapCard}>Sorry, you ran out of weekly fortune. Check next week!</Text>
            <Button title="Hide Card" onPress={toggleFortuneModal} />
            <View style={{ marginBottom: 500 }}>
            </View>
          </View>
        </Modal>

        
         
         <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => {
               CheckFortuneCountCoffeeReading()
              }}>
            {/* Virtual Coffee Reading */}
              <Image source={VirtualCoffee} />
            </TouchableOpacity>
            {/* Take a photo for reading */}
            <TouchableOpacity onPress={() => {
              CheckFortuneCountPhoto()
            }}>
              <Image source={TakePhoto} />
            </TouchableOpacity>
          </View>
        </>
      )
    }
  
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={bgstars} style={styles.bgfull}>
          
          
          {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}> */}
            {isLoggedIn ? (
              <View>
                <Text></Text>
              </View>
            ) : 
             <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}><TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={SignUpButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Image source={SignInButton} />
            </TouchableOpacity>
              </View>
              
              
            }
           <View style={{ flex: 1, alignItems: 'center' }}>
         {/* <Button title="Clear Async" onPress={ () => { console.log("Async Storage Cleared"); AsyncStorage.clear();}}></Button>
          <Button title="Sign out" onPress={ () => { console.log("User Sign Out"); firebase.auth().signOut()}}></Button> */}
          <Image source={LargeTitleApp} style={{ marginBottom:20 }} />
          {RenderTheFortuneButtons()}
          {/* <Button title="Subscription" onPress={ () => navigation.navigate('Subscription')} /> */}
          <Image source={PickCard} style={{ marginTop:20, margin: 8 }} />
            {/* Pick a card  */}
          <TouchableOpacity onPress={toggleModal2} style={styles.cards}>
            <Image source={Cards} />
            <Modal isVisible={isModalVisible} style={{ alignItems: "center", flex: 1 }}>
              <View>
                <View style={{ marginBottom: 500 }}>
                  {Render_CardModule()}
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
          <NavBar />
        </View>
      </ImageBackground>
      </View>
      
    );
  }

function HomeScreenLoggedIn({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [front, setFront] = useState(dummyPath);
  const [meaning, setMeaning] = useState(dummyPath);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible(!isModalVisible);
    let random = Math.floor((Math.random() * cardsAndMeaning.length));
    setFront(cardsAndMeaning[random][0]);
    setMeaning(cardsAndMeaning[random][1]);
  }

  state = {
    open: true,
  };
  toggleImage = () => {
    this.setState(state => ({ open: !state.open }));
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 35 }}>
          <Text></Text>
        </View>
        <Image source={LargeTitleApp} style={{ width: '100%' }} />
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')}>
            <Image source={VirtualCoffee} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Virtual')}>
            <Image source={TakePhoto} />
          </TouchableOpacity>
        </View>
        <Image source={PickCard} style={{ margin: 8 }} />
        <TouchableOpacity onPress={toggleModal2} style={styles.cards}>
          <Image source={Cards} />
          <Modal isVisible={isModalVisible} style={{ alignItems: "center", flex: 1 }}>
            <View>
              <Text style={styles.tapCard}>Tap card to flip</Text>
              <Button title="Hide Card" onPress={toggleModal} />
              <View style={{ marginBottom: 500 }}>
                <FlipCard
                  flipHorizontal={true}
                  flipVertical={false}>
                  <View style={styles.face}>
                    {/* <Text>The Face</Text> */}
                    <Image source={front} style={styles.cardStyle} />
                  </View>
                  <View>
                    {/* <Text>The Back</Text> */}
                    <Image source={meaning} style={styles.cardStyle} />
                  </View>
                </FlipCard>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        {/*<View>
        <TouchableOpacity onPress={toggleModal} style={styles.cards}>
          <Image source={Cards} />
           <Modal isVisible={isModalVisible} style = {{alignItems: "center"}}>
            <View>
              <Text style = {styles.tapCard}>Tap card to flip</Text>
              <Button title="Hide modal" onPress={toggleModal} />
              <View style={{marginBottom:500}}>
                <FlipCard
                  flipHorizontal={true}
                  flipVertical={false}>
                  <View style={styles.face}>
                    <Text>The Face</Text>
                    <Image source={arr[0]} style={styles.cardStyle} />
                  </View>
                  <View>
                    <Text>The Back</Text>
                    <Image source={arr[2]} style={styles.cardStyle} />
                  </View>
                </FlipCard>
              </View>
            </View>
          </Modal> 
        </TouchableOpacity>
      </View>*/}
        <NavBar />
      </View>
    </View>
  );
}

// Home button changed
function NavBar(){
  const navigation = useNavigation();
  return(
    <View style={{flex:1, backgroundColor:'#070631', height:'30%', alignItems:'center', alignContent:'center'}}>
      <Image source={Ellipse1} style={styles.ellipse} />
      <View style={{flexDirection:'row', width:'80%', justifyContent: 'space-between', position:'absolute', bottom: 0, paddingBottom:10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Horoscopemain')}>
        <Image source={Horosbtn}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Psychic')}>
           <Image source={Psychicbtn} style={{ marginRight:30, bottom:'80%'}}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={Home} style={{ bottom:'100%'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={Profilebtn} style={{ marginLeft:30, bottom:'80%'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={Favorites} style={{ bottom:'-20%'}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function NavBar_psyc(){
  const navigation = useNavigation();
  return(
    <View style={{flex:1, backgroundColor:'#070631', height:'30%', alignItems:'center', alignContent:'center'}}>
      <Image source={Ellipse1} style={styles.ellipse} />
      <View style={{flexDirection:'row', width:'80%', justifyContent: 'space-between', position:'absolute', bottom: 0, paddingBottom:10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Horoscopemain')}>
        <Image source={Horosbtn}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Psychic')}>
           <Image source={PsychicbtnW} style={{ marginRight:30, bottom:'80%'}}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={HomeB} style={{ bottom:'100%'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={Profilebtn} style={{ marginLeft:30, bottom:'80%'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={Favorites} style={{ bottom:'-20%'}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function NavBar_hor(){
  const navigation = useNavigation();
  return(
    <View style={{flex:1, backgroundColor:'#070631', height:'30%', alignItems:'center', alignContent:'center'}}>
      <Image source={Ellipse1} style={styles.ellipse} />
      <View style={{flexDirection:'row', width:'80%', justifyContent: 'space-between', position:'absolute', bottom: 0, paddingBottom:10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Horoscopemain')}>
        <Image source={HorosbtnW}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Psychic')}>
           <Image source={Psychicbtn} style={{ marginRight:30, bottom:'80%'}}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={HomeB} style={{ bottom:'100%'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={Profilebtn} style={{ marginLeft:30, bottom:'80%'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={Favorites} style={{ bottom:'-20%'}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}



function NavBar_pro(){
const navigation = useNavigation();
return(
  <View style={{flex:1, backgroundColor:'#070631', height:'30%', alignItems:'center', alignContent:'center'}}>
    <Image source={Ellipse1} style={styles.ellipse} />
    <View style={{flexDirection:'row', width:'80%', justifyContent: 'space-between', position:'absolute', bottom: 0, paddingBottom:10}}>
      <TouchableOpacity onPress={() => navigation.navigate('Horoscopemain')}>
      <Image source={Horosbtn}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Psychic')}>
         <Image source={Psychicbtn} style={{ marginRight:30, bottom:'80%'}}  />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={HomeB} style={{ bottom:'100%'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={ProfilebtnW} style={{ marginLeft:30, bottom:'80%'}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Image source={Favorites} style={{ bottom:'-20%'}} />
      </TouchableOpacity>
    </View>
  </View>
)
}

function NavBar_fav(){
  const navigation = useNavigation();
  return(
    <View style={{flex:1, backgroundColor:'#070631', height:'30%', alignItems:'center', alignContent:'center'}}>
      <Image source={Ellipse1} style={styles.ellipse} />
      <View style={{flexDirection:'row', width:'80%', justifyContent: 'space-between', position:'absolute', bottom: 0, paddingBottom:10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Horoscopemain')}>
        <Image source={Horosbtn}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Psychic')}>
           <Image source={Psychicbtn} style={{ marginRight:30, bottom:'80%'}}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={HomeB} style={{ bottom:'100%'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={Profilebtn} style={{ marginLeft:30, bottom:'80%'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={FavoritesW} style={{ bottom:'-20%'}} />
        </TouchableOpacity>
      </View>
    </View>
  )
  }
  


let favoriteDatabase = [
  {
    date: 'October 13, 2020',
    fortune: 'This is your fortune. This is your fortune. This is your fortune. This is your fortune. This is your fortune.'
  },
  {
    date: 'October 13, 2020',
    fortune: 'This is your fortune. This is your fortune. This is your fortune. This is your fortune. This is your fortune.'
  },
]

function FavoritesScreen() {
  const navigation = useNavigation();
  const [favoritesData, setFavoritesData] = useState([{"fortune" : "You're not logged in. Please come back and check after logging in"}]);

  useEffect( () => {
    CheckLoginToken().then(async (result) => {
      console.log('Favorites Screen Populated. Fetching data from firestore');
      console.log("Login Status: ", result)
      if(result === "User"){
        db.collection('users').doc(firebase.auth().currentUser.uid).get()
        .then(uData => {
          const userData = uData.data().favorites;
          setFavoritesData(userData);
          console.log(`USER DATA  ${JSON.stringify(favoritesData)}`);
        })
        .catch(error => console.log(error));
      }
    })
  })
                    

  return (
    <View style={{flexGrow:1, justifyContent:'space-between'}}>
      <ScrollView contentContainerStyle={styles.shopContainer}>
        <Image source={ galaxy } style={styles.shopBackgroundContainer} />
        <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:16}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
          <Image source={backButton} style={styles.backButtonStyle}/>
        </TouchableOpacity>
        <Image source={savedFortunesTitle} style={{position:'absolute', alignSelf:'center', right:'28%', top: 100}} />
      </View>
        <View style={{paddingTop: 130}}></View>
        {
          favoritesData.map((item, index) => {
            // favorites data is showing up in the console.log but not populating on the screen
            // this needs to be changed from a map to something else to correctly access the fortunes. 
            return(
              <View key={index} style={{padding:30}}>
                <Image source={fortuneBox} />
                <View style={{flexDirection:'row', position: 'absolute', bottom:500, right:0, alignItems:'center', padding:12}}>
                  <Text style={{color:'white', fontWeight:'bold', fontSize: 21, right: 75}}>{item.date}</Text>
                    <Image source={etcButton} style={{right:50}}/>
                </View>
                <View style={{position:'absolute', top:150, left: 60, width:'90%'}}>
                  <Text style={{fontSize:17}}>{item.fortune}</Text>
                </View>
              </View>
            )
          })
        }
        <View style={{paddingBottom:180}}></View>
        <NavBar_fav/>
      </ScrollView>
    </View>
  )

  // FIRESTORE not populating when mapped above. 
//   async function getFavorites() {
//     await db.collection('users').doc(firebase.auth().currentUser.uid)
//       .get()
//       .then(documentSnapshot => {
//         const userData = documentSnapshot.data();
//         console.log(`Retrieved data: ${JSON.stringify(userData.favorites)}`)
//         setFavoritesData(userData.favorites)
//       })
//       .catch(error => console.log(error))
//   }
 }

function ReadMore(){
  return(
    <View style={{flex:1, backgroundColor:'#070631'}}>
      <Text>
        Hello
      </Text>
    </View>
  )
}

let ShopDatabase = [
  {
    name: 'OriginalCoffee',
    img: originalPhoto,
    buyButton: originalBuyButton,
    URL: 'https://thefortunecoffee.com/products/fortune-coffee-original'
  },
  {
    name: 'CoconutCoffee',
    img: coconutPhoto,
    buyButton: coconutButton,
    URL: 'https://thefortunecoffee.com/products/fortune-coffee-coconut-flavor'
  },
  {
    name: 'StrawberryCoffee',
    img: strawberryPhoto,
    buyButton: strawberryButton,
    URL: 'https://thefortunecoffee.com/products/fortune-coffee-strawberry-flavor'
  },
  {
    name: 'HazelnutCoffee',
    img: hazelnutPhoto,
    buyButton: hazelnutButton,
    URL: 'https://thefortunecoffee.com/products/fortune-coffee-hazelnut-flavor'
  },
  {
    name: 'CoffeeCaramel',
    img: coffeeCaramelPhoto,
    buyButton: coffeeCaramelButton,
    URL: 'https://thefortunecoffee.com/products/fortune-coffee-caramel-flavor'
  },
  {
    name: 'CoffeeChocolate',
    img: coffeeChocolatePhoto,
    buyButton: coffeeChocolateButton,
    URL: 'https://thefortunecoffee.com/products/fortune-coffee-chocolate-flavor'
  }
]

function Payment({navigation, route}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [postal, setPostal] = useState('')
  const [cityState, setCityState] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [exp_month, setExp_Month] = useState('')
  const [exp_year, setExp_Year] = useState('')
  const [cvc, setCvc] = useState('')


  function toStripe(name, email, phone, address, city, country, postal, cityState, cardNumber, exp_month, exp_year, cvc) {
    fetch('https://peaceful-woodland-13730.herokuapp.com/api/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: {
          line1: address,
          city: city,
          country: country,
          postal_code: postal,
          state: cityState
        },
        subscription: route.params.subscription,
        card: {
          number: cardNumber,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc
        }
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        db.collection('users').doc(firebase.auth().currentUser.uid)
        .set({
          subscriptionLevel: route.params.subscription,
          stripeId: data.subscription.customer,
          subscriptionActive: true
        }).then(() => {
          console.log('yes')
        }).catch(error => console.log(error))
      });
  }

  return (
 
    <View style={{  alignItems: 'center', height: '100%' ,justifyContent: 'center'}}>
      <ImageBackground source={bgstars} style={styles.bgfull}>
      <View style={styles.flexInRows}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ top: 40, marginLeft: 10 }}>
            <Image source={backButton} />
          </TouchableOpacity>
      </View>
        <Text></Text>
        <Text style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20, marginTop: 60 }}>Name</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="Name"
          placeholder="   Enter name here"
          placeholderTextColor='#DCDCDC'
          onChangeText={name => setName(name)}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Email</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="Email"
          placeholder="   Enter Email Here"
          placeholderTextColor='#DCDCDC'
          onChangeText={email => setEmail(email)}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Phone</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="Phone"
          placeholder="   Enter Phone # Here"
          placeholderTextColor='#DCDCDC'
          onChangeText={phone => setPhone(phone)}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Address</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="Address"
          placeholder="   Address"
          placeholderTextColor='#DCDCDC'
          onChangeText={address => setAddress(address)}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>City</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="City"
          placeholder="   City"
          placeholderTextColor='#DCDCDC'
          onChangeText={city => setCity(city)}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Country</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="Country"
          placeholder="   Country"
          placeholderTextColor='#DCDCDC'
          onChangeText={country => setCountry(country)}
        />
      <View style={{ flexDirection: 'row', justifyContent:'space-between' , width: '90%', height: '5%' ,marginTop:15}}>
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch' }}>Postal</Text>
        <TextInput style={styles.savedFortuneTextBox2}
          label="Postal"
          placeholder="   Postal"
          placeholderTextColor='#DCDCDC'
          onChangeText={postal => setPostal(postal)}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch'}}>State</Text>
        <TextInput style={styles.savedFortuneTextBox2}
          label="State"
          placeholder="   State"
          placeholderTextColor='#DCDCDC'
          onChangeText={cityState => setCityState(cityState)}
        />
        </View>
        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Credit Card</Text>
        <TextInput style={styles.savedFortuneTextBox}
          label="Credit Card"
          placeholder="   Card Number"
          placeholderTextColor='#DCDCDC'
          onChangeText={cardNumber => setCardNumber(cardNumber)}
        />

        <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Credit Card</Text>
        <View style={{ flexDirection: 'row', width: '90%', height: '6%' }}>

          <TextInput style={styles.savedFortuneTextBox2}
            label="Month"
            placeholder="      Month"
            placeholderTextColor='#DCDCDC'
          onChangeText={exp_month => setExp_Month(exp_month)}
          />
          <TextInput style={styles.savedFortuneTextBox2}
            label="Year"
            placeholder="      Year"
            placeholderTextColor='#DCDCDC'
            onChangeText={exp_year => setExp_Year(exp_year)}
          />
          <TextInput style={styles.savedFortuneTextBox3}
            label="CVC"
            placeholder="      CVC"
            placeholderTextColor='#DCDCDC'
            onChangeText={cvc => setCvc(cvc)}
          />
        </View>
        <Text></Text>
      <TouchableOpacity onPress={() => { 
        toStripe(name, email, phone, address, city, country, postal, cityState, cardNumber, exp_month, exp_year, cvc)

        }}>
          <Image style={{marginTop:10 }} source={continueImage} />
        </TouchableOpacity>
      <Text></Text>
   </ImageBackground>
    </View>
    
  )
  
}

function SubscriptionScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.virtualContainer}>
      <ImageBackground source={subBackground} style={styles.virtualOne}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backButtonStyle}>
            <Image source={backButton} />
          </TouchableOpacity>
          <Image source={subscriptionDescription} style ={{marginTop:100}}/>

          <TouchableOpacity onPress={ () => navigation.navigate('Payment', {
            subscription: 'Amethyst'
          })}>
            <Image source={sub1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Payment', {
            subscription: 'Rose Quartz'
          })}>
            <Image source={sub2}  />
          </TouchableOpacity >
          <TouchableOpacity onPress={() => navigation.navigate('Payment', {
            subscription: 'Sapphire'
          })}>
            <Image source={sub4} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Payment', {
            subscription: "Tiger's Eye"
          })}>
 
            <Image source={sub3} />
          </TouchableOpacity>
        </View>
        <NavBar/>
      </ImageBackground>
      
    </View>
  )
}

// Mostly done. Still need back button and add onPress with href to shopify site
function ShopScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.shopContainer}>
      <Image source={ galaxy } style={styles.shopBackgroundContainer} />
      <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:16}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
          <Image source={backButton} style={styles.backButtonStyle}/>
        </TouchableOpacity>
        <Image source={shop} style={{position:'absolute', alignSelf:'center', right:'43%', top: 60}} />
      </View>
      <View style={{paddingTop:100}}></View>
      {
        ShopDatabase.map((item, index) =>{
          return(
            <View key={index} style={{padding:30}}>
              <Image source={item.img} style={styles.coffeeImageDimension} />
              <TouchableOpacity onPress={()=>{Linking.openURL(item.URL)}}>
               <Image source={item.buyButton} style={styles.coffeeBuyButton} />
              </TouchableOpacity>
            </View>
          )
        })
      }
      <View style={{paddingBottom:150}}></View>
      <NavBar/>
    </ScrollView>
  )
}


function VirtualCoffeeReadingScreen() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    async () => {
      if (Platform.OS !== 'web'){
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled){
      setImage(result.uri);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070631' }}>
        <View style={{position: "absolute", top: 0, flexDirection: 'row',justifyContent: 'space-between',width:'100%', margin: 16}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButtonStyle} >
            <Image source={backButton}/>
          </TouchableOpacity>
        </View>
      {image && <Image source={{uri: image}} style={{marginTop:0, height: '40%', width: '80%', borderWidth:5, borderColor: '#FFF'}} />}
      <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')}>
        <Image source={useAVirtualCoffee}/>
      </TouchableOpacity>
      <Image source={virtualImage} />
      {image && <View>
        <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimation')}>
          <Image source={submitPhoto} style={{marginTop:30}} />
        </TouchableOpacity>
      </View>}
      <TouchableOpacity onPress={pickImage}>
      <Image source={photoGallery} style={{marginTop:30}} />
      </TouchableOpacity>
    </View>
  )
}

function FortuneModal() {
  return (
    <View style={styles.virtualContainer}>
      <Text> Hello </Text>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Fortune Modal</Text>
    </View>
    </View>
  )
}

function Psychic() {
  const navigation = useNavigation();
  return (
    
    <View style={styles.virtualContainer}>
      <ImageBackground source={bgcoming} style={styles.bgfull}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={SignUpButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Image source={SignInButton} />
            </TouchableOpacity>
          </View>
      <NavBar_psyc/>
      </ImageBackground>
      </View>
     
  )
  
  }
  



function VirtualOne(){
  const navigation = useNavigation();
  return(
    <View style={styles.virtualContainer}>
      <ImageBackground source={ backgroundOne } style={ styles.virtualOne }>
        <Image source={ tapToDrinkText } />
        <TouchableOpacity onPress={() => navigation.navigate('VirtualTwo')}>
          <Image source={ coffee_v } />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

function VirtualTwo(){
  const navigation = useNavigation();
  return (
    <View style={styles.virtualContainer}>
      <ImageBackground source={ backgroundTwo } style={ styles.virtualOne }>
        <Image source={ tapToDrinkText } />
        <TouchableOpacity onPress={ () => navigation.navigate('VirtualThree')}>
          <Image source={ coffee_v } />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

function VirtualThree(){
  const navigation = useNavigation();
  return (
    <View style={styles.virtualContainer}>
      <ImageBackground source={ backgroundThree } style={ styles.virtualOne }>
        <Image source={ tapToDrinkText } />
        <TouchableOpacity onPress={ () => navigation.navigate('VirtualFour')}>
          <Image source={ coffee_v } />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

function VirtualFour(){
  const navigation = useNavigation();
  return (
    <View style={styles.virtualContainer}>
      <ImageBackground source={ backgroundFour } style={ styles.virtualOne }>
        <Image source={ tapToDrinkText } />
        <TouchableOpacity onPress={ () => navigation.navigate('ReadingAnimation')}>
          <Image source={ coffee_v } />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

function VirtualFive(){
  const navigation = useNavigation();

  {/* ASYNCHRONOUSLY FIND RANDOM FORTUNE */}
  // BUG: redirects to fortunes away from subscription page if subscription button was pressed
  setTimeout( () => { navigation.navigate('Reading') }, 15);
  
  return( 
    <View style={styles.virtualContainer}>
      <ImageBackground source={backgroundFive} style={ styles.virtualOne }>
        <Image source={ pysicReadingText } style={{ margin: '40%'}}/>
        <Image source={ dontWantToWaitText } style={{ marginBottom:10 }} />
        <TouchableOpacity onPress={ () => navigation.navigate('Subscription')}>
          <Image source={ getCrystalsButton } />
        </TouchableOpacity>
        <NavBar/>
      </ImageBackground>
    </View>
  )
}

function VirtualLoadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Virtual Loading Screen</Text>
    </View>
  )
}

function PhotoReadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Photo Reading Screen</Text>
    </View>
  )
}

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <KeyboardAvoidingView style={styles.virtualContainer} behavior='padding'>
      <ImageBackground source={signBackground} style={styles.virtualOne}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButtonStyle}>
          <Image source={backButton}/>
        </TouchableOpacity>
        <Image source={signTitle} style={{marginTop:'20%'}}/>
        <Image source={signUpBelowTitle} style={{marginBottom:12, marginTop:12}} />
        <View style={{marginTop:8, marginBottom:20}}>
        {/*}  <TouchableOpacity onPress={() => console.log('google pressed')} style={{marginBottom:20}}>
            <Image source={googleTitle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('facebook pressed')}>
            <Image source={facebookTitle} />
          </TouchableOpacity>*/}
        </View>
        <Image source={signEmailText} style={{marginBottom:8}}/>
        <TextInput style={styles.textBox}
          label="Email"
          placeholder="    Email address"
          placeholderTextColor='#DCDCDC'
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={email => setEmail(email)}
        />
        <TextInput style={styles.textBox} secureTextEntry={true}
          label="Password"
          placeholder="    Password"
          placeholderTextColor='#DCDCDC'
          autoCapitalize='none'
          passwordRules='required: lower; required: upper; required: digit; required: [-], minlength:5'
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput style={styles.textBox} secureTextEntry={true}
          label="Re-enter Password"
          placeholder="    Re-enter Password"
          placeholderTextColor='#DCDCDC'
          autoCapitalize='none'
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => { SignUp(email, password), navigation.navigate('HomeLoggedIn') }}>
          <Image source={signUpButton} style={styles.buttonImage}  />
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginTop:20}} >
          <Image source={haveAcctText} style={{marginRight:10}}/>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={loginText} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )

  // FIRESTORE
  function SignUp() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => {
        return db.collection('users').doc(data.user.uid).set({
          userName: email,
          subscriptionLevel: 0,
          totalGems: 0
        })
          .catch(error => console.log(error))
      })
  }
}

// TODO need to hook this up to a button after signed in
function Profile() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={bgstars} style={styles.bgfull}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={SignUpButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Image source={SignInButton} />
            </TouchableOpacity>
          </View>
   <NavBar_pro></NavBar_pro>
    </ImageBackground>
    
  )
}





function ProfileDetails() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={bgstars} style={styles.bgfull}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={ styles.flexInRows}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style = {{top: 50, marginLeft: 10}}>
          <Image source={backButton} />
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20}}>Name</Text>
      <TextInput style={styles.savedFortuneTextBox}
        label="Name"
        placeholder="   Enter name here"
        placeholderTextColor='#DCDCDC'
      />
      <Text style={{ color: '#FFFFFF', fontSize: 18, marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20}}>Relationship Status</Text>
      <TextInput style={styles.savedFortuneTextBox}
        label="Relationship Status"
        placeholder="   Enter relationship status here"
        placeholderTextColor='#DCDCDC'
      />
      <Text style={{ color: '#FFFFFF', fontSize: 18, marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20}}>Employment Status</Text>
      <TextInput style={styles.savedFortuneTextBox}
        label="EmploymentStatus"
        placeholder="   Enter employment status here"
        placeholderTextColor='#DCDCDC'
      />
      <Text style={{ color: '#FFFFFF', fontSize: 18, marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20}}>Gender</Text>
      <TextInput style={styles.savedFortuneTextBox}
        label="Gender"
        placeholder="   Enter gender here"
        placeholderTextColor='#DCDCDC'
      />
      <Text style={{ color: '#FFFFFF', fontSize: 18, marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20}}>Birthday</Text>
      <View style={{flexDirection: 'row',width:'90%', height: '7%'}}>
        <TextInput style={styles.savedFortuneTextBox2}
          label="Month"
          placeholder="      00"
          placeholderTextColor='#DCDCDC'
        />
        <TextInput style={styles.savedFortuneTextBox2}
          label="Day"
          placeholder="      00"
          placeholderTextColor='#DCDCDC'
        />
        <TextInput style={styles.savedFortuneTextBox3}
          label="Year"
          placeholder="      00"
          placeholderTextColor='#DCDCDC'
        />
      </View>
      <Text></Text>
      <TouchableOpacity onPress={() => console.log('log in pressed')}>
        <Image source={continueImage} />
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity onPress={() => console.log('log in pressed')}>
        <Image source={skipImage} />
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")

  function onLogin() {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          Alert.alert("Success", "You are Logged In")
          navigation.navigate('HomeLoggedIn')
        })
        .catch(function (error) {
          setError("Invalid Email/Password")
        });
      }

  return (
    <KeyboardAvoidingView style={styles.virtualContainer} behavior='padding'>
      <ImageBackground source={signBackground} style={styles.virtualOne}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButtonStyle}>
          <Image source={backButton}/>
        </TouchableOpacity>
        <Image source={signTitle}  style={{marginTop:'20%', marginBottom:40}}/>
        <View style={{marginTop:8, marginBottom:20}}>
         {/* <TouchableOpacity onPress={() => console.log('google pressed')} style={{marginBottom:20}}>
            <Image source={googleTitle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('facebook pressed')}>
            <Image source={facebookTitle} />
          </TouchableOpacity>*/}
        </View>
        <Image source={signEmailText} style={{marginBottom:8}}/>
        <TextInput style={styles.textBox}
          label="Email"
          placeholder="    Email address"
          placeholderTextColor='#DCDCDC'
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={email => {
            setEmail(email)
          }}
        />
        <TextInput style={styles.textBox} secureTextEntry={true}
          label="Password"
          placeholder="    Password"
          placeholderTextColor='#DCDCDC'
          autoCapitalize='none'
          passwordRules='required: lower; required: upper; required: digit; required: [-], minlength:5'
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
        />

      {error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : null}
        <TouchableOpacity onPress={() => { onLogin(email, password) } }>
          <Image source={loginButton} style={styles.buttonImage} />
        </TouchableOpacity>
        <Image source={forgotPasswordText} style={{marginTop:20}}/>
        <View style={{flexDirection:'row', marginTop:12}}>
          <Image source={createNewText} style={{marginRight:4}}/>
          <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
            <Image source={accoutText}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    </KeyboardAvoidingView>
  )
  
}

function ReadingAnimationScreen({navigation}){
  const rotateValueHolder = useRef(new Animated.Value(0)).current;
  const startImageRotationFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.loop(
      Animated.timing(rotateValueHolder, 
                      { toValue: 1,
                        easing: Easing.quad, 
                        duration: 3000,
                        useNativeDriver: false,
                    }),
                      {
                        iterations: 1
                      }
                      ).start();
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '180deg'],
  });
  
  useEffect(startImageRotationFunction);
  {
  InteractionManager.runAfterInteractions(() => navigation.navigate("VirtualFive"));
  }
  InteractionManager.runAfterInteractions(() => setTimeout(() => { navigation.navigate('Reading') }, 1000000000000));

  return(
    <View style={styles.mainContainer}>
      <ImageBackground source={ readingAnimationBackground } style={ styles.readingAnimationBackground }>
        <Image source={ readingCoffee } style={ styles.readingCoffeeImage } />
        <Animated.View>
          <Animated.Image style={ {
                                  width: 200,
                                  height: 200,
                                  transform: [ { rotate: RotateData } ]
                                } }
                  source={coffee} 
          />
        </Animated.View>
      </ImageBackground>
    </View>
  )
}

//  ONBOARDING
function Onboarding({}){
  const navigation = useNavigation();
  const pagerRef = useRef(null);
  const handlePageChange = pageNumber => {
                                            pagerRef.current.setPage(pageNumber);
                                          };
  return (
    <ViewPager style={styles.virtualContainer} initialPage={0} ref={pagerRef}>
      <View key="1">
        <ImageBackground source={OnboardingBg} style={styles.virtualOne}>
          <View style={{justifyContent:'flex-end', paddingBottom: 20, height:'100%'}}>
            <TouchableOpacity onPress={() => handlePageChange(1)} >
              <Image source={Next} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View key="2">
        <ImageBackground source={OnboardingBg1} style={styles.virtualOne}>
          <View style={{justifyContent:'flex-end', paddingBottom: 20, height:'100%'}}>
            <TouchableOpacity onPress={() => handlePageChange(2)} >
              <Image source={Next} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View key="3">
        <ImageBackground source={OnboardingBg2} style={styles.virtualOne}>
          <View style={{justifyContent:'flex-end', paddingBottom: 20, height:'100%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
              <Image source={getStarted} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ViewPager>
  )}

//HOROSCOPE MAIN
function Horoscopemain({}) {
  const navigation = useNavigation();
    return (
      <ImageBackground source={bgstars} style={styles.bgfull}>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={SignUpButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Image source={SignInButton} />
            </TouchableOpacity>
          </View>
      <View >
        <View style={{  alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: -90 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={SignUpButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Image source={SignInButton} />
            </TouchableOpacity>
          </View>
          <Image source={Horoscopetxt} style={{ }} />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:30}}>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeAries')}>
            <Image source={Ariesbttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeTaurus')}>
            <Image source={Taurusbttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeGemini')}>
            <Image source={Geminibttn} />
          </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:2}}>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeCancer')}>
            <Image source={Cancerbttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeLeo')}>
            <Image source={Leobttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeVirgo')}>
            <Image source={Virgobttn} />
          </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:2}}>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeLibra')}>
            <Image source={Librabttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeScorpio')}>
            <Image source={Scorpiobttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeSagittarius')}>
            <Image source={Sagittariusbttn} />
          </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:2}}>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeCapricorn')}>
            <Image source={Capribttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HoroscopeAquarius')}>
            <Image source={Aquariusbttn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Horoscopepisces')}>
            <Image source={Piscesbttn} />
          </TouchableOpacity>
          </View>
            </View>

            
            </View>
            <NavBar_hor></NavBar_hor>

            </ImageBackground>



     
    );
  }



//horoscope aries

function HoroscopeAries({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={AriesCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={AriesTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}

//horoscope Aquarius

function HoroscopeAquarius({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={AquariusCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={AquariusTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 

}


//horoscope cancer

function HoroscopeCancer({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={CancerCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={CancerTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}

//horoscope Libra

function HoroscopeLibra({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={LibraCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={LibraTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}

//horoscope Leo

function HoroscopeLeo({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={LeoCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={LeoTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}

//horoscope Scorpio

function HoroscopeScorpio({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={ScorpioCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={ScorpioTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 

}




//horoscope Sagittarius

function HoroscopeSagittarius({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={SagittariusCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={SagittariusTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}


//horoscope Taurus

function HoroscopeTaurus({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={TaurusCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={TaurusTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}
//horoscope Virgo

function HoroscopeVirgo({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={VirgoCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={VirgoTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 
}


//horoscope Gemini

function HoroscopeGemini({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={GeminiCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={GeminiTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 


}






//horoscope Capricorn

function HoroscopeCapricorn({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={{  alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={CapricornCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={CapricornTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      
      </View>
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 

}




//horoscope pisces

function Horoscopepisces({}) {
  const navigation = useNavigation();
  const [randHoroscope, setRandomHoroscope] = useState('');
  const [randNumber, setRandomNumber] = useState('');
  const [randLetter, setRandomLetter] = useState('');
  const [randThanks, setRandomThanks] = useState('');
  const [randWord2, setRandomWord2] = useState('');
  const [randWord3, setRandomWord3] = useState('');
  const [randWord4, setRandomWord4] = useState('');
  const [randAdvice, setRandomAdvice] = useState('');





  useEffect(()=>{
    let mounted = true;

    if(mounted){
      // We can put them all together
      HoroscopeRandomizer();
      AdviceRandomizer();
      ThanksRandomizer();
      LetterRandomizer();
      Word4Randomizer();
      Word3Randomizer();
      Word2Randomizer();
      NumberRandomizer();
    }
    return()=>{
      mounted =false;
    }
  },[navigation])


  const HoroscopeRandomizer = async () =>{

              // Async storage, Key , Date
    const randomHoroscope = await GetItemInStorage("HOROSCOPE_RANDOM_TIMER");
    console.log(randomHoroscope)
    if(!randomHoroscope){
      await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * horoscopeArray.length))
      await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      await setRandomHoroscope(getRandomHoroscope(random));
      
    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomHoroscope);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * horoscopeArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomHoroscope(getRandomHoroscope(random));
        await SaveItemInStorage("HOROSCOPE_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("HOROSCOPE_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("HOROSCOPE_RANDOM_NUMBER")
        await setRandomHoroscope(getRandomHoroscope(parseInt(getOldRandomNumber)));
        // Display previous horoscope.
      }

    }
      
  }

  //NUMBER
  const NumberRandomizer = async () =>{

      // Async storage, Key , Date
    const randomNumber = await GetItemInStorage("NUMBER_RANDOM_TIMER");
    if(!randomNumber){
      await SaveItemInStorage("NUMBER_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * numbersArray.length))
      await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      await setRandomnNumber(getRandomNumber(random));

    }else{
      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(getRandomWord2);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * numbersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomNumber(getRandomNumber(random));
        await SaveItemInStorage("NUMBER_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("NUMBER_RANDOM_NUMBER", random.toString())
      }
      else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("NUMBER_RANDOM_NUMBER")
        await setRandomNumber(getRandomNumber(getOldRandomNumber));
        // Display previous horoscope.
      }

    }
  }


  const Word2Randomizer = async () =>{

        // Async storage, Key , Date
      const randomWord2 = await GetItemInStorage("WORD2_RANDOM_TIMER");
      console.log(randomWord2)
      if(!randomWord2){
        await SaveItemInStorage("WORD2_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * wordsArray.length))
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomWord2);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
        
        // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * wordsArray.length))
        console.log("One day has passed, getting new horoscope")
        await SaveItemInStorage("WORD2_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("WORD2_RANDOM_NUMBER", random.toString())
        await setRandomWord2(getRandomWord2(random));
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("WORD2_RANDOM_NUMBER")
        await setRandomWord2(getRandomWord2(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }


  const Word3Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord3 = await GetItemInStorage("WORD3_RANDOM_TIMER");
    console.log(randomWord3)
    if(!randomWord3){
      await SaveItemInStorage("WORD3_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
      await setRandomWord3(getRandomWord3(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord3);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
    // if one day has passed
    // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord2(getRandomWord3(random));
      await SaveItemInStorage("WORD3_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD3_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD3_RANDOM_NUMBER")
      await setRandomWord3(getRandomWord3(getOldRandomNumber));
      // Display previous horoscope.
      }
    }
  }

  const Word4Randomizer = async () =>{

      // Async storage, Key , Date
    const randomWord4 = await GetItemInStorage("WORD4_RANDOM_TIMER");
    console.log(randomWord4)
    if(!randomWord4){
      await SaveItemInStorage("WORD4_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * wordsArray.length))
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
      await setRandomWord4(getRandomWord4(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomWord4);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)

    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
      let random = Math.floor((Math.random() * wordsArray.length))
      console.log("One day has passed, getting new horoscope")
      await setRandomWord4(getRandomWord4(random));
      await SaveItemInStorage("WORD4_RANDOM_TIMER", currentDate.toString())
      await SaveItemInStorage("WORD4_RANDOM_NUMBER", random.toString())
    }else{
      console.log("One day has not passed, will not reset the current horoscope")
      let getOldRandomNumber = await GetItemInStorage("WORD4_RANDOM_NUMBER")
      await setRandomWord4(getRandomWord4(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }


  const LetterRandomizer = async () =>{

    // Async storage, Key , Date
  const randomLetter = await GetItemInStorage("Letter_RANDOM_TIMER");
    console.log(randomLetter)
    if(!randomLetter){
      await SaveItemInStorage("Letter_RANDOM_TIMER", new Date().getTime().toString())
      let random = Math.floor((Math.random() * lettersArray.length))
      await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      await setLetter(getLetter(random));

    }else{

      let currentDate = parseInt(new Date().getTime().toString());
      let previousDate = parseInt(randomLetter);

      let newPreviousDate = parseInt(previousDate) + 86400000;
      console.log("CurrentDate : " ,currentDate)
      console.log("Previous Date : " ,newPreviousDate)
    // 86400000 = 1 day
    if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * lettersArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomLetter(getRandomLetter(random));
        await SaveItemInStorage("Letter_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Letter_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Letter_RANDOM_NUMBER")
        await setRandomLetter(getRandomLetter(getOldRandomNumber));
    // Display previous horoscope.
      }
    }
  }

  const ThanksRandomizer = async () =>{

        // Async storage, Key , Date
      const randomThanks = await GetItemInStorage("Thanks_RANDOM_TIMER");
      console.log(randomThanks)
      if(!randomThanks){
        await SaveItemInStorage("Thanks_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * thanksArray.length))
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
        await setRandomThanks(getRandomThanks(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomThanks);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
        // if one day has passed
        // Grab a random number
        let random = Math.floor((Math.random() * thanksArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomThanks(getRandomThanks(random));
        await SaveItemInStorage("Thanks_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Thanks_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Thanks_RANDOM_NUMBER")
        await setRandomThanks(getRandomThanks(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }

  const AdviceRandomizer = async () =>{
    // Async storage, Key , Date
      const randomAdvice = await GetItemInStorage("Advice_RANDOM_TIMER");
      console.log(randomAdvice)
      if(!randomAdvice){
        await SaveItemInStorage("Advice_RANDOM_TIMER", new Date().getTime().toString())
        let random = Math.floor((Math.random() * adviceArray.length))
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
        await setRandomAdvice(getRandomAdvice(random));

      }else{

        let currentDate = parseInt(new Date().getTime().toString());
        let previousDate = parseInt(randomAdvice);

        let newPreviousDate = parseInt(previousDate) + 86400000;
        console.log("CurrentDate : " ,currentDate)
        console.log("Previous Date : " ,newPreviousDate)
      // 86400000 = 1 day
      if((previousDate + 86400000) < currentDate){
      // if one day has passed
      // Grab a random number
        let random = Math.floor((Math.random() * adviceArray.length))
        console.log("One day has passed, getting new horoscope")
        await setRandomAdvice(getRandomAdvice(random));
        await SaveItemInStorage("Advice_RANDOM_TIMER", currentDate.toString())
        await SaveItemInStorage("Advice_RANDOM_NUMBER", random.toString())
      }else{
        console.log("One day has not passed, will not reset the current horoscope")
        let getOldRandomNumber = await GetItemInStorage("Advice_RANDOM_NUMBER")
        await setRandomAdvice(getRandomAdvice(getOldRandomNumber));
        // Display previous horoscope.
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={bgstars} style={styles.bgfull}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>
      <View style={{  alignItems: 'center' }}>  

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' , marginRight:12 }}>

        <Image source={number} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randNumber}  </Text>
          
        <Image source={letter} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randLetter}  </Text>
          
        <Image source={appre} style={{ marginTop: 10 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5,marginLeft:3}}> {randThanks}  </Text>

        </View>
        <Image source={PiscesCard} style={{ justifyContent: 'space-evenly'}} />

        <View style={{  flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Image source={love} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord2}  </Text>
          

        <Image source={career} style={{ marginTop: 10}} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord3}  </Text>
        
        <Image source={luck} style={{ marginTop: 0 }} />
        <Text style={{fontSize:14, color:'white', marginTop:5, marginLeft:3}}> {randWord4}  </Text>
          
     
        </View>
        </View>
        
        <Image source={PiscesTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 25 }} />
        <View style={{  alignItems: 'center' }}>
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randHoroscope}  </Text>
            </View>
          
            </View>
          
          
        <Image source={advicetxt} style={{ alignItems: 'center', marginTop:30}} />
        <View style={styles.readingTableContainer2}>
            <View>
            <Text style={{fontSize:17, color:'white'}}> {randAdvice}  </Text>
    
            
            </View>
       
          </View>

           </View>

       
      </View>
      <NavBar_hor/>
      </ImageBackground>
      </View>
    
   
  );

  function getRandomHoroscope(random) {
    console.log(random);
    let randHoroscope = horoscopeArray[random];
    console.log(randHoroscope);
    return randHoroscope;
  
  }
  function getRandomNumber(random) {
    console.log(random);
    let randNumber = numbersArray[random];
    console.log(randNumber);
    return randNumber;
  
  }

  function getRandomLetter(random) {
    console.log(random);
    let randLetter = lettersArray[random];
    console.log(randLetter);
    return randLetter;
  
  }
   function getRandomThanks(random) {
    console.log(random);
     let randThanks = thanksArray[random];
    console.log(randThanks );
    return randThanks;
  
  }

  function getRandomWord2(random) {
   console.log(random);
    let randWord = wordsArray[random];
   console.log(randWord);
   return randWord;
 
 }

  function getRandomWord3(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomWord4(random) {
  console.log(random);
    let randWord = wordsArray[random];
  console.log(randWord);
  return randWord;

  }
  function getRandomAdvice(random) {
  console.log(random);
    let randAdvice= adviceArray[random];
  console.log(randAdvice);
  return randAdvice;

} 

  //FIRESTORE
  // function onSaveFortune() {
  //   db.collection('users').doc(firebase.auth().currentUser.uid).update({
  //     favorites: firebase.firestore.FieldValue.arrayUnion(...[randomFortune])
  //   })
  //   // navigation.navigate('Favorites')
  // }

}



// ADDED
function Reading({}){
  const navigation = useNavigation();
  var userName = 'user';

  const [buttonClicked, setButtonClicked] = useState(false);
  const [randomFortune, setRandomFortune] = useState('');
  return (
    <View style={styles.virtualContainer}>
      <ImageBackground source={readingBackground} style={styles.virtualOne}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} >
            <Image source={backButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={userImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexInRowsCoffee}>
          <TouchableOpacity onPress={() => onSave()}>
              <Image source={saveButton} />
            </TouchableOpacity>
            <View>
              <Text style={styles.helloUserTextContainer}> Hello {userName} </Text>
              <Image source={coffeeImg} style={{ marginTop: 20 }} />
            </View>
            <TouchableOpacity onPress={() => console.log("SHARE")}>
              <Image source={shareButton} style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>
        </View>
          <View style={styles.readingTableContainer}>
            <Image source={yourFortune} style={{marginBottom:12}} />
            <ScrollView>
            <Text style={{fontSize:17, color:'white'}}> {randomFortune}  </Text>
          
            {!buttonClicked ? (
              <Button
                onPress={() => {
                  setRandomFortune(getRandomFortune)
                  setButtonClicked(true)
                }}
                title='Fortune Ready Click To View!'
              >
              </Button>
            ) : null}
            
            </ScrollView>
          </View>
          <NavBar/>
      </ImageBackground>
    </View>
  )
  
  function getRandomFortune() {
    let random = Math.floor((Math.random() * fortunesArray.length))
    console.log(random);
    let fortune = fortunesArray[random];
    console.log(fortune);
    return fortune;
  }

  //FIRESTORE
  function onSave() {
    var today = new Date().toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
    var favRef = db.collection('users').doc(firebase.auth().currentUser.uid);
    favRef.update({
      'favorites' : firebase.firestore.FieldValue.arrayUnion(...[{'date': today, 'fortune': randomFortune}])
    })
    navigation.navigate('Favorites')
  }
}

////////////////////
// Navigation Stack //
////////////////////
const Stack = createStackNavigator();

function App() {
  const forFade = ({ current }) => ({ cardStyle: { opacity: current.progress }});

  const _CheckOnboarding = () => {
    RetrieveData('ONBOARDING').then( (val) => {
      if(val !== 'DONE') { // if onboarding 
        StoreData("ONBOARDING", 'PENDING');
        console.log(`Onboarding State 1: ${RetrieveData('ONBOARDING')}`);
        StoreData("ONBOARDING", "DONE");
        return ( <Stack.Screen name="Onboarding" component={Onboarding} /> );
      }
      else {
        console.log(`Onboarding State: ${JSON.stringify(val)}`);
      }
    }
    )
  }

  
  
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {<Stack.Screen name="Home" component={HomeScreen} />}
        <Stack.Screen name="HomeLoggedIn" component={HomeScreenLoggedIn} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Virtual" component={VirtualCoffeeReadingScreen} />
        <Stack.Screen name="VirtualOne" component={VirtualOne} options={{ cardStyleInterpolator:forFade}} />
        <Stack.Screen name="VirtualTwo" component={VirtualTwo} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualThree" component={VirtualThree} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualFour" component={VirtualFour} options={{ cardStyleInterpolator:forFade}}/>
        {
        <Stack.Screen name="VirtualFive" component={VirtualFive} options={{ cardStyleInterpolator:forFade}}/>
        }
        <Stack.Screen name="VirtualLoading" component={VirtualLoadingScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PhotoReading" component={PhotoReadingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ReadingAnimation" component={ReadingAnimationScreen} />
        <Stack.Screen name="Reading" component={Reading} />
        <Stack.Screen name="ReadMore" component={ReadMore} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="Fortune" component={FortuneModal} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        <Stack.Screen name="Horoscopepisces" component={Horoscopepisces} />
        <Stack.Screen name="HoroscopeAries" component={HoroscopeAries} />
        <Stack.Screen name="HoroscopeAquarius" component={HoroscopeAquarius} />
        <Stack.Screen name="HoroscopeCancer" component={HoroscopeCancer} />
        <Stack.Screen name="HoroscopeCapricorn" component={HoroscopeCapricorn} />
        <Stack.Screen name="HoroscopeGemini" component={HoroscopeGemini} />
        <Stack.Screen name="HoroscopeLeo" component={HoroscopeLeo} />
        <Stack.Screen name="HoroscopeLibra" component={HoroscopeLibra} />
        <Stack.Screen name="HoroscopeScorpio" component={HoroscopeScorpio} />
        <Stack.Screen name="HoroscopeSagittarius" component={HoroscopeSagittarius} />
        <Stack.Screen name="HoroscopeTaurus" component={HoroscopeTaurus} />
        <Stack.Screen name="HoroscopeVirgo" component={HoroscopeVirgo} />
        <Stack.Screen name="Horoscopemain" component={Horoscopemain} />
        <Stack.Screen name="Psychic" component={Psychic} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
