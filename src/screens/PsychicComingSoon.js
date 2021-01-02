import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../styles/styles";
import bgcoming from "../../assets/bgcoming.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import NavBar_psyc from "../navbars/NavBar";
import React from "react";

function PsychicComingSoon() {
    const navigation = useNavigation();
    return (

        <View style={styles.virtualContainer}>
            <ImageBackground source={bgcoming} style={styles.bgfull}>
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



export default PsychicComingSoon