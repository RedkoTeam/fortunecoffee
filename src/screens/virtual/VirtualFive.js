import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../../styles/styles";
import backgroundFive from "../../../assets/FortuneCoffeePNGassets/virtualPage/backgroundFive.png";
import pysicReadingText from "../../../assets/FortuneCoffeePNGassets/virtualPage/ourPysicReading.png";
import dontWantToWaitText from "../../../assets/FortuneCoffeePNGassets/virtualPage/dontWantToWait.png";
import getCrystalsButton from "../../../assets/FortuneCoffeePNGassets/virtualPage/getCrystalsButton.png";
import NavBar from "../../navbars/NavBar";
import React from "react";

function VirtualFive(){
    const navigation = useNavigation();

    {/* ASYNCHRONOUSLY FIND RANDOM FORTUNE */}
    // BUG: redirects to fortunes away from subscription page if subscription button was pressed
    setTimeout( () => { navigation.navigate('Reading') }, 15);

    return(
        <View style={styles.virtualContainer}>
            <ImageBackground source={backgroundFive} style={ styles.virtualOne }>
                <Image source={ pysicReadingText } style={{ margin: '40%'}}/>
                <Image source={ dontWantToWaitText } style={{ marginBottom:10 }} />
                <TouchableOpacity onPress={ () => navigation.navigate('Subscription')}>
                    <Image source={ getCrystalsButton } />
                </TouchableOpacity>
                <NavBar/>
            </ImageBackground>
        </View>
    )
}


export default VirtualFive