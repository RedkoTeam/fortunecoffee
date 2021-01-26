import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {Button, Image, ImageBackground, ScrollView, Text, View, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import bgstars from "../../assets/Bgstar.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import magicglobetxt from "../../assets/FortuneCoffeePNGassets/Psychic/magicglobetxt.png";
import linehors from "../../assets/FortuneCoffeePNGassets/horoscopes/Line_57.png";
import someonetxt from "../../assets/FortuneCoffeePNGassets/Psychic/someonetxt.png";
import NavBar_psyc from "../navbars/NavBar";
import {someoneArray} from "../arrays/someoneArray";
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler';
import { actuatedNormalize } from '../../util/fontScaler';

function SomeoneFortune() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    var userName = 'user';

    const [buttonClicked, setButtonClicked] = useState(false);
    const [randomFortuneS, setRandomFortuneS] = useState('');

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={bgstars} style={{flex:1, resizeMode:'cover'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Psychic')} style={{alignSelf:'flex-start', top: heightPercentageToDP('5'), left: widthPercentageToDP('5')}}>
                <Image source={backButton} style={{width :widthPercentageToDP('13'), height :heightPercentageToDP('6'), resizeMode:'contain'}} />
                </TouchableOpacity>
                <View style={{marginTop: heightPercentageToDP('10'), marginBottom: heightPercentageToDP('5'), alignSelf:'center', alignItems:'center'}}>
                    <Image source={magicglobetxt} />
                    <Image source={linehors} style={{marginTop: heightPercentageToDP(5), marginBottom: heightPercentageToDP(5)}} />
                    <Image source={someonetxt}  />
                </View>
                <View style={styles.readingTableContainer1}>
                    <ScrollView>
                        <Text style={{fontSize:actuatedNormalize(14), color:'#F1F1F1', marginTop:heightPercentageToDP(5)}}> {randomFortuneS}  </Text>
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
