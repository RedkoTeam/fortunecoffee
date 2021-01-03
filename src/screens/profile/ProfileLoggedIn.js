import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import db from "../../../util/firestore/firestore";
import * as firebase from "firebase";
import LoginChecker from "../../../util/validators/LoginChecker";
import {Image, ImageBackground, Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import profilebg from "../../../assets/FortuneCoffeePNGassets/Profile/Profile.png";
import styles from "../../styles/styles";
import Shopbtn from "../../../assets/FortuneCoffeePNGassets/Profile/shopbtn.png";
import Logoutbtn from "../../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";
import UserNametxt from "../../../assets/FortuneCoffeePNGassets/Profile/Name.png";
import proline from "../../../assets/FortuneCoffeePNGassets/Profile/Line2.png";
import DOB from "../../../assets/FortuneCoffeePNGassets/Profile/DateofBirth.png";
import Emp from "../../../assets/FortuneCoffeePNGassets/Profile/Employement.png";
import Gen from "../../../assets/FortuneCoffeePNGassets/Profile/Gender.png";
import Rel from "../../../assets/FortuneCoffeePNGassets/Profile/Relationship_Status.png";
import NavBar_pro from "../../navbars/NavBar";
import profilebgnotlogged from "../../../assets/FortuneCoffeePNGassets/profile_login.png";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import appcredsbtn from "../../../assets/FortuneCoffeePNGassets/Profile/appcredits.png";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler'


function ProfileLoggedIn({route}) {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('')
    const [rStatus, setRStatus] = useState('')
    const [employment, setEmployment] = useState('')
    const [gender, setGender] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')

    const pullProfileInfo = () => {
        db.collection('users').doc(firebase.auth().currentUser.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    let data = doc.data()
                    setName(data.name)
                    setRStatus(data.relationshipStatus)
                    setEmployment(data.employmentStatus)
                    setGender(data.gender)
                    setMonth(data.month)
                    setDay(data.day)
                    setYear(data.year)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
            console.log("Error getting document:", error);
        })
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            // Login Checker
            LoginChecker().then((results) =>{
                console.log("USER IS LOGGED IN : " , results)
                setIsLoggedIn(results)
                
                if(results){
                    pullProfileInfo()
                }else{
                    console.log("User isn't logged in")
                }
            });
        });
        return unsubscribe;
    },[navigation])


    return isLoggedIn? (
        <ImageBackground source={profilebg} style={styles.bgfull2}>
            <View style={{ flexDirection: 'row', width: '10%', justifyContent: 'space-between', padding: 25, marginTop: 18, marginTop: heightPercentageToDP() }}>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                    <Image source={Shopbtn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => {
                    LogOutUser();
                    navigation.navigate('Home')
                }}>
                    <Image source={Logoutbtn} />
                </TouchableOpacity>
            </View>
            {/* <Text style={{fontSize: 30}}>Hi</Text>
      <Button title="console" onPress={ () => console.log(favRef)} /> */}
            {/* STILL NEED TO BE PULLED FORM FIRESTORE */}
            <Image source={UserNametxt} style={{marginTop:"10%",marginRight:"60%"}}/>
            <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:15,color:'#FFFFFF'}}>{name} </Text >  
            <Image source={proline} />
            <Image source={DOB} style={{marginTop:30,marginRight:"50%"}}/>
            <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:15,color:'#FFFFFF'}}>{month}/{day}/{year}</Text>
            <Image source={proline} />
            <Image source={Gen} style={{marginTop:30,marginRight:"50%"}}/>
            <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:15,color:'#FFFFFF'}}>{gender} </Text> 
            <Image source={proline} />
            <Image source={Rel} style={{marginTop:30,marginRight:"50%"}}/>
            <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:15,color:'#FFFFFF'}}>{rStatus} </Text>
            <Image source={proline} />
            <Image source={Emp} style={{marginTop:30,marginRight:"50%"}}/>
            <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:15,color:'#FFFFFF'}}> {employment} </Text>
            <Image source={proline} />
            <NavBar_pro/>
        </ImageBackground>

    ): (
        <>
        <View style={{flex: 1}}>
                <ImageBackground source={profilebgnotlogged} style={styles.bgfull1}>
                    {isLoggedIn ? (
                            <View>
                                <TouchableOpacity onPress={ () => { LogOutUser();}}>
                                    <Image source={Logoutbtn} />
                                </TouchableOpacity>
                            </View>
                        ) :
                        <View style={{  flex: .9, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop:15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Image source={SignUpButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Image source={SignInButton} />
                        </TouchableOpacity>
                        
                        </View>

                    }
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Credits')} >
                            <Image source={appcredsbtn} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <NavBar_pro />
            </View>
        </>
    )
}

export default ProfileLoggedIn