
// Home button changed
import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import Ellipse1 from "../../assets/FortuneCoffeePNGassets/HomePage/ellipse.png";
import styles from "../styles/styles";
import Horosbtn from "../../assets/FortuneCoffeePNGassets/HomePage/horosbtn.png";
import Psychicbtn from "../../assets/FortuneCoffeePNGassets/HomePage/psbtn.png";
import Home from "../../assets/FortuneCoffeePNGassets/HomePage/homeb.png";
import Favorites from "../../assets/FortuneCoffeePNGassets/HomePage/Favorites.png";
import Profilebtn from "../../assets/FortuneCoffeePNGassets/HomePage/proW.png";
import React, {useEffect, useState}  from "react";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {useRoute} from '@react-navigation/native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler'


function NavBar({}){
    const navigation = useNavigation();

    
    return(
        <View style={{ backgroundColor:'#070631',  alignItems:'center', alignContent:'center',width: widthPercentageToDP('100') }}>
            <Image source={Ellipse1} style={{ position: 'absolute', bottom: heightPercentageToDP('-1'), width: widthPercentageToDP('100')}} />
            <View style={{flexDirection:'row', width:'90%', justifyContent: 'space-between', paddingBottom:10}}>
                <TouchableOpacity onPress={() => { 
                    navigation.navigate('HoroscopeMain')
                }}>
                    <Image source={Horosbtn} style={{bottom: heightPercentageToDP('0') , left: heightPercentageToDP('-2') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Psychic')
                }}>
                    <Image source={Psychicbtn} style={{bottom: heightPercentageToDP('0') , left: heightPercentageToDP('-2.5') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('HomeH')
                    }}>
                    <Image source={Home} style={{ bottom: heightPercentageToDP('0'), left: heightPercentageToDP('-1.5') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home')
                    }}>
                    <Image source={Favorites} style={{bottom: heightPercentageToDP('0'), left: heightPercentageToDP('-2')}}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('ProfileLoggedIn')
                    }}>
                    <Image source={Profilebtn} style={{ bottom: heightPercentageToDP('-0.4'),left: heightPercentageToDP('-1.2')}} />
                </TouchableOpacity>
                    
            </View>
        </View>
    )
}

export default NavBar