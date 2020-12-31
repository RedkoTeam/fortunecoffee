import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import ComingLuna from "../../../assets/FortuneCoffeePNGassets/Psychic/askluna/ComingLuna.png";
import backButton from "../../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import NavBar_psyc from "../../navbars/NavBar_psyc";
import React from "react";


function LunaChatComing() {
    const navigation = useNavigation();
    return (

        <View style={styles.virtualContainer}>
            <ImageBackground source={ComingLuna} style={styles.bgfull}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                    <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <NavBar_psyc/>
            </ImageBackground>
        </View>

    )

}


export default LunaChatComing