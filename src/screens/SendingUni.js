import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import sendingbg from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone.gif";
import styles from "../styles/styles";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import React from "react";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';

function SendingUni() {
    const navigation = useNavigation();
    return (

        <ImageBackground source={sendingbg} style={styles.bgfull}>


            <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                <Image source={backButton} style={{marginBottom:heightPercentageToDP(80),marginRight:widthPercentageToDP(70)}} />
            </TouchableOpacity>

        </ImageBackground>


    )
}

export default SendingUni