
// Home button changed
import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import Ellipse1 from "../../assets/FortuneCoffeePNGassets/HomePage/ellipse.png";
import styles from "../styles/styles";
import Horosbtn from "../../assets/FortuneCoffeePNGassets/HomePage/horosbtn.png";
import HorosSelected from '../../assets/FortuneCoffeePNGassets/HomePage/horW.png'
import Psychicbtn from "../../assets/FortuneCoffeePNGassets/HomePage/psyhbtn.png";
import Home from "../../assets/FortuneCoffeePNGassets/HomePage/Home.png";
import HomeUnselected from "../../assets/FortuneCoffeePNGassets/HomePage/homeb.png";
import Favorites from "../../assets/FortuneCoffeePNGassets/HomePage/Favorites.png";
import Profilebtn from "../../assets/FortuneCoffeePNGassets/HomePage/Profile.png";
import React, {useEffect, useState}  from "react";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {useRoute} from '@react-navigation/native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler'


function NavBar({}){
    const navigation = useNavigation();
    const route = useRoute();

    

    console.log(route.name)
    
    const [onHome, setOnHome] = useState(false);
    const [onPsychic, setOnPsychic] = useState(false);
    const [onHoro, setOnHoro] = useState(false);
    const [onFav, setOnFav] = useState(false);
    const [onProfile, setOnProfile] = useState(false);

    useEffect(()=>{
        switch(route.name){
                // HOME
                case 'Home':{
                    console.log("Currently On Home")
                    setOnHome(true)
                    setOnPsychic(false);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'SubscriptionScreen':{
                    setOnHome(true)
                    setOnPsychic(false);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(false);
                }

                case 'VirtualFive':{
                    setOnHome(true)
                    setOnPsychic(false);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(false);
                }

                case 'Reading':{
                    setOnHome(true)
                    setOnPsychic(false);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(false);
                }

                // Psychic
                case 'Psychic':{
                    setOnHome(false)
                    setOnPsychic(true);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'Manifest':{
                    setOnHome(false)
                    setOnPsychic(true);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(false);
                }

                // HoroScope
                case 'HoroscopeMain':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeAries':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeAquarius':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeCancer':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeCapricorn':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeGemini':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeLeo':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeLibra':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeScorpio':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeSagittarius':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeTaurus':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                case 'HoroscopeVirgo':{
                    setOnHoro(false)
                    setOnPsychic(false);
                    setOnHoro(true);
                    setOnFav(false);
                    setOnProfile(false);
                }
                
                // Favorites
                case 'Favorites':{
                    setOnHome(false)
                    setOnPsychic(false);
                    setOnHoro(false);
                    setOnFav(true);
                    setOnProfile(false);
                }

                // Logged in
                case 'ProfileLoggedIn':{
                    setOnHome(false)
                    setOnPsychic(false);
                    setOnHoro(false);
                    setOnFav(false);
                    setOnProfile(true);
                }
            }
      },[])

      


    
    return(
        <View style={{ backgroundColor:'#070631',  alignItems:'center', alignContent:'center',width: widthPercentageToDP('100') }}>
            <Image source={Ellipse1} style={{ position: 'absolute', bottom: heightPercentageToDP('-1'), width: widthPercentageToDP('100')}} />
            <View style={{flexDirection:'row', width:'90%', justifyContent: 'space-between', paddingBottom:10}}>
                <TouchableOpacity onPress={() => { 
                    navigation.navigate('HoroscopeMain')
                }}>
                    <Image source={onHoro ? HorosSelected : Horosbtn}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Psychic')
                }}>
                    <Image source={Psychicbtn} style={{ marginRight: widthPercentageToDP('10'), bottom:'80%'}}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home')
                    }}>
                    <Image source={onHome ? Home : HomeUnselected} style={{ bottom:'120%'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Favorites')
                    }}>
                    <Image source={Favorites} style={{ marginLeft:30, bottom:'65%'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('ProfileLoggedIn')
                    }}>
                    <Image source={Profilebtn} style={{ bottom:'0%',paddingBottom:10}} />
                </TouchableOpacity>
                    
            </View>
        </View>
    )
}

export default NavBar