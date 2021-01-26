import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../../styles/styles";
import LunaSc from "../../../assets/FortuneCoffeePNGassets/Psychic/askluna/LunaSc.png";
import transparent from "../../../assets/FortuneCoffeePNGassets/Psychic/askluna/transparent.png";
import React from "react";



function LunaChat() {
    const navigation = useNavigation();
    return (

        <View style={styles.virtualContainer}>
            <ImageBackground source={LunaSc} style={styles.bgfull}>
         
                    <View style={styles.bgfull }>
                        <TouchableOpacity onPress={()=>{navigation.navigate('LunaChatComing')}}>
                            <Image source={transparent} />
                        </TouchableOpacity>
                    </View>


            </ImageBackground>
        </View>

    )

}



export default LunaChat