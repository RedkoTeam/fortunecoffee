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
import LargeTitleApp from "../../assets/FortuneCoffeePNGassets/HomePage/FortuneCoffeeTitle.png";
import PickCard from "../../assets/FortuneCoffeePNGassets/HomePage/PickCard.png";
import Cards from "../../assets/FortuneCoffeePNGassets/HomePage/allCards.png";
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
      <View style={{flex:1, alignItems: 'center',justifyContent: 'center', alignSelf:'center'}}>
              {/* IMAGE BACKGROUND CARDS*/}
              <Image source={submodfo} style={{resizeMode:'contain', height: heightPercentageToDP('58'), width: widthPercentageToDP('86'), borderRadius:36}} />
              {/* X BUTTON */}
            <TouchableOpacity style={{position: 'absolute', zIndex: 20, top: heightPercentageToDP(25), right: '5%'}} onPress={()=>{
                  toggleModal();
              }}>
                <Image source={xButton} style={{width: widthPercentageToDP(2), height: heightPercentageToDP(3),marginLeft:heightPercentageToDP(-9),marginTop:heightPercentageToDP(-5)}} />
            </TouchableOpacity>
              {/* GET CRYTSTALS */}
              <TouchableOpacity style={{  resizeMode:'contain', zIndex: 20, position:'absolute', top: heightPercentageToDP(50)}} onPress={() => {
                console.log("Going to subscription screen, saving previous values");
              //SetPreviousData();
                toggleModal();
                navigation.navigate('SubscriptionScreen');

            }} >
<Image source={getCrystals} style={{width :widthPercentageToDP(60), height: heightPercentageToDP(20),resizeMode:'contain'}}/>
            </TouchableOpacity> 

            {/*edit*/}
        </View>
      </Modal>
    </>;
  }

  const CheckFortuneCountCoffeeReading = () =>{
    // navigation.navigate('VirtualOne')
    FortuneCardCounter().then((result)=>{
      console.log("THe user can go to next screen : ", result)
      if(result.userCanView){
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
      if(result.userCanView){
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
              <Image source={submodfo} style={{resizeMode:'contain', height: heightPercentageToDP('58'), width: widthPercentageToDP('86'), borderRadius:36}} />
              {/* X BUTTON */}
              <TouchableOpacity style={{
                position: 'absolute', zIndex: 20, 
                top: heightPercentageToDP(25), right: "5%"
              }} onPress={()=>{
                toggleFortuneModal();
              }}>
                <Image source={xButton} style={{resizeMode:'contain',width :widthPercentageToDP(6), height: heightPercentageToDP(5)}} />
              </TouchableOpacity>

              {/* GET CRYSTALS BUTTON */}
              <TouchableOpacity style={{  resizeMode:'contain', zIndex: 20, position:'absolute', top: heightPercentageToDP(50)}} onPress={() => {
                console.log("Going to subscription screen, saving previous values");
                toggleFortuneModal();
                 navigation.navigate('SubscriptionScreen');
                //SetPreviousData();
            }} >
              <Image source={getCrystals} style={{width :widthPercentageToDP(60), height: heightPercentageToDP(20),resizeMode:'contain'}}/>
            </TouchableOpacity>
            </View>
          </Modal>
          {/*<Button title="Reset Crystals" onPress={ () => { console.log("Async Storage Cleared"); AsyncStorage.clear();}}></Button> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginTop:'5%' }}>
            <TouchableOpacity 
            onPress={() => {
              CheckFortuneCountCoffeeReading()
            }}>
              {/* virtual Coffee Reading */}
              <Image source={VirtualCoffee} style={{resizeMode: 'contain', marginRight:35,width: widthPercentageToDP(30),height: heightPercentageToDP(20)}}   />
            </TouchableOpacity>
            {/* Take a photo for reading */}
            <TouchableOpacity 
            onPress={() => {
              CheckFortuneCountPhoto()
            }}>
              <Image source={TakePhoto}  style={{resizeMode: 'contain',width: widthPercentageToDP(30),height: heightPercentageToDP(20)}}  />
            </TouchableOpacity>
            
          </View>
        </>
    )
  }


  return (
      <View style={{flex: 1}}>
        <Modal isVisible={isModalVisible} style={{}}>
              {Render_CardModule()}
        </Modal>
        <ImageBackground source={bgstars} style={styles.bgfull}>
            {isLoggedIn ? (
                <View style={{ flex: 0.03, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: heightPercentageToDP('3') }}>
                  <TouchableOpacity onPress={ async () => {
                    await LogOutUser();
                    setIsLoggedIn(false);
                  }}>
                    <Image source={Logoutbtn} style={{resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(5)}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>
                    <Image source={gtcr} style={{resizeMode: 'contain',width: widthPercentageToDP(15),height: heightPercentageToDP(8)}} />
                  </TouchableOpacity>
                </View>
                ) :
                <View style={{  flex: 0.03, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Image source={SignUpButton} style={{resizeMode: 'contain',width: widthPercentageToDP(30),height: heightPercentageToDP(7)}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>
                    <Image source={gtcr} style={{resizeMode: 'contain',width: widthPercentageToDP(15),height: heightPercentageToDP(8)}}/>
                  </TouchableOpacity>
                </View>
            }
            <View style={{ flex: 1, alignItems: 'center' }}>
              {/* <Button title="Clear Async" onPress={ () => { console.log("Async Storage Cleared"); AsyncStorage.clear();}}></Button>
          <Button title="Sign out" onPress={ () => { console.log("User Sign Out"); firebase.auth().signOut()}}></Button> */}
              <Image source={LargeTitleApp} style={{ marginTop:'5%',width: widthPercentageToDP('80'), height: heightPercentageToDP('7.5')}}/>
              {RenderTheFortuneButtons()}

              {/* <Button title="credits" onPress={() => navigation.navigate('Credits')} /> */}
              <Image source={PickCard} style={{ marginTop:widthPercentageToDP(15), margin: 8 }} />
              {/* Pick a card  */}
              <TouchableOpacity onPress={toggleModal2} style={styles.cards}>
                <Image source={Cards} style={{resizeMode: 'contain', width: widthPercentageToDP(95),height: heightPercentageToDP(35)}}/>
              </TouchableOpacity>
             
            </View>
            
            <NavBar />

        </ImageBackground>
      </View>
  );
}



export default HomeScreen