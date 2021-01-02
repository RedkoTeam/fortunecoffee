import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import LoginChecker from "../../util/validators/LoginChecker";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../styles/styles";
import psychicbg from "../../assets/FortuneCoffeePNGassets/Psychic/psychbg.png";
import SignUpButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import asklunabtn from "../../assets/FortuneCoffeePNGassets/Psychic/asklunabtn.png";
import someonebtn from "../../assets/FortuneCoffeePNGassets/Psychic/someonebtn.png";
import manifestbtn from "../../assets/FortuneCoffeePNGassets/Psychic/manifestbtn.png";
import NavBar_psyc from "../navbars/NavBar";

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
            <ImageBackground source={psychicbg} style={{flex: 1, }}>
                    {isLoggedIn ? (
                        <View style={{ flex: 0.03, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: heightPercentageToDP('20') }}>
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

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('LunaChat')}>
                        <Image source={asklunabtn} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SomeoneFortune1')}>
                        <Image source={someonebtn} style={{marginTop:15}}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Manifest')}>
                        <Image source={manifestbtn} style={{marginTop:15}} />
                    </TouchableOpacity>

                </View>
            </ImageBackground>
            <NavBar_psyc />
        </View>

    )

}

export default Psychic