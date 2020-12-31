
//HOROSCOPE MAIN
import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import bgstars from "../../../assets/Bgstar.png";
import styles from "../../styles/styles";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import Horoscopetxt from "../../../assets/FortuneCoffeePNGassets/horoscopes/Horoscopes.png";
import Ariesbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aries-bttn.png";
import Taurusbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Taurus-bttn.png";
import Geminibttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Gemini-bttn.png";
import Cancerbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Cancer-bttn.png";
import Leobttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Leo-bttn.png";
import Virgobttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Virgo-bttn.png";
import Librabttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Libra-bttn.png";
import Scorpiobttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Scorpio-bttn.png";
import Sagittariusbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Sagittarius-bttn.png";
import Capribttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Capricorn-bttn.png";
import Aquariusbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Aquarius-bttn.png";
import Piscesbttn from "../../../assets/FortuneCoffeePNGassets/horoscopes/horoscopebtns/Pisces-bttn.png";
import NavBar_hor from "../../navbars/NavBar_hor";
import React from "react";

function HoroscopeMain({}) {
    const navigation = useNavigation();
    return (
        <ImageBackground source={bgstars} style={styles.bgfull}>
            {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={SignUpButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Image source={SignInButton} />
            </TouchableOpacity>
          </View> */}
            <View >
                <View style={{  alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Image source={SignUpButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Image source={SignInButton} />
                        </TouchableOpacity>
                    </View>
                    <Image source={Horoscopetxt} style={{ }} />
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:30}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeAries')}>
                            <Image source={Ariesbttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeTaurus')}>
                            <Image source={Taurusbttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeGemini')}>
                            <Image source={Geminibttn} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeCancer')}>
                            <Image source={Cancerbttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeLeo')}>
                            <Image source={Leobttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeVirgo')}>
                            <Image source={Virgobttn} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeLibra')}>
                            <Image source={Librabttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeScorpio')}>
                            <Image source={Scorpiobttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeSagittarius')}>
                            <Image source={Sagittariusbttn} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding:2, marginTop:2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeCapricorn')}>
                            <Image source={Capribttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HoroscopeAquarius')}>
                            <Image source={Aquariusbttn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Horoscopepisces')}>
                            <Image source={Piscesbttn} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <NavBar_hor/>
        </ImageBackground>

    );
}
export default HoroscopeMain