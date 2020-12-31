import React, {useEffect, useState} from "react";
import LoginChecker from "../../../util/validators/LoginChecker";
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import profilebg from "../../../assets/FortuneCoffeePNGassets/Profile/Profile.png";
import styles from "../../styles/styles";
import Logoutbtn from "../../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import appcredsbtn from "../../../assets/FortuneCoffeePNGassets/Profile/appcredits.png";
import NavBar_pro from "../../navbars/NavBar_pro";

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
            <ImageBackground source={profilebg} style={styles.bgfull}>
                <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
                    {isLoggedIn ? (
                            <View>
                                <TouchableOpacity onPress={ () => { LogOutUser();}}>
                                    <Image source={Logoutbtn} />
                                </TouchableOpacity>
                            </View>
                        ) :
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image source={SignUpButton} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Image source={SignInButton} />
                            </TouchableOpacity>
                        </View>
                    }
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Credits')} style={{ bottom: "5%"}}>
                            <Image source={appcredsbtn}  />
                        </TouchableOpacity>
                    </View>
                </View>
                <NavBar_pro></NavBar_pro>
            </ImageBackground>

        </>
    )
}

export default Profile