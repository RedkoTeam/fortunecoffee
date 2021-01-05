import React, {useEffect, useState} from "react";
import dummyPath from "../../assets/pencil.png";
import RegularCardCounter from "../../util/cardCounters/RegularCardCounter";
import CheckLoginToken from "../../util/validators/CheckLoginToken";
import LoginChecker from "../../util/validators/LoginChecker";
import RetrieveData from "../../util/GetItemInStorage";
import StoreData from "../../util/SaveItemInStorage";
import {cardsAndMeaning} from "../arrays/fortunesCardArray";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Image, ImageBackground, Text, View} from "react-native";
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
import LogOutUser from "../../util/LogOutUser";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';



function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFortuneModalVisible, setFortuneModalVisible] = useState(false);
  const [front, setFront] = useState(dummyPath);
  const [meaning, setMeaning] = useState(dummyPath);

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
            console.log("Time Remaining in seconds : ", result.timeRemaining)
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
          LoginChecker().then((results) =>{
            console.log("USER IS LOGGED IN : " , results)
            setIsLoggedIn(results)
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
              toggleModal();
              navigation.navigate('SubscriptionScreen');
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
          <Modal isVisible={isFortuneModalVisible} style={{ alignItems: "center", flex: 1,  }}>
            <View style={{alignItems: 'center',justifyContent: 'center',}}>

              {/* IMAGE BACKGROUND */}
              <Image source={crystalBackground} style={{alignItems:'center', width: widthPercentageToDP('50%')}} />
              {/* X BUTTON */}
              <TouchableOpacity style={{
                flexDirection: 'row',
                top: 10,
                right: 15
              }} onPress={()=>{
                toggleFortuneModal();
              }}>
                <Image source={xButton} style={{width :widthPercentageToDP('19')}} />
              </TouchableOpacity>

              {/* GET CRYSTALS BUTTON */}
              <TouchableOpacity onPress={() => {
                toggleFortuneModal();
                navigation.navigate('SubscriptionScreen');
              }} style={{width: widthPercentageToDP('40%'), height: heightPercentageToDP('20%')}}>
                <Image style={{ width: widthPercentageToDP('40%'), height: heightPercentageToDP('20%')}}source={getCrystals}/>
              </TouchableOpacity>


            </View>
          </Modal>

          <Button title="Reset Crystals" onPress={ () => { console.log("Async Storage Cleared"); AsyncStorage.clear();}}></Button>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginHorizontal: 10 }}>
            <TouchableOpacity 
            onPress={() => {
              CheckFortuneCountCoffeeReading()
            }}>
              {/* virtual Coffee Reading */}
              <Image source={VirtualCoffee} style={{resizeMode: 'stretch'}}   />
            </TouchableOpacity>
            {/* Take a photo for reading */}
            <TouchableOpacity 
            onPress={() => {
              CheckFortuneCountPhoto()
            }}>
              <Image source={TakePhoto}  style={{resizeMode: 'stretch',}}  />
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