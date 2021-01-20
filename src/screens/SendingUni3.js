import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import sendingbg3 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone3.gif";
import Nextbtn from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Next.png";
import styles from "../styles/styles";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import React from "react";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';

function SendingUni3() {
    const navigation = useNavigation();
    return (

        <ImageBackground source={sendingbg3} style={styles.bgfull}>


            <TouchableOpacity onPress={()=>{navigation.navigate('SendingUni4')}}>
            <Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0)}}/>
            </TouchableOpacity>
            

        </ImageBackground>


    )
}

export default SendingUni3