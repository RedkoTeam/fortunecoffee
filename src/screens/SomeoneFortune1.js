import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import bgstars from "../../assets/Bgstar.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import magicglobetxt from "../../assets/FortuneCoffeePNGassets/Psychic/magicglobetxt.png";
import linehors from "../../assets/FortuneCoffeePNGassets/horoscopes/Line_57.png";
import someonetxt from "../../assets/FortuneCoffeePNGassets/Psychic/someonetxt.png";
import magicbtn from "../../assets/FortuneCoffeePNGassets/Psychic/magicbtn.png";
import NavBar_psyc from "../navbars/NavBar_psyc";

function SomeoneFortune1() {
    const navigation = useNavigation();
    const [nameS, setNameS] = useState('')
    const [bdayS, setbdayS] = useState('')
    let userName = 'user';

    const [buttonClicked, setButtonClicked] = useState(false);

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={bgstars} style={styles.bgfull}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25,marginTop:30 }}>
                    <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{  alignItems: 'center', marginTop:60 }}>

                    <Image source={magicglobetxt} style={{ alignItems: 'center', marginTop: 18 }} />

                    <Image source={linehors} style={{  marginTop: 25 }} />
                    <Image source={someonetxt} style={{  marginTop: 25 }} />


                    <Text style={{ color: '#FFFFFF', fontSize: 17, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20, marginTop:20}}>Name</Text>
                    <View style={{flexDirection: 'row',width:'80%', height: '10%',marginTop:5}}>
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={nameS => setNameS(nameS)}
                                   value={nameS}
                                   placeholder="    Enter The Name of The Person"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    </View>
                    <Text style={{ color: '#FFFFFF', fontSize: 17, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20, marginTop:20}}>Birthday</Text>
                    <View style={{flexDirection: 'row',width:'80%', height: '10%',marginTop:5}}>
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={bdayS => setbdayS(bdayS)}
                                   value={bdayS}
                                   placeholder="    Their Birthday"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    </View>

                    <TouchableOpacity onPress={()=>{navigation.navigate('SomeoneFortune')}}>
                        <Image source={magicbtn}  style={{ alignItems: 'center', marginTop: 28 }} />
                    </TouchableOpacity>
                </View>
                <NavBar_psyc/>
            </ImageBackground>
        </View>
    )
}

export default SomeoneFortune1