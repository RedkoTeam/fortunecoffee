import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {Image, ImageBackground, Text, TextInput, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../styles/styles";
import manifestbg from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/manifestbg.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import sendtouni from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/sendtouni.png";
import NavBar_psyc from "../navbars/NavBar";

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
            <ImageBackground source={manifestbg} style={styles.bgfull}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25,marginTop:30 }}>
                    <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
                            <Image source={backButton} style={styles.backButtonStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{  alignItems: 'center', marginTop:60 }}>
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 17,
                        textAlign: 'center',
                        alignSelf: 'stretch',
                        marginLeft: 20,
                        marginTop: 110
                    }}/>
                    <View style={{flexDirection: 'row',width:'80%', height: '10%',marginTop:5}}>
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish1 => setWish1(wish1)}
                                   value={wish1}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    </View>
                    <Text style={{color: '#FFFFFF', fontSize: 17, textAlign: 'center', alignSelf: 'stretch', marginLeft: 20}}/>
                    <View style={{flexDirection: 'row',width:'80%', height: '10%',marginTop:5}}>
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish2 => setWish2(wish2)}
                                   value={wish2}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    </View>

                    <Text style={{color: '#FFFFFF', fontSize: 17, textAlign: 'center', alignSelf: 'stretch', marginLeft: 20}}/>
                    <View style={{flexDirection: 'row',width:'80%', height: '10%',marginTop:5}}>
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish3 => setWish3(wish3)}
                                   value={wish3}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    </View>
                    <Text style={{color: '#FFFFFF', fontSize: 17, textAlign: 'center', alignSelf: 'stretch', marginLeft: 20}}/>
                    <View style={{flexDirection: 'row',width:'80%', height: '10%',marginTop:5}}>
                        <TextInput style={styles.savedFortuneTextBox0}
                                   onChangeText={wish4 => setWish4(wish4)}
                                   value={wish4}
                                   placeholder="    What's going to happen?"
                                   placeholderTextColor='#DCDCDC'
                                   autoCapitalize='none'
                        />
                    </View>

                    <TouchableOpacity onPress={()=>{navigation.navigate('SendingUni')}}>
                        <Image source={sendtouni}  style={{ alignItems: 'center', marginTop: 38 }} />
                    </TouchableOpacity>
                </View>
                <NavBar_psyc/>
            </ImageBackground>
        </View>
    )
}


export default Manifest