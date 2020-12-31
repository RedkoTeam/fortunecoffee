import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {Button, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import bgstars from "../../assets/Bgstar.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import magicglobetxt from "../../assets/FortuneCoffeePNGassets/Psychic/magicglobetxt.png";
import linehors from "../../assets/FortuneCoffeePNGassets/horoscopes/Line_57.png";
import someonetxt from "../../assets/FortuneCoffeePNGassets/Psychic/someonetxt.png";
import NavBar_psyc from "../navbars/NavBar_psyc";
import {someoneArray} from "../arrays/someoneArray";

function SomeoneFortune() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    var userName = 'user';

    const [buttonClicked, setButtonClicked] = useState(false);
    const [randomFortuneS, setRandomFortuneS] = useState('');

    return (
        <View style={styles.bgfull}>
            <ImageBackground source={bgstars} style={styles.bgfull}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SomeoneFortune1')}}>
                    <Image source={backButton} style={styles.backButtonStyle1}/>
                </TouchableOpacity>


                <Image source={magicglobetxt} style={{ alignItems: 'center', marginTop: 18 }} />

                <Image source={linehors} style={{  marginTop: 25 }} />
                <Image source={someonetxt} style={{  marginTop: 25 }} />
                <View style={styles.readingTableContainer}>

                    <ScrollView>
                        <Text style={{fontSize:20, color:'white', marginTop:30, alignItems: 'center', marginLeft:15 }}> {randomFortuneS}  </Text>

                        {!buttonClicked ? (
                            <Button
                                onPress={() => {
                                    setRandomFortuneS(getRandomFortuneS)
                                    setButtonClicked(true)
                                }}
                                title='Tap To See Magic Globe'

                            >
                            </Button>
                        ) : null}

                    </ScrollView>
                </View>



                <NavBar_psyc/>
            </ImageBackground>
        </View>


    );

    function getRandomFortuneS() {
        let random = Math.floor((Math.random() * someoneArray.length))
        console.log(random);
        let fortune = someoneArray[random];
        console.log(fortune);
        return fortune;
    }
}

export default SomeoneFortune
