
import React, { useRef, useEffect, useState, useCallback, Componenet, useFocusEffect } from 'react';

import './fixtimerbug';
import {fortunesArray} from './fortunesArray';

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
  KeyboardAvoidingView,
  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ViewPager from '@react-native-community/viewpager';


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
import linehors from './assets/FortuneCoffeePNGassets/horoscopes/Line_57.png'
import hottxt from './assets/FortuneCoffeePNGassets/horoscopes/hottxt.png'
import advicetxt from './assets/FortuneCoffeePNGassets/horoscopes/ADVICE.png'
import leftword from './assets/FortuneCoffeePNGassets/horoscopes/leftword.png'
import rightword from './assets/FortuneCoffeePNGassets/horoscopes/rightword.png'

//HOROSCOPE MAIN//
import Horoscopetxt from './assets/FortuneCoffeePNGassets/horoscopes/Horoscopes.png'


//NAVBAR//
import Ellipse1 from './assets/FortuneCoffeePNGassets/HomePage/ellipse.png';
import Home from './assets/FortuneCoffeePNGassets/HomePage/Home.png';
import Shop from './assets/FortuneCoffeePNGassets/HomePage/Shop.png';
import Favorites from './assets/FortuneCoffeePNGassets/HomePage/Favorites.png';
import homeSelected from './assets/FortuneCoffeePNGassets/HomePage/homeSelected.png';
import favSelected from './assets/FortuneCoffeePNGassets/HomePage/favSelected.png';
import shopSelected from './assets/FortuneCoffeePNGassets/HomePage/shopSelected.png';
//HOMEPAGE//
import TakePhoto from './assets/FortuneCoffeePNGassets/HomePage/TakePhoto.png';
import VirtualCoffee from './assets/FortuneCoffeePNGassets/HomePage/VirtualCoffee.png';
import SignInButton from './assets/FortuneCoffeePNGassets/HomePage/SignInButton.png';
import SignUpButton from './assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png';
import LargeTitleApp from './assets/FortuneCoffeePNGassets/HomePage/FortuneCoffeeTitle.png';
import PickCard from './assets/FortuneCoffeePNGassets/HomePage/PickCard.png';
import Cards from './assets/FortuneCoffeePNGassets/HomePage/allCards.png';

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
import RegularCardCounter from './util/cardCounters/RegularCardCounter'


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
    padding: 10,
    margin: 40,
  },
  savedFortuneTextBox: {
    height: "7%",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [front, setFront] = useState(dummyPath);
  const [meaning, setMeaning] = useState(dummyPath);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  /// Modal Viewer based on date. 
  const [userCanViewCard, setUserCanViewCard] = useState(false);

  // UseEffect for checking the card before each trigger
  // Rather than putting it inside the function, we put it on the useeffect for checking
  useEffect(()=>{
    let mounted = true;

    // If mounted . Check the state then storage.
    if(mounted){
      if(isModalVisible === true){
        console.log("Modal is visible")
        // Check the counter based on async storage, not fire ..
        RegularCardCounter().then((result)=>{
          console.log("User can view card : " , result)

          // CHANGE THIS TO FALSE AND TRUE IF YOU WAANT TO CHECK.
          // TODO : DATE FILTER AND CHECKING
          setUserCanViewCard(false)
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
    }
    return ()=>{
      mounted = false;
    }
  },[navigation])

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
    const counter = 2;

    return userCanViewCard ? (
      <> 
    {/* Show module if user can view*/}
          <Modal isVisible={isModalVisible} style={{ alignItems: "center", flex: 1 }}>
            <View>
              <Text style={styles.tapCard}>Tap card to flip</Text>
              <Button title="Hide " onPress={toggleModal} />
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
          <Text style={styles.tapCard}>You already checked! Please check agian in {counter} hours.</Text>
          <Button title="Hide " onPress={toggleModal} />
          <View style={{ marginBottom: 500 }}>
          </View>
        </View>
      </Modal>
    </>;
  }
 

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Image source={SignUpButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image source={SignInButton} />
          </TouchableOpacity>
        </View>
        <Image source={LargeTitleApp} style={{ width: '100%' }} />
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')}>
          {/* Virtual Coffe Reading */}
            <Image source={VirtualCoffee} />
          </TouchableOpacity>
          {/* Take a photo for reading */}
          <TouchableOpacity onPress={() => navigation.navigate('Virtual')}>
            <Image source={TakePhoto} />
          </TouchableOpacity>
        </View>
        
        {/* <Button title="Subscription" onPress={ () => navigation.navigate('Subscription')} /> */}
        <Image source={PickCard} style={{ margin: 8 }} />
          {/* Pick a card  */}
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
                <View>
                   <Image source={front} style={styles.cardStyle} />
                  </View>
                  <View>
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
        { /* Checker if the cards are */}
        <NavBar />
      </View>
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
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={Favorites}/>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={Home} style={{bottom:'80%'}}/>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
            <Image source={Shop} />
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
  const [favoritesData, setFavoritesData] = useState([])

  // still not working... need help
     useEffect(() => {
      db.collection('users').doc(firebase.auth().currentUser.uid)
        .get()
        .then(queryResult => {
          const userData = queryResult.data();
          // console.log(`Retrieved data: ${JSON.stringify(userData.favorites)}`)
          const userDataParsed = userData.favorites
          let arrayOfFavorites = [];
          for (const key in userDataParsed) {
            arrayOfFavorites.push(userDataParsed[key])
          }
        
          setFavoritesData(arrayOfFavorites)
          console.log(arrayOfFavorites)
        })
    }, []);

  return (
    <View style={{flexGrow:1, justifyContent:'space-between'}}>
      <ScrollView contentContainerStyle={styles.shopContainer}>
        <View style={{flexDirection:'row', width:'100%', position: 'relative', left:0, top:75, marginBottom: 65}} >
          <TouchableOpacity onPress={()=>navigation.popToTop()} style={styles.backButtonStyle}>
            <Image source={backButton} />
            
          </TouchableOpacity>
          
            <Image source={savedFortunesTitle} style={{position:'absolute', alignSelf:'center', right:'28%', bottom:'5%'}} />
        </View>
        <Image source={ galaxy } style={styles.shopBackgroundContainer} />
        {
          favoriteDatabase.map((item, index) => {
            // favorites data is showing up in the console.log but not populating on the screen
            // this needs to be changed from a map to something else to correctly access the fortunes. 
            console.log(` favoritesData: ${favoritesData}`)
            return(
              <View key={index} style={{padding:30}}>
                <Image source={fortuneBox} />
                <View style={{flexDirection:'row', position: 'absolute', bottom:500, right:0, alignItems:'center', padding:12}}>
                  <Text style={{color:'black', fontWeight:'bold', fontSize: 21, right: 75}}>{item.date}</Text>
                    <Image source={etcButton} style={{right:50}}/>
                </View>
                <View style={{position:'absolute', top:150, left: 60, width:'90%'}}>
                  <Text style={{fontSize:17}}>{item.fortune}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )

  // FIRESTORE not populating when mapped above. 
  async function getFavorites() {
    await db.collection('users').doc(firebase.auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        const userData = documentSnapshot.data();
        console.log(`Retrieved data: ${JSON.stringify(userData.favorites)}`)
        setFavoritesData(userData.favorites)
      })
      .catch(error => console.log(error))
  }
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



function SubscriptionScreen() {
  const navigation = useNavigation();

  // work with carlo on getting this working
  async function toCarlo() {
      const userId = db.collection('users').doc(firebase.auth().currentUser.uid)

      await firebase.auth().currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        fetch('https://firestore.googleapis.com/v1/projects/fortune-coffeee/databases/(default)/documents/users/' + userId)
      }).catch(function (error) {
        // Handle error
      });
    }

  return (
    <View style={styles.virtualContainer}>
      <ImageBackground source={subBackground} style={styles.virtualOne}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>navigation.popToTop()} style={styles.backButtonStyle}>
            <Image source={backButton} />
          </TouchableOpacity>
          <Image source={subscriptionDescription} style ={{marginTop:100}}/>

          <TouchableOpacity onPress={ () => Linking.openURL('http://payment-fortune-coffee.herokuapp.com/')}>
            <Image source={sub1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => Linking.openURL('http://payment-fortune-coffee.herokuapp.com/rose')}>
            <Image source={sub2}  />
          </TouchableOpacity >
          <TouchableOpacity onPress={ () => Linking.openURL('http://payment-fortune-coffee.herokuapp.com/tiger')}>
            <Image source={sub4} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => Linking.openURL('http://payment-fortune-coffee.herokuapp.com/sapphire')}>
 
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
        <TouchableOpacity onPress={()=>{navigation.popToTop()}}>
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
          <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.backButtonStyle} >
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
  setTimeout( () => { navigation.navigate('Reading') }, 15000);
  
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
        <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.backButtonStyle}>
          <Image source={backButton}/>
        </TouchableOpacity>
        <Image source={signTitle} style={{marginTop:'20%'}}/>
        <Image source={signUpBelowTitle} style={{marginBottom:12, marginTop:12}} />
        <View style={{marginTop:8, marginBottom:20}}>
          <TouchableOpacity onPress={() => console.log('google pressed')} style={{marginBottom:20}}>
            <Image source={googleTitle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('facebook pressed')}>
            <Image source={facebookTitle} />
          </TouchableOpacity>
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070631' }}>
      <View style={ styles.flexInRows}>
        <TouchableOpacity onPress={()=>navigation.popToTop()} style = {{top: 50, marginLeft: 10}}>
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
        <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.backButtonStyle}>
          <Image source={backButton}/>
        </TouchableOpacity>
        <Image source={signTitle}  style={{marginTop:'20%', marginBottom:40}}/>
        <View style={{marginTop:8, marginBottom:20}}>
          <TouchableOpacity onPress={() => console.log('google pressed')} style={{marginBottom:20}}>
            <Image source={googleTitle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('facebook pressed')}>
            <Image source={facebookTitle} />
          </TouchableOpacity>
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
  InteractionManager.runAfterInteractions(() => navigation.navigate("Reading"));

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
              <Image source={Next} />
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
          <Image source={Horoscopetxt} style={{ alignItems: 'center', marginTop: 18 }} />
  
      
            </View>
            </View>


     
    );
  }


//horoscope pisces

function Horoscopeunique({}) {
const navigation = useNavigation();
const [randomFortune, setRandomFortune] = useState('');
const [buttonClicked, setButtonClicked] = useState(false);
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
        <Image source={leftword} style={{ marginTop: 40 }} />
        <Image source={PiscesCard} style={{ marginLeft:30, marginTop: 18 }} />
        <Image source={rightword} style={{ marginTop: 40 }} />
        </View>
        <Image source={PiscesTxt} style={{ alignItems: 'center', marginTop: 18 }} />
    
        <Image source={linehors} style={{  marginTop: 10 }} />
        <Image source={hottxt} style={{ alignItems: 'center', marginTop: 30 }} />
        <View style={styles.readingTableContainer}>
            <ScrollView>
            <Text style={{fontSize:17, color:'white'}}> {randomFortune}  </Text>
          
            {!buttonClicked ? (
              <Button
                onPress={() => {
                  setRandomFortune(getRandomFortune)
                  setButtonClicked(true)
                }}
                title='View Horoscope of Today'
              >
              </Button>
            ) : null}
            
            </ScrollView>
          </View>


        <Image source={advicetxt} style={{ alignItems: 'center', marginTop: 60 }} />
        <View style={styles.readingTableContainer}>
            <ScrollView>
            <Text style={{fontSize:17, color:'white'}}> {randomFortune}  </Text>
          
            {!buttonClicked ? (
              <Button
                onPress={() => {
                  setRandomFortune(getRandomFortune)
                  setButtonClicked(true)
                }}
                title='View Advice of Today'
              >
              </Button>
            ) : null}
            
            </ScrollView>
          </View>

           </View>

        <NavBar />
      </View>
   
  );
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
          <TouchableOpacity onPress={() => navigation.popToTop()} >
            <Image source={backButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={userImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexInRowsCoffee}>
          <TouchableOpacity onPress={() => onSaveFortune()}>
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
  function onSaveFortune() {
    db.collection('users').doc(firebase.auth().currentUser.uid).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(...[randomFortune])
    })
    // navigation.navigate('Favorites')
  }
}

////////////////////
// Navigation Stack //
////////////////////
const Stack = createStackNavigator();

function App() {
  const forFade = ({ current }) => ({ cardStyle: { opacity: current.progress }});
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={HomeScreen} />
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
        <Stack.Screen name="PhotoReading" component={PhotoReadingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ReadingAnimation" component={ReadingAnimationScreen} />
        <Stack.Screen name="Reading" component={Reading} />
        <Stack.Screen name="ReadMore" component={ReadMore} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="Fortune" component={FortuneModal} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Horoscopeunique" component={Horoscopeunique} />
        <Stack.Screen name="Horoscopemain" component={Horoscopemain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
