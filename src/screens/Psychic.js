import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import LoginChecker from "../../util/validators/LoginChecker";
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import psychicbg from "../../assets/FortuneCoffeePNGassets/Psychic/psychbg.png";
import SignUpButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import asklunabtn from "../../assets/FortuneCoffeePNGassets/Psychic/asklunabtn.png";
import someonebtn from "../../assets/FortuneCoffeePNGassets/Psychic/someonebtn.png";
import manifestbtn from "../../assets/FortuneCoffeePNGassets/Psychic/manifestbtn.png";
import NavBar_psyc from "../navbars/NavBar_psyc";

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

        <View style={styles.virtualContainer}>
            <ImageBackground source={psychicbg} style={styles.bgfull}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                    {isLoggedIn ? (
                            <View style={{zIndex: 100}}>
                                <></>
                            </View>
                        ) :
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image source={SignUpButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Image source={SignInButton} />
                            </TouchableOpacity>
                        </View>
                    }

                </View>
                <View style={{marginTop:'25%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('LunaChat')}>
                        <Image source={asklunabtn} style={{marginTop:15}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SomeoneFortune1')}>
                        <Image source={someonebtn} style={{marginTop:15}}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Manifest')}>
                        <Image source={manifestbtn} style={{marginTop:15}} />
                    </TouchableOpacity>

                </View>
                <NavBar_psyc/>
            </ImageBackground>
        </View>

    )

}

export default Psychic