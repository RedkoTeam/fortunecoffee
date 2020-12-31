import {useNavigation} from "@react-navigation/native";
import React, {useEffect} from "react";
import {Image, ImageBackground, Linking, TouchableOpacity, View} from "react-native";
import Creditsbg from "../../assets/FortuneCoffeePNGassets/Profile/Credits.png";
import styles from "../styles/styles";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import iconsmadeby from "../../assets/FortuneCoffeePNGassets/Profile/Icons_made_by.png";
import Freepik from "../../assets/FortuneCoffeePNGassets/Profile/Freepik.png";
import fromImg from "../../assets/FortuneCoffeePNGassets/Profile/From.png";
import Flaticon from "../../assets/FortuneCoffeePNGassets/Profile/Flaticon.png";

function Credits() {
    const navigation = useNavigation();
    useEffect(()=>{
        let mounted = true;
    })
    return (
        <ImageBackground source={Creditsbg} style={styles.bgfull}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginBottom:"60%" }}>
                    <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginTop: 550}} >
                    <Image source={iconsmadeby} style={{marginRight:10}}/>
                    <TouchableOpacity style = {{marginRight: 5}} onPress={()=>{Linking.openURL('https://www.flaticon.com/authors/freepik')}}>
                        <Image source={Freepik} />
                    </TouchableOpacity>
                    <Image source={fromImg} style={{marginRight:10}}/>
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://www.flaticon.com/')}}>
                        <Image source={Flaticon} />
                    </TouchableOpacity>
           

            </View>

            <View style={{marginBottom:"10%"}}>

            </View>

        </ImageBackground>
    )
}

export default Credits