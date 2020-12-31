import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import backgroundThree from "../../../assets/FortuneCoffeePNGassets/virtualPage/backgroundThree.png";
import tapToDrinkText from "../../../assets/FortuneCoffeePNGassets/virtualPage/tapToDrink.png";
import coffee_v from "../../../assets/FortuneCoffeePNGassets/virtualPage/coffee_v.png";
import React from "react";

function VirtualThree(){
    const navigation = useNavigation();
    return (
        <View style={styles.virtualContainer}>
            <ImageBackground source={ backgroundThree } style={ styles.virtualOne }>
                <Image source={ tapToDrinkText } />
                <TouchableOpacity onPress={ () => navigation.navigate('VirtualFour')}>
                    <Image source={ coffee_v } />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}


export default VirtualThree