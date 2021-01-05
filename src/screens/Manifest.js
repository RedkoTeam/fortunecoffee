import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {Image, ImageBackground,ScrollView, Text, TextInput, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import manifestbg from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/manifestbg.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import sendtouni from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/sendtouni.png";
import NavBar_psyc from "../navbars/NavBar_Psychic";
import { heightPercentageToDP, widthPercentageToDP } from "../../util/scaler";

function Manifest() {
    const navigation = useNavigation();
    const [wish1, setWish1] = useState('')
    const [wish2, setWish2] = useState('')
    const [wish3, setWish3] = useState('')
    const [wish4, setWish4] = useState('')
    let userName = 'user';

    const [buttonClicked, setButtonClicked] = useState(false);

    return (
        <View style={styles.mainContainer}>
                <ImageBackground source={manifestbg} style={{ flex: 1,
                        resizeMode:'cover',
                        alignItems: 'center',
                        opacity: 1,}}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 60,marginTop:30 }}>
                    <View style={{position:'absolute', flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1,flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flex: 1, margin: 40, flexDirection: 'column', padding: 10, alignItems: 'center'}}>
                    <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish1 => setWish1(wish1)}
                                   value={wish1}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish2 => setWish2(wish2)}
                                   value={wish2}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish3 => setWish3(wish3)}
                                   value={wish3}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                            <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish4 => setWish4(wish4)}
                                   value={wish4}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    <TouchableOpacity onPress={()=>{navigation.navigate('SendingUni')}}>
                        <Image source={sendtouni}  style={{ alignItems: 'center', }} />
                    </TouchableOpacity>
                    </View>
                </View>
                <NavBar_psyc/>
            </ImageBackground>
        </View>
    )
}


export default Manifest