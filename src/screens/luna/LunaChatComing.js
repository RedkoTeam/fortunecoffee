import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ViewPagerAndroidBase} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../../styles/styles";
import ComingLuna from "../../../assets/FortuneCoffeePNGassets/Psychic/askluna/ComingLuna.png";
import backButton from "../../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import NavBar_psyc from "../../navbars/NavBar";
import React from "react";


function LunaChatComing() {
    const navigation = useNavigation();
    return (

        <View style={styles.virtualContainer}>
            <ImageBackground source={ComingLuna} style={styles.bgfull}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 20 }}>
                    <View style={{  flexDirection:'row', width:'100%', marginBottom:"200%"}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                            <Image source={backButton} />
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </View>

    )

}


export default LunaChatComing