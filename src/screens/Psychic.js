import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import LoginChecker from "../../util/validators/LoginChecker";
import {Image, ImageBackground, View, TouchableOpacity,ScrollView} from "react-native";
import styles from "../styles/styles";
import psychicbg from "../../assets/FortuneCoffeePNGassets/Psychic/PsychicBackground.png";
import psychicTitle from "../../assets/FortuneCoffeePNGassets/Psychic/PsychicTitle.png";
import SignUpButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import asklunabtn from "../../assets/FortuneCoffeePNGassets/Psychic/asklunabtn.png";
import someonebtn from "../../assets/FortuneCoffeePNGassets/Psychic/someonebtn.png";
import manifestbtn from "../../assets/FortuneCoffeePNGassets/Psychic/manifestbtn.png";
import NavBar_psyc from "../navbars/NavBar_Psychic";
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler';
import Logoutbtn from "../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";


function Psychic() {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        let mounted = true;
        const unsubscribe = navigation.addListener('focus', () => {
            // Login Checker
            LoginChecker().then((results) =>{
                console.log("USER IS LOGGED IN : " , results)
                setIsLoggedIn(results)
            });
        });
        return unsubscribe;

    },[navigation])


    return (
        <View style={styles.mainContainer}>

            <ImageBackground source={psychicbg} style={{flex: 1 }}>

                    {isLoggedIn ? (
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                        </View>
                        ) :
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image source={SignUpButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Image source={SignInButton} />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{flexGrow : 1,marginTop: heightPercentageToDP(2), justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
                        <ScrollView >
                            <View style={{ marginTop:heightPercentageToDP('3'), alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={psychicTitle} style={{marginBottom: heightPercentageToDP('2')}}/>
                                <TouchableOpacity onPress={() => navigation.navigate('LunaChat')}>
                                    <Image source={asklunabtn} style={{height: heightPercentageToDP(10), width:widthPercentageToDP(87), borderRadius:15}} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('SomeoneFortune1')}>
                                    <Image source={someonebtn} style={{marginTop:heightPercentageToDP(2), marginBottom:heightPercentageToDP(2)
                                        , height: heightPercentageToDP(10), width:widthPercentageToDP(87), borderRadius:15}}  />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Manifest')}>
                                    <Image source={manifestbtn} style={{height: heightPercentageToDP(10), width:widthPercentageToDP(87), borderRadius:15}}/>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </View>
            </ImageBackground>
            <NavBar_psyc />
        </View>

    )

}

export default Psychic