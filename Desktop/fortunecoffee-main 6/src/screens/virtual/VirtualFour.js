import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../../styles/styles";
import backgroundFour from "../../../assets/FortuneCoffeePNGassets/virtualPage/backgroundFour.png";
import tapToDrinkText from "../../../assets/FortuneCoffeePNGassets/virtualPage/tapToDrink.png";
import coffee_v from "../../../assets/FortuneCoffeePNGassets/virtualPage/coffee_v.png";
import React from "react";

function VirtualFour(){
    const navigation = useNavigation();
    return (
        <View style={styles.virtualContainer}>
            <ImageBackground source={ backgroundFour } style={ styles.virtualOne }>
                <Image source={ tapToDrinkText } />
                <TouchableOpacity onPress={ () => navigation.navigate('ReadingAnimation')}>
                    <Image source={ coffee_v } />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default VirtualFour