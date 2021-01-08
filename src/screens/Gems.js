import {useNavigation} from "@react-navigation/native";
import React, {useEffect} from "react";
import {Image, ImageBackground, Linking, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import gemsbg from "../../assets/FortuneCoffeePNGassets/Subscription/Gemsbg.png";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler'

function Gems() {
    const navigation = useNavigation();
    useEffect(()=>{
        let mounted = true;
    })
    return (
        <ImageBackground source={gemsbg} style={styles.bgfull}>
                <View style={{ flex: 0.7, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginBottom:"50%" }}>
                    <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
        </ImageBackground>
    )
}

export default Gems