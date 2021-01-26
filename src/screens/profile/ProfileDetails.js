import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import db from "../../../util/firestore/firestore";
import * as firebase from "firebase";
import {Image, ImageBackground, Text, TextInput, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import bgstars from "../../../assets/Bgstar.png";
import styles from "../../styles/styles";
import backButton from "../../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import continueImage from "../../../assets/FortuneCoffeePNGassets/Continue.png";
import skipImage from "../../../assets/FortuneCoffeePNGassets/Skip.png";
import { actuatedNormalize } from '../../../util/fontScaler';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';

function ProfileDetails({route}) {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [rStatus, setRStatus] = useState('')
    const [employment, setEmployment] = useState('')
    const [gender, setGender] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')

    const profileUpload = () => {
        db.collection('users').doc(firebase.auth().currentUser.uid).set({
            name: name,
            relationshipStatus: rStatus,
            employmentStatus: employment,
            gender: gender,
            month: month,
            day: day,
            year: year,
        }, {merge: true})
            .then(() => {
                navigation.navigate('SubscriptionScreen')
            })
    }


    return (
        <ImageBackground source={bgstars} style={styles.bgfull}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
                <Text style={{ color: '#FFFFFF', fontSize: actuatedNormalize(12), textAlign: 'left', alignSelf: 'stretch', marginLeft: '0%'}}>Name</Text>
                <View style={{flexDirection: 'row',width:'90%', height: '7%'}}>
                    <TextInput style={styles.savedFortuneTextBox0}
                               label="Name"
                               placeholder="   Enter name here"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={name => setName(name)}
                    />
                </View>
                <Text style={{ color: '#FFFFFF', fontSize: actuatedNormalize(12), marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: '0%'}}>Relationship Status</Text>
                <View style={{flexDirection: 'row',width:'90%', height: '7%'}}>
                    <TextInput style={styles.savedFortuneTextBox0}
                               label="Relationship Status"
                               placeholder="   Enter relationship status here"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={rStatus => setRStatus(rStatus)}
                    />
                </View>
                <Text style={{ color: '#FFFFFF', fontSize: actuatedNormalize(12), marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: '0%'}}>Employment Status</Text>
                <View style={{flexDirection: 'row',width:'90%', height: '7%'}}>
                    <TextInput style={styles.savedFortuneTextBox0}
                               label="EmploymentStatus"
                               placeholder="   Enter employment status here"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={employment => setEmployment(employment)}

                    />
                </View>
                <Text style={{ color: '#FFFFFF', fontSize: actuatedNormalize(12), marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: '0%'}}>Gender</Text>
                <View style={{flexDirection: 'row',width:'90%', height: '7%'}}>
                    <TextInput style={styles.savedFortuneTextBox0}
                               label="Gender"
                               placeholder="   Enter gender here"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={gender => setGender(gender)}
                    />
                </View>
                <Text style={{ color: '#FFFFFF', fontSize: actuatedNormalize(12),marginTop: 20, textAlign: 'left', alignSelf: 'stretch', marginLeft: '0%'}}>Birthday</Text>
                <View style={{flexDirection: 'row',width:'80%', height: '7%'}}>
                    <TextInput style={styles.savedFortuneTextBox2}
                               label="Month"
                               placeholder="      00"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={month => setMonth(month)}
                    />
                    <TextInput style={styles.savedFortuneTextBox2}
                               label="Day"
                               placeholder="      00"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={day => setDay(day)}
                    />
                    <TextInput style={styles.savedFortuneTextBox3}
                               label="Year"
                               placeholder="      00"
                               placeholderTextColor='#DCDCDC'
                               onChangeText={year => setYear(year)}
                    />
                </View>
                <Text></Text>
                <TouchableOpacity onPress={() => profileUpload()}>
                    <Image source={continueImage} style={{ marginTop:'5%',width :widthPercentageToDP('65'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                </TouchableOpacity>
                <Text></Text>
                <Text></Text>
                <TouchableOpacity onPress={() => profileUpload()}>
                    <Image source={skipImage} style={{ width :widthPercentageToDP('65'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}



export default ProfileDetails