import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {Image, ImageBackground, Text, TextInput, View, SafeAreaView, TouchableOpacity} from "react-native";
import { Formik } from 'formik';
import styles from "../styles/styles";
import bgstars from "../../assets/Bgstar.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import magicglobetxt from "../../assets/FortuneCoffeePNGassets/Psychic/magicglobetxt.png";
import linehors from "../../assets/FortuneCoffeePNGassets/horoscopes/Line_57.png";
import someonetxt from "../../assets/FortuneCoffeePNGassets/Psychic/someonetxt.png";
import magicbtn from "../../assets/FortuneCoffeePNGassets/Psychic/magicbtn.png";
import NavBar_psyc from "../navbars/NavBar";
import MagicGlobeValidationSchema from "../../util/validators/MagicGlobeValidationSchema";
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler';

function SomeoneFortune1() {
    const navigation = useNavigation();
    const [nameS, setNameS] = useState('')
    const [bdayS, setbdayS] = useState('')
    let userName = 'user';

    const [buttonClicked, setButtonClicked] = useState(false);

    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={bgstars} style={{flex:1, resizeMode:'cover'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Psychic')} style={{alignSelf:'flex-start', top: heightPercentageToDP('5'), left: widthPercentageToDP('5')}}>
                    <Image source={backButton}/>
                </TouchableOpacity>
                <View style={{marginTop: heightPercentageToDP('10'), marginBottom: heightPercentageToDP('5'), alignSelf:'center', alignItems:'center'}}>
                    <Image source={magicglobetxt} />
                    <Image source={linehors} style={{marginTop: heightPercentageToDP(5), marginBottom: heightPercentageToDP(5)}} />
                    <Image source={someonetxt}  />
                </View>
                <Formik 
                    validationSchema={MagicGlobeValidationSchema}
                    initialValues={{name:'', birthDate:''}}
                    onSubmit={ values => {
                        console.log(values);
                        navigation.navigate('SomeoneFortune');
                    }}
                >
                    { ({ handleChange, errors, isValid, handleSubmit }) => (
                            <View style={{width:'100%', alignContent:'center', alignItems:'center'}}>
                                <Text style={{ color: '#FFFFFF', fontSize: 17, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20, marginTop:20}}>Name</Text>
                                <TextInput style={styles.savedFortuneTextBox0}
                                    placeholder="    Enter The Name of The Person"
                                    placeholderTextColor='#DCDCDC'
                                    onChangeText={handleChange('name')}
                                />
                                { errors.name &&  <Text style={{fontSize:13, color:'red', marginTop:3}}>{errors.name}</Text> }
                                <Text style={{ color: '#FFFFFF', fontSize: 17, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20, marginTop:20}}>Birthday</Text>
                                <TextInput style={styles.savedFortuneTextBox0}
                                    placeholder="    MMDDYYYY"
                                    placeholderTextColor='#DCDCDC'
                                    autoCapitalize='none'
                                    onChangeText={handleChange('birthDate')}
                                /> 
                                { errors.birthDate && <Text style={{fontSize:13, color:'red', marginTop:3}}>{errors.birthDate}</Text> }
                                <TouchableOpacity style={{ alignItems: 'center', marginTop: 28 }} disabled={!isValid} onPress={handleSubmit}>
                                    <Image source={magicbtn} />
                                </TouchableOpacity>           
                            </View>
                        )
                    }
                </Formik>
            </ImageBackground>
        </View>

    )
}

export default SomeoneFortune1