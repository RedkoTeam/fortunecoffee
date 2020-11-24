
import React, { useRef, useEffect, useState, Componenet } from 'react';

import './fixtimerbug';

import { Modal, Button, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, ImageBackground, StyleSheet, FlatList, ScrollView, SafeAreaView, StatusBar , Animated, Easing, InteractionManager } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import firebase from './components/firebase'

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

// error 
// firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
////////////////////
// IMAGES & ICONS //
////////////////////

//HOMEPAGE//
import TakePhoto from './assets/FortuneCoffeePNGassets/TakePhoto.png';
import Home from './assets/FortuneCoffeePNGassets/homeBoth.png';
import Shop from './assets/FortuneCoffeePNGassets/shopBoth.png';
import Favorites from './assets/FortuneCoffeePNGassets/favoritesBoth.png';

import VirtualCoffee from './assets/FortuneCoffeePNGassets/VirtualCoffee.png';
import SignInButton from './assets/FortuneCoffeePNGassets/SignInButton.png';
import SignUpButton from './assets/FortuneCoffeePNGassets/SignUpButton.png';
import LargeTitleApp from './assets/FortuneCoffeePNGassets/LargeTitleApp.png';
import PickCard from './assets/FortuneCoffeePNGassets/PickCard.png';
import Cards from './assets/FortuneCoffeePNGassets/allCards.png';
import Ellipse1 from './assets/FortuneCoffeePNGassets/ellipse.png';

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

// LOGIN PAGE //
import facebookTitle from './assets/FortuneCoffeePNGassets/ContinueFacebook.png';
import googleTitle from './assets/FortuneCoffeePNGassets/ContinueGoogle.png';
import login from './assets/FortuneCoffeePNGassets/LogInButton.png';
import backgroundPicture from './assets/FortuneCoffeePNGassets/backgroundPicture.png'
// SIGNUP PAGE //
import signin from './assets/FortuneCoffeePNGassets/signin.png';
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
import user from './assets/FortuneCoffeePNGassets/reading/user.png';
import whatHappen from './assets/FortuneCoffeePNGassets/reading/whatHappen.png';
import yourPresent from './assets/FortuneCoffeePNGassets/reading/yourPresent.png';

// SUBSCRIPTION PAGE //
import sub1 from './assets/FortuneCoffeePNGassets/subscription1.png';
import sub2 from './assets/FortuneCoffeePNGassets/subscription2.png';
import sub3 from './assets/FortuneCoffeePNGassets/subscription3.png';
import sub4 from './assets/FortuneCoffeePNGassets/subscription4.png';
import subscriptionDescription from './assets/FortuneCoffeePNGassets/subscriptionDescription.png';
import subBackgorund1 from './assets/FortuneCoffeePNGassets/Vector.png';
import subBackgorund2 from './assets/FortuneCoffeePNGassets/Vector-3.png';

// Fortune Page //
//import Modal from 'react-native-modal';
import FlipCard from 'react-native-flip-card';
import card from './assets/FortuneCoffeePNGassets/MiddleCard-1.png';
import card2 from './assets/FortuneCoffeePNGassets/MiddleCard-2.png';
// GET CRYSTAL PAGE //
import crystalBackground from './assets/FortuneCoffeePNGassets/crystalBackground.png';
import getCrystals from './assets/FortuneCoffeePNGassets/getCrystals.png';
import xButton from './assets/FortuneCoffeePNGassets/bi_x.png';

//TAKE PHOTO //
'use strict';
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

