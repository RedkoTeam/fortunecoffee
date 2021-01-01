import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import sendingbg from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone.gif";
import styles from "../styles/styles";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import React from "react";

function SendingUni() {
    const navigation = useNavigation();
    return (

        <ImageBackground source={sendingbg} style={styles.bgfull}>


            <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                <Image source={backButton} style={styles.backButtonStyle1} />
            </TouchableOpacity>

        </ImageBackground>


    )
}

export default SendingUni