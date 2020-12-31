import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import db from "../../../util/firestore/firestore";
import * as firebase from "firebase";
import LoginChecker from "../../../util/validators/LoginChecker";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import profilebg from "../../../assets/FortuneCoffeePNGassets/Profile/Profile.png";
import styles from "../../styles/styles";
import Shopbtn from "../../../assets/FortuneCoffeePNGassets/Profile/shopbtn.png";
import Logoutbtn from "../../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";
import UserNametxt from "../../../assets/FortuneCoffeePNGassets/Profile/Name.png";
import proline from "../../../assets/FortuneCoffeePNGassets/Profile/Line2.png";
import DOB from "../../../assets/FortuneCoffeePNGassets/Profile/DateofBirth.png";
import NavBar_pro from "../../navbars/NavBar_pro";
import profilebgnotlogged from "../../../assets/FortuneCoffeePNGassets/profile_login.png";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import appcredsbtn from "../../../assets/FortuneCoffeePNGassets/Profile/appcredits.png";


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
        <ImageBackground source={profilebg} style={styles.bgfull}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
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
            <Text>{name}</Text>
            <Text>{rStatus}</Text>
            <Text>{employment}</Text>
            <Text>{gender}</Text>
            <Text>{month}/{day}/{year}</Text>
            <Image source={UserNametxt} style={{marginTop:"50%",marginRight:"60%"}}/>
            <Image source={UserNametxt} style={{marginTop:20, marginRight:"60%",marginBottom:20}}/>
            <Image source={proline} />
            <Image source={DOB} style={{marginTop:30,marginRight:"50%"}}/>
            <Image source={DOB} style={{marginTop:20, marginRight:"50%",marginBottom:20}}/>
            <Image source={proline} />
            <NavBar_pro/>
        </ImageBackground>

    ): (
        <>
            <ImageBackground source={profilebgnotlogged} style={styles.bgfull}>
                {isLoggedIn ? (
                        <View>
                            <TouchableOpacity onPress={ () => { LogOutUser();}}>
                                <Image source={Logoutbtn} />
                            </TouchableOpacity>
                        </View>
                    ) :
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}><TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Image source={SignUpButton} />
                    </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Image source={SignInButton} />
                        </TouchableOpacity>
                    </View>

                }
                {/* <Text style={{fontSize: 30}}>Hi</Text>
        <Button title="console" onPress={ () => console.log(favRef)} /> */}
                <View style={{justifyContent: 'center', marginBottom:30}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Credits')} >
                        <Image source={appcredsbtn} />
                    </TouchableOpacity>
                </View>
                <NavBar_pro></NavBar_pro>
            </ImageBackground>
        </>
    )
}

export default ProfileLoggedIn