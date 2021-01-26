
//HOROSCOPE MAIN
import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import bgstars from "../../../assets/Bgstar.png";
import styles from "../../styles/styles";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import Horoscopetxt from "../../../assets/FortuneCoffeePNGassets/horoscopes/Horoscopes.png";
import hslide from "../../../assets/FortuneCoffeePNGassets/horoscopes/hslide.png";
import cslide from "../../../assets/FortuneCoffeePNGassets/horoscopes/cslide.png";
import Ariesbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aries-bttn.png";
import Taurusbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Taurus-bttn.png";
import Geminibttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Gemini-bttn.png";
import Cancerbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Cancer-bttn.png";
import Leobttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Leo-bttn.png";
import gtcr from "../../../assets/FortuneCoffeePNGassets/gtcr.png";
import Virgobttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Virgo-bttn.png";
import Librabttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Libra-bttn.png";
import Scorpiobttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Scorpio-bttn.png";
import Sagittariusbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Sagittarius-bttn.png";
import Capribttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Capricorn-bttn.png";
import Aquariusbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aquarius-bttn.png";
import Piscesbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Pisces-bttn.png";
import NavBar_hor from "../../navbars/NavBar_Horoscope";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";




function HoroscopeMain({}) {
    const navigation = useNavigation();


    return (
    <View style={{flex: 1}}>    
        <ImageBackground source={bgstars} style={styles.bgfull}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 10, marginLeft:'140%', }}>
      
        <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>

<Image source={gtcr} style={{resizeMode: 'contain',width: widthPercentageToDP(15),height: heightPercentageToDP(8)}} />
</TouchableOpacity>
    </View>
                    <Image source={Horoscopetxt} style={{marginTop:widthPercentageToDP(2),width :widthPercentageToDP('40'), height :heightPercentageToDP('5'), resizeMode:'contain',}} />
                  {/*  <TouchableOpacity onPress={() => navigation.navigate('Compatibility')}> 
                    <Image source={hslide} style={{marginTop:widthPercentageToDP(2),marginTop: "4%"}} />
                    </TouchableOpacity>*/}
                    <ScrollView>
                    <View style={{justifyContent: 'center', padding:5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeAries')}>
                            <Image source={Ariesbttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginRight:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeTaurus')}>
                            <Image source={Taurusbttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeGemini')}>
                            <Image source={Geminibttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding:"4%" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeCancer')}>
                            <Image source={Cancerbttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginRight:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeLeo')}>
                            <Image source={Leobttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeVirgo')}>
                            <Image source={Virgobttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center',  padding:"2%"}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeLibra')}>
                            <Image source={Librabttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginRight:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeScorpio')}>
                            <Image source={Scorpiobttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeSagittarius')}>
                            <Image source={Sagittariusbttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding:"2%" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeCapricorn')}>
                            <Image source={Capribttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginRight:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeAquarius')}>
                            <Image source={Aquariusbttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopePisces')}>
                            <Image source={Piscesbttn} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                
                <View style={{height :widthPercentageToDP(35)}}>
                </View></ScrollView>
             </ImageBackground>
        <NavBar_hor  />

        </View>

    );
}
export default HoroscopeMain