////////////////////
// Styling  //
////////////////////
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#070631',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#070631',
  },
  authContainer: {
    flex: .25,
    flexDirection: 'row',
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
    fontWeight: 'bold'
  },
  cardStyle: {
    width: 250,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 60
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
  cardTitle: {
    paddingTop: 15,
  },
  circleContainer: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  circleL: {
    left: 145
  },
  circleR: {
    right: 145
  },
  cards: {
    paddingTop: 10,
    bottom: -20,
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
  logoContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 160,
    height: 130,
  },
  buttonImage: {
    width: 360,
    height: 38,
    paddingBottom: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40
  },
  getCrystalImage: {
    width: 300,
    height: 38,
    paddingBottom: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 290
  },
  instructions: {
    color: '#888',
    fontSize: 18,
  },
  title: {
    color: '#FFF',
    fontSize: 40,
    textAlign: 'center'
  },
  login: {
    color: '#1E90FF',
    fontSize: 20,
    marginTop: 10
  },
  underTitle: {
    color: '#0080ff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  underSignup: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
  },
  underFacebook: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
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
    marginTop: 7
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  textBox: {
    margin: 15,
    height: 60,
    width: 360,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 40
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 2
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
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    paddingTop: '10%',
    padding: 12,
  },
  flexInRowsCoffee: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'100%',
    alignItems:'flex-end',
  },
  readingTableContainer: {
    flex: 1, 
    width:'100%',
    alignItems:'stretch',
    padding: 20
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
  subButton1: {
    width: 390,
    height: 110,
    borderRadius: 30,
    marginHorizontal: 1,
    marginTop: 30
  },
  subButton2: {
    width: 390,
    height: 110,
  },
  ellipse3: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    marginBottom: 20
  },
  ellipse4: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    marginBottom: 20
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
  textBox2: {
    margin: 15,
    height: 60,
    width: 70,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 40
  },
  textBox3: {
    margin: 15,
    height: 60,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 40
  },
  savedFortuneTextBox: {
    height: 60,
    width: 360,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  savedFortuneTextBox2: {
    height: 60,
    width: 70,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  savedFortuneTextBox3: {
    height: 60,
    width: 90,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginRight: 130
  },
});

////////////////////
// Helper Functions //
////////////////////

// logic for checking if user is logged in for main screen
checkIfLoggedIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      this.props.navigation.navigate('Dashboard');
    } else {
      this.props.navigation.navigate('SignIn')
    }
  })
}

////////////////////
// Screen Layouts //
////////////////////

// Completed and Ready for code review
//ReadingAnimation back to PhotoReading 
function HomeScreen({navigation}) {

  // const [isModalVisible, setModalVisible] = useState(false);
  // const toggleModal = () => { 
  //   setModalVisible(!isModalVisible);
  // };
  // state = {
  //   open: true,
  //   open2: true,
  // };
  // toggleImage = () => {
  //   this.setState(state => ({ open: !state.open}))
  // }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.authContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.authButton1}>
          <Image source={SignUpButton}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.authButton2}>
          <Image source={SignInButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.appTitle}>
        <Image source={LargeTitleApp} />
      </View>
      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimation')}> 
          <Image source={TakePhoto} style={styles.circleL} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')}>
          <Image source={VirtualCoffee} style={styles.circleR}/>
        </TouchableOpacity>
      </View>
      <View style={styles.cardTitle}>
        <Image source={PickCard} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Virtual')} style={styles.cards}>
        <Image source={Cards} />
      </TouchableOpacity>
      <View>
      {/* <Button title="Show modal" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
          <View style = {styles.modalStyle}>
            <Text style = {styles.tapCard}>Tap card to flip</Text>
            <Button title="Hide modal" onPress={toggleModal} />
            <View style={{marginBottom:500}}>
              <FlipCard
                flipHorizontal={true}
                flipVertical={false}>
                <View style={styles.face, {marginBottom: 400}}>
                  <Text>The Face</Text>
                  <Image source={card} style={styles.cardStyle} />
                </View>
                <View>
                  <Text>The Back</Text>
                  <Image source={card} style={styles.cardStyle} />
                </View>
              </FlipCard>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <TouchableOpacity onPress={toggleModal} style={styles.cards}>
          <Image source={Cards} />
          <Modal isVisible={isModalVisible}>
            <View style = {styles.modalStyle}>
              <ImageBackground source={crystalBackground} style={styles.crystalBackground}>
                <View style={styles.getCrystalContainer}>
                  <TouchableOpacity onPress={toggleModal}>
                    <Image source={xButton} style={styles.xbutton} />
                  </TouchableOpacity>
                  <TouchableOpacity onPressIn={toggleModal} onPress={() => navigation.navigate('Subscription')}>
                    <Image source={getCrystals} style={styles.getCrystalImage} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </TouchableOpacity> */}
      </View>
      <NavBar />
      </View>
  );
}

function HomeScreenLoggedIn({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.appTitle}>
        <Image source={LargeTitleApp} />
      </View>
      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimation')}>
          <Image source={TakePhoto} style={styles.circleL} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')}>
          <Image source={VirtualCoffee} style={styles.circleR} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardTitle}>
        <Image source={PickCard} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Virtual')} style={styles.cards}>
        <Image source={Cards} />
      </TouchableOpacity>
      <NavBar />
    </View>
  );
}





