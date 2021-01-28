
// Home button changed
import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import Ellipse1 from "../../assets/FortuneCoffeePNGassets/HomePage/ellipse.png";
import styles from "../styles/styles";
import Horosbtn from "../../assets/FortuneCoffeePNGassets/HomePage/horosbtn.png";
import HorosSelected from '../../assets/FortuneCoffeePNGassets/HomePage/horW.png'
import Psychicbtn from "../../assets/FortuneCoffeePNGassets/HomePage/psW.png";
import Home from "../../assets/FortuneCoffeePNGassets/HomePage/homeb.png";
import Favorites from "../../assets/FortuneCoffeePNGassets/HomePage/Favorites.png";
import Profilebtn from "../../assets/FortuneCoffeePNGassets/HomePage/Profile.png";
import React, {useEffect, useState}  from "react";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {useRoute} from '@react-navigation/native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler'


function NavBar({}){
    const navigation = useNavigation();

    
    return(
        <View style={{ backgroundColor:'#070631',  alignItems:'center', alignContent:'center',width: widthPercentageToDP('100'),marginBottom:'0%',top:'-2%'}}>
            <Image source={Ellipse1} style={{ position: 'absolute', width: widthPercentageToDP('100'),height:heightPercentageToDP(15)}} />
            <View style={{flexDirection:'row', width:'90%', justifyContent: 'space-between', paddingBottom:10}}>
                <TouchableOpacity onPress={() => { 
                    navigation.navigate('HoroscopeMain')
                }}>
                    <Image source={Horosbtn} style={{resizeMode:'contain',height:heightPercentageToDP('8'),width:widthPercentageToDP('18'),bottom: heightPercentageToDP('-1'), left: heightPercentageToDP('0') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Psychic')
                }}>
                    <Image source={Psychicbtn} style={{resizeMode:'contain',height:heightPercentageToDP('8'),width:widthPercentageToDP('18'),bottom: heightPercentageToDP('-1') , left: heightPercentageToDP('0') }}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('HomeH')
                    }}>
                    <Image source={Home} style={{resizeMode:'contain',height:heightPercentageToDP('8'),width:widthPercentageToDP('18'),bottom: heightPercentageToDP('-1'), left: heightPercentageToDP('0') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home')
                    }}>
                    <Image source={Favorites} style={{resizeMode:'contain',height:heightPercentageToDP('8'),width:widthPercentageToDP('18'),bottom: heightPercentageToDP('-1'), left: heightPercentageToDP('0') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('ProfileLoggedIn')
                    }}>
                    <Image source={Profilebtn} style={{ resizeMode:'contain',height:heightPercentageToDP('8'),width:widthPercentageToDP('18'),bottom: heightPercentageToDP('-1')}} />
                </TouchableOpacity>
                    
            </View>
        </View>
    )
}

export default NavBar