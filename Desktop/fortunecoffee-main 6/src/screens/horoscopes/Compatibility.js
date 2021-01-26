//HOROSCOPE MAIN
import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import bgstars from "../../../assets/Bgstar.png";
import styles from "../../styles/styles";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import Horoscopetxt from "../../../assets/title.png";
import cslide from "../../../assets/FortuneCoffeePNGassets/horoscopes/cslide.png";
import Ariesc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Ariesc.png";
import Taurusc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Taurusc.png";
import Geminic from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Geminic.png";
import Cancerc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Cancerc.png";
import Leoc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Leoc.png";
import gtcr from "../../../assets/FortuneCoffeePNGassets/gtcr.png";
import Virgoc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Virgoc.png";
import Librac from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Librac.png";
import Scorpioc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Scorpioc.png";
import Sagittariusc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Sagic.png";
import Capric from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Capric.png";
import Aquariusc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Aquc.png";
import Piscesc from "../../../assets/FortuneCoffeePNGassets/horoscopes/compatibility/Piscesc.png";
import NavBar_hor from "../../navbars/NavBar_Horoscope";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";




function Compatibility({}) {
    const navigation = useNavigation();


    return (
    <View style={{flex: 1}}>    
        <ImageBackground source={bgstars} style={styles.bgfull}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 10, marginLeft:'140%', }}>
      
        <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>
<Image source={gtcr} style={{marginRight: "50%"}}/>
</TouchableOpacity>
    </View>
                    <Image source={Horoscopetxt} style={{marginTop:widthPercentageToDP(2)}} />
                    <TouchableOpacity onPress={() => navigation.navigate('HoroscopeMain')}>
                    <Image source={cslide} style={{marginTop:widthPercentageToDP(2),marginTop: "6%",}} />
                    </TouchableOpacity>
                    <ScrollView>
                    <View style={{justifyContent: 'center', padding:5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityAries')}>
                            <Image source={Ariesc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginRight:"10%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityTaurus')}>
                            <Image source={Taurusc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',marginRight:"6%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityGemini')}>
                            <Image source={Geminic} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding:"4%" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityCancer')}>
                            <Image source={Cancerc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',  marginRight:"10%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityLeo')}>
                            <Image source={Leoc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',marginRight:"6%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityVirgo')}>
                            <Image source={Virgoc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center',  padding:"2%"}}>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityLibra')}>
                            <Image source={Librac} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',  marginRight:"10%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityScorpio')}>
                            <Image source={Scorpioc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',marginRight:"6%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilitySagittarius')}>
                            <Image source={Sagittariusc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',marginLeft:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding:"2%" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityCapricorn')}>
                            <Image source={Capric} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',  marginRight:"10%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityAquarius')}>
                            <Image source={Aquariusc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain',marginRight:"6%"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CompatibilityPisces')}>
                            <Image source={Piscesc} style={{width :widthPercentageToDP('23'), height :heightPercentageToDP('16'), resizeMode:'contain', marginLeft:10}}/>
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
export default Compatibility