function NavBar(){
  const navigation = useNavigation();
  return(
    <View style={{flex:1, alignItems:'center', alignContent:'center'}}>
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

function FavoritesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Favorites Screen</Text>
    </View>
  )
}

let ShopDatabase = [
  {
    name: 'OriginalCoffee',
    img: originalPhoto,
    buyButton: originalBuyButton 
  },
  {
    name: 'CoconutCoffee',
    img: coconutPhoto,
    buyButton: coconutButton
  },
  {
    name: 'StrawberryCoffee',
    img: strawberryPhoto,
    buyButton: strawberryButton
  },
  {
    name: 'HazelnutCoffee',
    img: hazelnutPhoto,
    buyButton: hazelnutButton
  },
  {
    name: 'CoffeeCaramel',
    img: coffeeCaramelPhoto,
    buyButton: coffeeCaramelButton
  },
  {
    name: 'CoffeeChocolate',
    img: coffeeChocolatePhoto,
    buyButton: coffeeChocolateButton
  }
]

function SubscriptionScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      {/*<ImageBackground source={subBackgorund1} style={styles.subBackgroundImage}>*/}
        <Image source={subscriptionDescription} style={{marginTop: 60}}/>
        <TouchableOpacity>
          <Image source={sub1} style={styles.subButton1}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={sub2} style={styles.subButton2} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={sub3} style={styles.subButton2}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={sub4} style={styles.subButton2}/>
        </TouchableOpacity>
        <Image source={Ellipse1} style={styles.ellipse3} />
        {/* <Image source={Ellipse2} style={styles.ellipse4} /> */}
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{bottom: -94, left:-130}}>
          <Image source={Favorites} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{top: -20, left: -0}}>
          <Image source={Home} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={{top: -20,right: -130}}>
          <Image source={Shop} />
        </TouchableOpacity>
      {/*</ImageBackground>*/}
    </View>
  )
}

