'use strict';
import React from 'react';
import './fixtimerbug';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

import HomeScreen from './src/screens/HomeScreen'
import FavoritesScreen from './src/screens/FavoritesScreen'
import ReadMore from './src/screens/ReadMore'
import Payment from './src/screens/Payment'
import SubscriptionScreen from './src/screens/SubscriptionScreen'
import ShopScreen from './src/screens/ShopScreen'
import FortuneModal from './src/screens/FortuneModal'
import Psychic from './src/screens/Psychic'
import Manifest from './src/screens/Manifest'
import SendingUni2 from './src/screens/SendingUni2'
import SomeoneFortune1 from './src/screens/SomeoneFortune1'
import SomeoneFortune from './src/screens/SomeoneFortune'
import LunaChat from './src/screens/luna/LunaChat'
import LunaChatComing from './src/screens/luna/LunaChatComing'
import PsychicComingSoon from './src/screens/PsychicComingSoon';
import PhotoReadingScreen from './src/screens/PhotoReadingScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import Profile from './src/screens/profile/Profile'
import Credits from './src/screens/Credits'
import ProfileLoggedIn from './src/screens/profile/ProfileLoggedIn'
import ProfileDetails from './src/screens/profile/ProfileDetails'
import SignInScreen from './src/screens/SignInScreen'
import ReadingAnimationScreen from './src/screens/ReadingAnimationScreen'
import OnBoarding from './src/screens/Onboarding'
import HoroscopeMain from './src/screens/horoscopes/HoroscopeMain'
import HoroscopeAries from './src/screens/horoscopes/HoroscopeAries'
import HoroscopeAquarius from './src/screens/horoscopes/HoroscopeAquarius'
import HoroscopeCancer from './src/screens/horoscopes/HoroscopeCancer'
import HoroscopeLibra from './src/screens/horoscopes/HoroscopeLibra'
import HoroscopeLeo from './src/screens/horoscopes/HoroscopeLeo'
import HoroscopeScorpio from './src/screens/horoscopes/HoroscopeScorpio'
import HoroscopeTaurus from './src/screens/horoscopes/HoroscopeTaurus'
import HoroscopeVirgo from './src/screens/horoscopes/HoroscopeVirgo'
import HoroscopeGemini from './src/screens/horoscopes/HoroscopeGemini'
import HoroscopeCapricorn from './src/screens/horoscopes/HoroscopeCapricorn'
import HoroscopePisces from './src/screens/horoscopes/HoroscopePisces'
import HoroscopeSagittarius from './src/screens/horoscopes/HoroscopeSagittarius'
import Reading from './src/screens/Reading'
import ReadingP from './src/screens/ReadingP'
import VirtualCoffeeReadingScreen from './src/screens/virtual/VirtualCoffeeReadingScreen'
import VirtualOne from "./src/screens/virtual/VirtualOne";
import VirtualTwo from './src/screens/virtual/VirtualTwo'
import VirtualThree from './src/screens/virtual/VirtualThree'
import VirtualFour from './src/screens/virtual/VirtualFour'
import VirtualFive from './src/screens/virtual/VirtualFive'
import VirtualLoadingScreen from './src/screens/virtual/VirtualLoadingScreen'
import ReadingAnimationScreen2 from './src/screens/ReadingAnimationScreen2'
import Gems from './src/screens/Gems';
import Compatibility from './src/screens/horoscopes/Compatibility';
import CompatibilityPisces from './src/screens/horoscopes/CompatibilityPisces';
import CompatibilityAries from './src/screens/horoscopes/CompatibilityAries';
import CompatibilityTaurus from './src/screens/horoscopes/CompatibilityTaurus';
import CompatibilityGemini from './src/screens/horoscopes/CompatibilityGemini';
import CompatibilityCancer from './src/screens/horoscopes/CompatibilityCancer';
import CompatibilityCapricorn from './src/screens/horoscopes/CompatibilityCapricorn';
import CompatibilityLeo from './src/screens/horoscopes/CompatibilityLeo';
import CompatibilityAquarius from './src/screens/horoscopes/CompatibilityAquarius';
import CompatibilityVirgo from './src/screens/horoscopes/CompatibilityVirgo';
import CompatibilitySagi from './src/screens/horoscopes/CompatibilitySagi';
import CompatibilityLibra from './src/screens/horoscopes/CompatibilityLibra';
import CompatibilityScorpio from './src/screens/horoscopes/CompatibilityScorpio';
import Crystals from './src/screens/Crystals';
import ReadingFace from './src/screens/ReadingFace';
import ReadingCof from './src/screens/ReadingCof';
import ReadingPalm from './src/screens/ReadingPalm';
import HomeH from './src/screens/HomeH';
import Home1 from './src/screens/Home1';

