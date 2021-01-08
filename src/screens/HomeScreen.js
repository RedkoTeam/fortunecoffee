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
import FlipCard from "react-native-flip-card";
import submodfo from "../../assets/submodfo.png";
import xButton from "../../assets/FortuneCoffeePNGassets/bi_x.png";
import getCrystals from "../../assets/FortuneCoffeePNGassets/getCrystals.png";
import FortuneCardCounter from "../../util/cardCounters/FortuneCardCounter";
import crystalBackground from "../../assets/FortuneCoffeePNGassets/crystalBackground.png";
import VirtualCoffee from "../../assets/FortuneCoffeePNGassets/HomePage/VirtualCoffee.png";
import TakePhoto from "../../assets/FortuneCoffeePNGassets/HomePage/TakePhoto.png";
import bgstars from "../../assets/Bgstar.png";
import Logoutbtn from "../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";
import SignUpButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import LargeTitleApp from "../../assets/FortuneCoffeePNGassets/HomePage/FortuneCoffeeTitle.png";
import PickCard from "../../assets/FortuneCoffeePNGassets/HomePage/PickCard.png";
import Cards from "../../assets/FortuneCoffeePNGassets/HomePage/allCards.png";
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


function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFortuneModalVisible, setFortuneModalVisible] = useState(false);
  const [front, setFront] = useState(dummyPath);
  const [meaning, setMeaning] = useState(dummyPath);
  const [boughtGems, setBoughtGems] = useState(false);

  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleFortuneModal = () =>{
    setFortuneModalVisible(!isFortuneModalVisible)
  }

  /// Modal Viewer based on date. 
  const [userCanViewCard, setUserCanViewCard] = useState(false);

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
            // update time remaining onto modal, must pass seconds ! .toHHMMSS = custom prototype
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
    const unsubscribe = navigation.addListener('focus', () => {
      _CheckOnboarding().then(r => console.log("Checked on Boarding"));
      // Checks the login upon opening App
      CheckLoginToken().then(async (result)=>{
        console.log("User TYPE  : " , result)
        // Navigate the user's based off of results
        // TODO, log the user in via firestore
        if(result === "USER"){
          console.log("THE USER IS A USER")
          // Login The user
          LoginChecker().then(async (results) =>{
            console.log("USER IS LOGGED IN : " , results)
            setIsLoggedIn(results)

            await DidUsersBuyGems();
          });
          
        }
        if(result === "GUEST"){
          LoginChecker().then((results) =>{
            console.log("USER IS LOGGED IN : " , results)
            setIsLoggedIn(results)
          });
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

  const toggleModal2 = () => {
    setModalVisible(!isModalVisible);
    let random = Math.floor((Math.random() * cardsAndMeaning.length));
    setFront(cardsAndMeaning[random][0]);
    setMeaning(cardsAndMeaning[random][1]);
  }

  const Render_CardModule = () =>{

    // TODO, give the real estamate time.
    // Result Returns, an object, i sent back the calculatorions. 

    // Just needs to show the time in 00:00 format. It's back in seconds. 
    return userCanViewCard ? (
        <>
          {/* Show module if user can view*/}
            <Modal isVisible={isModalVisible}>
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  alignSelf: 'center',}}>
                  <Text style={{color: '#FFF',fontSize: 40,  textAlign: 'center',    fontWeight: 'bold',   marginTop: 20
                    }}>Tap card to flip</Text>
                    <Button title="Hide Card" onPress={toggleModal} style={{marginTop: 20}} />
                    <FlipCard
                        flipHorizontal={true}
                        flipVertical={false}>
                        {/* <Text>The Face</Text> */}
                        <Image source={front} style={{height: heightPercentageToDP(75),}} />
                        {/* <Text>The Back</Text> */}
                        <Image source={meaning} style={{height: heightPercentageToDP(75)}} />
                    </FlipCard>
              </View>
            </Modal>
        </>
    ) : <>
      {/* What to show iff the user is over the max setting.*/}
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  alignSelf: 'center',}}>
              {/* IMAGE */}
            <Image source={submodfo} style={{ height: heightPercentageToDP('48'), width: widthPercentageToDP('86'),
              resizeMode: 'stretch', borderRadius:36}} />
            {/* X */}
            <TouchableOpacity style={{position: 'absolute', zIndex: 20, top: heightPercentageToDP(25), right: 25}} onPress={()=>{
                  toggleModal();
              }}>
                <Image source={xButton} style={{width: widthPercentageToDP(3), height: heightPercentageToDP(3)  }} />
            </TouchableOpacity>
              {/* GET CRYTSTALS */}
            <TouchableOpacity style={{  zIndex: 20, position:'absolute', top: heightPercentageToDP(58)}} onPress={() => {
              console.log("Going to subscription screen, saving previous values");
              SetPreviousData();
            }} >
              <Image source={getCrystals} style={{marginBottom: 20}}/>
            </TouchableOpacity>
        </View>
      </Modal>
    </>;
  }

  const CheckFortuneCountCoffeeReading = () =>{
    // navigation.navigate('VirtualOne')
    FortuneCardCounter().then((result)=>{
      console.log("THe user can go to next screen : ", result)
      if(result){
        // Continue to virtual Coffee Reading.
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
          <Modal isVisible={isFortuneModalVisible}>
            
            <View style={{flex:1, alignItems: 'center',justifyContent: 'center', alignSelf:'center'}}>
              {/* IMAGE BACKGROUND */}
              <Image source={crystalBackground} style={{height: heightPercentageToDP('48'), width: widthPercentageToDP('86'), resizeMode: 'stretch', borderRadius:36}} />
              {/* X BUTTON */}
              <TouchableOpacity style={{
                position: 'absolute', zIndex: 20, 
                top: heightPercentageToDP(25), right: 25
              }} onPress={()=>{
                toggleFortuneModal();
              }}>
                <Image source={xButton} style={{width :widthPercentageToDP(3), height: heightPercentageToDP(3)}} />
              </TouchableOpacity>

              {/* GET CRYSTALS BUTTON */}
              <TouchableOpacity style={{  zIndex: 20, position:'absolute', top: heightPercentageToDP(58)}} onPress={() => {
                console.log("Going to subscription screen, saving previous values");
                toggleFortuneModal();

                SetPreviousData();
               
            }} >
              <Image source={getCrystals} style={{marginBottom: 20}}/>
            </TouchableOpacity>


            </View>
          </Modal>
          

          {/*<Button title="Reset Crystals" onPress={ () => { console.log("Async Storage Cleared"); AsyncStorage.clear();}}></Button> */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity 
            onPress={() => {
              CheckFortuneCountCoffeeReading()
            }}>
              {/* virtual Coffee Reading */}
              <Image source={VirtualCoffee} style={{resizeMode: 'stretch', marginRight:35}}   />
            </TouchableOpacity>
            {/* Take a photo for reading */}
            <TouchableOpacity 
            onPress={() => {
              CheckFortuneCountPhoto()
            }}>
              <Image source={TakePhoto}  style={{resizeMode: 'stretch'}}  />
            </TouchableOpacity>
          </View>
        </>
    )
  }


  // This handles the checkign if the user has gotten new gems or not.
  const SetPreviousData = async () =>{
    let _isLoggedIn = await LoginChecker();
    let _dbRef;
    let _totalFortunes;

    if(_isLoggedIn){
      console.log("Using data from logged in users")
      _dbRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      _totalFortunes = await (await _dbRef.get()).data().totalFortunes;

      let oldFortuneData = await GetItemInStorage("PREVIOUS_FORTUNE_COUNT")
      if(!oldFortuneData){
        await SaveItemInStorage("PREVIOUS_FORTUNE_COUNT", "0")
        oldFortuneData = await GetItemInStorage("PREVIOUS_FORTUNE_COUNT")
      }

      console.log("OLD FORTUNE DATA : ", oldFortuneData)

      await SaveItemInStorage("OLD_FORTUNE_COUNT", _totalFortunes.toString())
      console.log("Setting previous fortune data : ", _totalFortunes)
      toggleModal();
      navigation.navigate('SubscriptionScreen');

    }else{
      console.log("User isnt logged in!")
      toggleModal();
      navigation.navigate('SubscriptionScreen');
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

      let oldFortuneData = await GetItemInStorage("PREVIOUS_FORTUNE_COUNT")
      let parsedOld = parseInt(oldFortuneData);
      if(parsedOld < _totalFortunes && parsedOld !== 0 ){
        console.log("The user bought gems!");
        console.log(_totalFortunes)
        await SaveItemInStorage("PREVIOUS_FORTUNE_COUNT", _totalFortunes.toString())
        setBoughtGems(true)
        // Show the screen
      }else{
        console.log("The user didn't buy gems!")
        await SaveItemInStorage("PREVIOUS_FORTUNE_COUNT", _totalFortunes.toString())
      }
    }else{
      console.log("User isnt logged in, will not check for previous bought gems")
    }

  }
  
  

  return (
      <View style={{flex: 1}}>
        <Modal isVisible={boughtGems} style={{}}>
          <ImageBackground source={gemsbg} style={{flex: 1}}>
                  <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginBottom:"50%" }}>
                      <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                          <TouchableOpacity onPress={()=>{ setBoughtGems(false)}}>
                              <Image source={backButton} style={styles.backButtonStyle}/>
                          </TouchableOpacity>
                      </View>
                  </View>
          </ImageBackground>
        </Modal>
        <Modal isVisible={isModalVisible} style={{}}>
              {Render_CardModule()}
        </Modal>
        <ImageBackground source={bgstars} style={styles.bgfull}>
            {isLoggedIn ? (
                <View style={{ flex: 0.03, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: heightPercentageToDP('3') }}>
                  <TouchableOpacity onPress={ () => {
                    LogOutUser();
                    setIsLoggedIn(false);
                  }}>
                    <Image source={Logoutbtn} />
                  </TouchableOpacity>
                </View>
                ) :
                <View style={{  flex: 0.03, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
              <Image source={LargeTitleApp} style={{resizeMode: 'stretch', width: widthPercentageToDP('80'), height: heightPercentageToDP('7.5')}}/>
              {RenderTheFortuneButtons()}

              {/* <Button title="credits" onPress={() => navigation.navigate('Credits')} /> */}
              <Image source={PickCard} style={{ marginTop:widthPercentageToDP(15), margin: 8 }} />
              {/* Pick a card  */}
              <TouchableOpacity onPress={toggleModal2} style={styles.cards}>
                <Image source={Cards} style={{resizeMode: 'stretch', width: widthPercentageToDP('95')}}/>
              </TouchableOpacity>
             
            </View>
            
            <NavBar />

        </ImageBackground>
      </View>
  );
}



export default HomeScreen