// Mostly done. Still need back button and add onPress with href to shopify site
function ShopScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.shopContainer}>
      <Image source={ galaxy } style={{position:'absolute', width:'100%', height:'100%'}} />
      <View style={ styles.flexInRows }>
        <TouchableOpacity onPress={()=>navigation.popToTop()} >
          <Image source={backButton} />
        </TouchableOpacity>
        <Image source={shop} style={{ position:'absolute', alignSelf:'center', right:'47%', bottom:'5%'}} />
      </View>
      {
        ShopDatabase.map((item, index) =>{
          return(
            <View key={index} style={{padding:30}}>
              <Image source={item.img} style={styles.coffeeImageDimension} />
              <TouchableOpacity onPress={()=>{console.log(item.name)}}>
               <Image source={item.buyButton} style={styles.coffeeBuyButton} />
              </TouchableOpacity>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

function VirtualCoffeeReadingScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070631' }}>
        <View style={styles.authContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={backButton} style={{marginRight: 160}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={useAVirtualCoffee} style={{marginTop:13}}/>
          </TouchableOpacity>
        </View>
      {/*<RNCamera ref={ref => {this.camera = ref;}} style={{flex: 1, width: '100%'}}>
      </RNCamera>
      */}
      <Image source={virtualImage} />
      <TouchableOpacity>
        <Image source={submitPhoto} style={{marginTop:30}}/>
      </TouchableOpacity>
      <TouchableOpacity>
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
        <TouchableOpacity onPress={ () => navigation.navigate('VirtualFive')}>
          <Image source={ coffee_v } />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

function VirtualFive(){
  const navigation = useNavigation();
  return(
    <View style={styles.virtualContainer}>
      <ImageBackground source={backgroundFive} style={ styles.virtualOne }>
        <Image source={ pysicReadingText } style={{ margin: '40%'}}/>
        <Image source={ dontWantToWaitText } style={{ marginBottom:10 }} />
        <TouchableOpacity onPress={ () => navigation.navigate('GetCrystals')}>
          <Image source={ getCrystalsButton } />
        </TouchableOpacity>
        <NavBar/>
      </ImageBackground>
    </View>
  )

}



function GetCrystals(){
  return(
    <View style={styles.virtualContainer}>
      <Text> get crystals Page</Text>
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
    <View style={styles.container}>
      <ImageBackground source={backgroundPicture} style={styles.backgroundImage}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={backButton} style={{marginLeft: 50, marginBottom: 10}}/>
        </TouchableOpacity>
        <Text style={styles.title}>
          fortune coffee
        </Text>
        <Text style={styles.underTitle}>
          We see many fortunes in your near future.
        </Text>
        <TouchableOpacity onPress={() => console.log('google pressed')}>
          <Image source={googleTitle} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text>
        </Text>
        <TouchableOpacity onPress={() => console.log('facebook pressed')}>
          <Image source={facebookTitle} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.underFacebook}>
          OR SIGN UP WITH EMAIL
        </Text>

        <TextInput style={styles.textBox}
          label="Email"
          placeholder="   Email address"
          placeholderTextColor='#DCDCDC'
          onChangeText={email => setEmail(email)}
        />
        <TextInput style={styles.textBox}
          label="Password"
          placeholder="    Password"
          placeholderTextColor='#DCDCDC'
          onChangeText={password => setPassword(password)}
        />
        <TextInput style={styles.textBox}
          label="Re-enter Password"
          placeholder="    Re-enter Password"
          placeholderTextColor='#DCDCDC'
        />
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => { SignUp(email, password), navigation.navigate('HomeLoggedIn')} }>
          <Image source={signin} style={styles.buttonImage}  />
  
        </TouchableOpacity>
        <Text style={styles.underSignup}>
          Already have an account?
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </Text>
      </ImageBackground>
    </View>
  )

}

function SavedFortunes() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070631' }}>
      <View style={styles.authContainer}>
        <TouchableOpacity>
          <Image source={backButton} style={{marginRight: 200}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Image source={SignInButton} style={{marginTop:13}}/>
        </TouchableOpacity>
      </View>
      <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 230, marginTop: 20}}>SavedFortunes</Text>
      <TextInput style={styles.savedFortuneTextBox}
          label="Name"
          placeholder="                                   Enter name here"
          placeholderTextColor='#DCDCDC'
      />
      <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 190, marginTop: 20}}>Relationship Status</Text>
      <TextInput style={styles.savedFortuneTextBox}
          label="Relationship Status"
          placeholder="                       Enter relationship status here"
          placeholderTextColor='#DCDCDC'
      />
      <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 110, marginTop: 20}}>Enter employment status here</Text>
      <TextInput style={styles.savedFortuneTextBox}
          label="EmploymentStatus"
          placeholder="                   Enter employment status here"
          placeholderTextColor='#DCDCDC'
      />
      <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 110, marginTop: 20}}>Enter employment status here</Text>
      <TextInput style={styles.savedFortuneTextBox}
          label="Gender"
          placeholder="                       Enter gender here"
          placeholderTextColor='#DCDCDC'
      />
      <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 280, marginTop: 20}}>Birthday</Text>
      <View style={styles.authContainer}>
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

      <TouchableOpacity onPress={() => console.log('log in pressed')}>
      <Image source={continueImage} style={{marginTop: 0}}/>
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity onPress={() => console.log('log in pressed')}>
      <Image source={skipImage} />
      </TouchableOpacity>
    </View>
  )
  // async function SignUp() {
  //   try {
  //     await firebase.auth().createUserWithEmailAndPassword(email, password)
  //       .then(user => {
  //         console.log(user)

  
  // working for config.js
  function SignUp() {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
          return db.collection('users').doc(data.user.uid).set({
            userName: email,
          })
            .catch(error => console.log(error))

        })
  }
}

// function SignInScreen({ navigation }) {

// TODO need to hook this up to a button after signed in

  function Profile({ navigation }) {
  return (
    <ImageBackground source={profile_bg} style={styles.subBackgroundImage}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.authContainer}>
          <TouchableOpacity style={styles.authButton1}>
            <Image source={backButton} style={{marginRight: 80}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton2}>
            <Image source={pageButton} />
          </TouchableOpacity>
        </View>
        <Text style={{marginBottom: 30}}></Text>
        <Image source={profileImage} />
        <Input placeholder="Name" >
        {/*<Image source={pencil} />*/}
        </Input>  
        <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 300}}>Username</Text>
        <Input placeholder="Username" >
        </Input>
        <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 300}}>First name</Text>
        <Input placeholder="First name" >
        </Input> 
        <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 300}}>Last Name</Text>
        <Input placeholder="Last Name" >
        </Input>  
        <Text style={{color: '#FFFFFF', fontSize: 18, marginRight: 285}}>Date of Birth</Text>
        <Input placeholder="Date of Birth" >
        </Input>  
        <Image source={Ellipse1} style={styles.ellipse1} />
        {/* <Image source={Ellipse2} style={styles.ellipse2} /> */}
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{bottom:-175,left: -130}}>
          <Image source={Favorites} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{top: 60,left: -0}}>
          <Image source={Home} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={{top: 60,right: -130}}>
          <Image source={Shop} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

function SignInScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundPicture} style={styles.backgroundImage}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={backButton} style={{marginLeft: 50, marginBottom: 10}}/>
        </TouchableOpacity>
        <Text style={styles.title}>
          fortune coffee
        </Text>
        <Text style={styles.underTitle}>
        </Text>
        <TouchableOpacity onPress={() => console.log('google pressed')}>
          <Image source={googleTitle} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text>
        </Text>
        <TouchableOpacity onPress={() => console.log('facebook pressed')}>
          <Image source={facebookTitle} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.underFacebook}>
          OR LOG IN WITH EMAIL
        </Text>
        <TextInput style={styles.textBox}
          label="Email"
          placeholder="   Email address"
          placeholderTextColor='#DCDCDC'
          onChangeText={email => setEmail(email)}
        />
        <TextInput style={styles.textBox}
          label="Password"
          placeholder="    Password"
          placeholderTextColor='#DCDCDC'
          onChangeText={password => setPassword(password)}
        />
        <Text>
        </Text>
        <StatusBar style="auto" />

        <TouchableOpacity onPress={() => { onLogin(email, password) } }>

          <Image source={login} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.underSignup}>
          Forgot Password?{"\n"}
          Create a new
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.login}> account</Text>
          </TouchableOpacity>
        </Text>
        <Text style={{marginBottom: 100}}></Text>
      </ImageBackground>

    </View>
  )
  function onLogin () {
    firebase.auth().signInWithEmailAndPassword(email, password)
    navigation.navigate('HomeLoggedIn')
  }
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

function Reading(){
  const navigation = useNavigation();
  var userName = 'user';
  return(
    <View style={styles.virtualContainer}>
      <ImageBackground source={ readingBackground } style={styles.virtualOne}>
        <View style={styles.flexInRows}>
          <TouchableOpacity onPress={()=>navigation.popToTop()}>
            <Image source={ backButton } />
          </TouchableOpacity>
          <Image source={ user } />
        </View>
        <View style={styles.flexInRowsCoffee}>
          <TouchableOpacity onPress={()=> console.log("SAVED")}>
            <Image source={ saveButton } />
          </TouchableOpacity>
          <View>
            <Text style={styles.helloUserTextContainer}> Hello {userName} </Text>
            <Image source={ coffeeImg } style={{marginTop:20}}/>
          </View>
          <TouchableOpacity onPress={ () => console.log("SHARE")}>
            <Image source={ shareButton } style={{alignSelf:'flex-end'}}/>
          </TouchableOpacity>
        </View>
        <View style={ styles.readingTableContainer }>
          <Image source={ yourPresent } style={{marginBottom:12}}/>
          <ScrollView>
            <Text> TABLE TO BE ATTACHED  </Text>
          </ScrollView>
        </View>
        <View style={ styles.readingTableContainer }>
          <Image source= { whatHappen } />
          <ScrollView>
            <Text> TABLE TO BE ATTACHED  </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  )
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HomeLoggedIn" component={HomeScreenLoggedIn} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Virtual" component={VirtualCoffeeReadingScreen} />
        <Stack.Screen name="VirtualOne" component={VirtualOne} options={{ cardStyleInterpolator:forFade}} />
        <Stack.Screen name="VirtualTwo" component={VirtualTwo} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualThree" component={VirtualThree} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualFour" component={VirtualFour} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualFive" component={VirtualFive} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="GetCrystals" component={GetCrystals} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualLoading" component={VirtualLoadingScreen} />
        <Stack.Screen name="PhotoReading" component={PhotoReadingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ReadingAnimation" component={ReadingAnimationScreen} />
        <Stack.Screen name="Reading" component={Reading} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="Fortune" component={FortuneModal} />
        <Stack.Screen name="SavedFortunes" component={SavedFortunes} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;