import React, {useEffect, useState} from "react";
import LoginChecker from "../../../util/validators/LoginChecker";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import profilebg from "../../../assets/FortuneCoffeePNGassets/Profile/Profile.png";
import styles from "../../styles/styles";
import Logoutbtn from "../../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import appcredsbtn from "../../../assets/FortuneCoffeePNGassets/Profile/appcredits.png";
import NavBar_pro from "../../navbars/NavBar";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler'

function Profile({navigation}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        let mounted = true;
        if(mounted)
        {
            // Login Checker
            LoginChecker().then((results) =>{
                console.log("USER IS LOGGED IN : " , results)
                setIsLoggedIn(results)
            });
        }
        return ()=>{
            mounted = false;
        }
    },[navigation])



    return (
        <>
         <View style={{flex: 1}}>
             <ImageBackground source={profilebg} style={styles.bgfull}>
                <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
                    {isLoggedIn ? (
                            <View  style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                                <TouchableOpacity onPress={ () => { LogOutUser();}}>
                                    <Image source={Logoutbtn} />
                                </TouchableOpacity>
                            </View>
                        ) :
                        <View style={{ flex: 1, flexDirection: 'row', width: '10%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image source={SignUpButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Image source={SignInButton} />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Credits')} >
                            <Image source={appcredsbtn}  />
                        </TouchableOpacity>
                    </View>
                </View>
                <NavBar_pro />
            </ImageBackground>
        </View>
        </>
    )
}

export default Profile