// ONLY STORE NAVIGATION HERE

function App() {
  const forFade = ({ current }) => ({ cardStyle: { opacity: current.progress }});

  // Put Error fallback here
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HomeH" component={HomeH} />
        <Stack.Screen name="Home1" component={Home1} />
        <Stack.Screen name="ReadingP" component={ReadingP} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Virtual" component={VirtualCoffeeReadingScreen} />
        <Stack.Screen name="VirtualOne" component={VirtualOne} options={{ cardStyleInterpolator:forFade}} />
        <Stack.Screen name="VirtualTwo" component={VirtualTwo} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualThree" component={VirtualThree} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualFour" component={VirtualFour} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualFive" component={VirtualFive} options={{ cardStyleInterpolator:forFade}}/>
        <Stack.Screen name="VirtualLoading" component={VirtualLoadingScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PhotoReading" component={PhotoReadingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ReadingAnimation" component={ReadingAnimationScreen} />
        <Stack.Screen name="ReadingAnimationScreen2" component={ReadingAnimationScreen2} />
        <Stack.Screen name="Reading" component={Reading} />
        <Stack.Screen name="ReadMore" component={ReadMore} />
        <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
        <Stack.Screen name="Fortune" component={FortuneModal} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Credits" component={Credits} />
        <Stack.Screen name="ProfileLoggedIn" component={ProfileLoggedIn} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        <Stack.Screen name="Compatibility" component={Compatibility} />
        <Stack.Screen name="CompatibilityPisces" component={CompatibilityPisces} />
        <Stack.Screen name="CompatibilityGemini" component={CompatibilityGemini} />
        <Stack.Screen name="CompatibilityAries" component={CompatibilityAries} />
        <Stack.Screen name="CompatibilityTaurus" component={CompatibilityTaurus} />
        <Stack.Screen name="CompatibilityCancer" component={CompatibilityCancer} />
        <Stack.Screen name="CompatibilityCapricorn" component={CompatibilityCapricorn} />
        <Stack.Screen name="CompatibilityAquarius" component={CompatibilityAquarius} />
        <Stack.Screen name="CompatibilityLeo" component={CompatibilityLeo} />
        <Stack.Screen name="CompatibilityLibra" component={CompatibilityLibra} />
        <Stack.Screen name="CompatibilityVirgo" component={CompatibilityVirgo} />
        <Stack.Screen name="CompatibilitySagi" component={CompatibilitySagi} />
        <Stack.Screen name="CompatibilityScorpio" component={CompatibilityScorpio} />
        <Stack.Screen name="HoroscopePisces" component={HoroscopePisces} />
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
        <Stack.Screen name="HoroscopeMain" component={HoroscopeMain} />
        <Stack.Screen name="Psychic" component={Psychic} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="PsychicComingSoon" component={PsychicComingSoon} />
        <Stack.Screen name="LunaChatComing" component={LunaChatComing} />
        <Stack.Screen name="LunaChat" component={LunaChat} />
        <Stack.Screen name="Manifest" component={Manifest} />
        <Stack.Screen name="SendingUni2" component={SendingUni2} />
        <Stack.Screen name="SomeoneFortune" component={SomeoneFortune} />
        <Stack.Screen name="SomeoneFortune1" component={SomeoneFortune1} />
        <Stack.Screen name="Gems" component={Gems} />
          <Stack.Screen name="Crystals" component={Crystals} />
          <Stack.Screen name="ReadingPalm" component={ReadingPalm}/>
          <Stack.Screen name="ReadingFace" component={ReadingFace}/>
          <Stack.Screen name="ReadingCof" component={ReadingCof}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

