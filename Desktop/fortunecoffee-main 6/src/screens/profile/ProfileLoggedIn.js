import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import db from "../../../util/firestore/firestore";
import * as firebase from "firebase";
import LoginChecker from "../../../util/validators/LoginChecker";
import {Image, ImageBackground, Text, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import profilebg from "../../../assets/FortuneCoffeePNGassets/Profile/Profile.png";
import styles from "../../styles/styles";
import btn from "../../../assets/FortuneCoffeePNGassets/Profile/shopbtn.png";
import gtcr from "../../../assets/FortuneCoffeePNGassets/gtcr.png";
import Logoutbtn from "../../../assets/FortuneCoffeePNGassets/Profile/BtnPrimary.png";
import UserNametxt from "../../../assets/FortuneCoffeePNGassets/Profile/Name.png";
import proline from "../../../assets/FortuneCoffeePNGassets/Profile/Line2.png";
import DOB from "../../../assets/FortuneCoffeePNGassets/Profile/DateofBirth.png";
import Emp from "../../../assets/FortuneCoffeePNGassets/Profile/Employement.png";
import Gen from "../../../assets/FortuneCoffeePNGassets/Profile/Gender.png";
import Rel from "../../../assets/FortuneCoffeePNGassets/Profile/Relationship_Status.png";
import NavBar_pro from "../../navbars/NavBar_Profile";
import profilebgnotlogged from "../../../assets/FortuneCoffeePNGassets/profile_login.png";
import SignUpButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignUpButton.png";
import SignInButton from "../../../assets/FortuneCoffeePNGassets/HomePage/SignInButton.png";
import manageSubs from "../../../assets/FortuneCoffeePNGassets/Profile/managesubs.png";
import appcredsbtn from "../../../assets/FortuneCoffeePNGassets/Profile/appcredits.png";
import cardz from "../../../assets/FortuneCoffeePNGassets/Profile/cardz.png";
import cards from "../../../assets/FortuneCoffeePNGassets/Profile/cards.png";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler'
import LogOutUser from '../../../util/LogOutUser';
import GetItemInStorage from "../../../util/GetItemInStorage";
import SaveItemInStorage from '../../../util/SaveItemInStorage'
import Gems from '../Gems';
import { actuatedNormalize } from '../../../util/fontScaler';


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
    const [fortune, setFortunes] = useState('0');
    const [cardCount, setCardCount] = useState('0');


    const pullProfileInfo = () => {
        try{
            db.collection('users').doc(firebase.auth().currentUser.uid)
            .get()
            .then(async (doc) => {
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
                    setFortunes(data.totalFortunes)
                    setCardCount(data.totalGems)
                    if(data.subscriptionLevel !== 0){
                        console.log("User has subscribed. Saving date")
                        await SaveItemInStorage("PURCHASE_DATE", data.lastDateOfPurchase.toString());
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    if(!GetItemInStorage("FORTUNE_READING_COUNT")){
                        await SaveItemInStorage("FORTUNE_READING_COUNT", "5")
                    }
                    if(!GetItemInStorage("CARD_READING_COUNT")){
                        await SaveItemInStorage("CARD_READING_COUNT", "3")
                    }
                    setCardCount(await GetItemInStorage("CARD_READING_COUNT"))
                    setFortunes(await GetItemInStorage("FORTUNE_READING_COUNT"))
                }
            }).catch(function (error) {
            console.log("Error getting document:", error);
            })
        }catch(e){
            console.log(e)
        }
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


    const GetCounts = () =>{
        if(fortune > 5000){
            return "UNLIMITED"
        }else{
            return `${fortune} | ${cardCount}`

        }
    }

    return isLoggedIn ? (
        <>
        <View style={{flex: 1, alignItems: 'center'}}>

            <ImageBackground source={profilebg} style={{width: widthPercentageToDP('100'), height: heightPercentageToDP('100')}}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>

                    <TouchableOpacity onPress={ async () => {
                        await LogOutUser();
                        navigation.navigate('Home')
                    }}>
                        <Image source={Logoutbtn}  style={{resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(5)}}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>
                    <Image source={gtcr} style={{resizeMode: 'contain',width: widthPercentageToDP(15),height: heightPercentageToDP(8)}} />
                  </TouchableOpacity>
      

                    
                </View>

                <View style={{flex: 1, flexDirection:'column', alignItems: 'center', width: widthPercentageToDP('100'), height: heightPercentageToDP('160')}}>
                    <ScrollView>
                    <TouchableOpacity onPress={() => navigation.navigate('Crystals')}>
                <View style={{flex: 0, flexDirection: 'row'}}>
                    <Image source={cards} style={{marginTop:"0%", marginLeft: '20%',resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(18)}}/>
                    <Text style={{marginTop: '18%', fontSize:actuatedNormalize(18),color:'#FFFFFF'}}>{cardCount}</Text > 
                    <Image source={cardz} style={{marginTop:"0%", marginLeft: '20%',resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(18)}}/>
                    <Text style={{marginTop: '18%', fontSize:actuatedNormalize(18),color:'#FFFFFF'}}>{fortune}</Text >   
                    </View>
                </TouchableOpacity>


                    <Image source={UserNametxt} style={{marginTop:"10%", marginRight: '56%',resizeMode: 'contain',width: widthPercentageToDP(10),height: heightPercentageToDP(5)}}/>
                    <Text style={{marginTop:10, marginRight:"50%",marginBottom:10, fontSize:actuatedNormalize(13),color:'#FFFFFF'}}>{name} </Text >  
                    <Image source={proline} style={{resizeMode: 'contain',width: widthPercentageToDP(75),height: heightPercentageToDP(1)}} />

                    <Image source={DOB} style={{marginTop:30,marginRight:"50%",resizeMode: 'contain',width: widthPercentageToDP(22),height: heightPercentageToDP(5)}}/>
                    <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:actuatedNormalize(13),color:'#FFFFFF'}}>{month}/{day}/{year}</Text>

                    <Image source={proline}  style={{resizeMode: 'contain',width: widthPercentageToDP(75),height: heightPercentageToDP(1)}}  />
                    <Image source={Gen} style={{marginTop:30,marginRight:"50%",resizeMode: 'contain',width: widthPercentageToDP(14),height: heightPercentageToDP(5)}}/>
                    <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:actuatedNormalize(13),color:'#FFFFFF'}}>{gender} </Text>

                    <Image source={proline}  style={{resizeMode: 'contain',width: widthPercentageToDP(75),height: heightPercentageToDP(1)}} />
                    <Image source={Rel} style={{marginTop:30,marginRight:"50%",resizeMode: 'contain',width: widthPercentageToDP(33),height: heightPercentageToDP(5)}}/>
                    <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:actuatedNormalize(13),color:'#FFFFFF'}}>{rStatus} </Text>

                    <Image source={proline}  style={{resizeMode: 'contain',width: widthPercentageToDP(75),height: heightPercentageToDP(1)}}  />
                    <Image source={Emp} style={{marginTop:30,marginRight:"50%",resizeMode: 'contain',width: widthPercentageToDP(26),height: heightPercentageToDP(5)}}/>
                    <Text style={{marginTop:20, marginRight:"50%",marginBottom:20, fontSize:actuatedNormalize(13),color:'#FFFFFF'}}> {employment} </Text>

                    <Image source={proline}  style={{resizeMode: 'contain',width: widthPercentageToDP(75),height: heightPercentageToDP(1)}} />


                   {/*} <TouchableOpacity>
                    <Image source={manageSubs} style={{marginTop:30,marginBottom:30}}/>
                    </TouchableOpacity> */}
                    </ScrollView>

                </View>
            <NavBar_pro/>
            </ImageBackground>
        </View>

        </>

    ): (
        <>
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                <ImageBackground source={profilebgnotlogged} style={styles.bgfull1}>
                    {isLoggedIn ? (
                            <View>
                                <TouchableOpacity onPress={ () => { LogOutUser();}}>
                                    <Image source={Logoutbtn}  style={{resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(5)}}  />
                                </TouchableOpacity>
                            </View>
                        ) :
                        <View style={{   flex: 0.03, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18}}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Image source={SignUpButton} style={{resizeMode: 'contain',width: widthPercentageToDP(30),height: heightPercentageToDP(7)}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>
                        <Image source={gtcr} style={{resizeMode: 'contain',width: widthPercentageToDP(15),height: heightPercentageToDP(8)}} />
                  </TouchableOpacity>
                        
                        </View>

                    }
                    <TouchableOpacity onPress={() => navigation.navigate('Crystals')}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                    <Image source={cards} style={{marginTop:"10%", marginLeft: '10%',resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(18)}}/>
                    <Text style={{marginTop: '28%', fontSize:actuatedNormalize(18),color:'#FFFFFF'}}>{cardCount}</Text > 
                    <Image source={cardz} style={{marginTop:"10%", marginLeft: '20%',resizeMode: 'contain',width: widthPercentageToDP(18),height: heightPercentageToDP(18)}}/>
                    <Text style={{marginTop: '28%', fontSize:actuatedNormalize(18),color:'#FFFFFF'}}>{fortune}</Text >   
                    </View>
                    </TouchableOpacity>
                    {/* ADD HERE THE CARD COUNT */}

                    <View style={{flex: 1, justifyContent: 'center', top: heightPercentageToDP(10)}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Credits')} >
                            <Image source={appcredsbtn} style={{resizeMode: 'contain',width: widthPercentageToDP('28'), height:heightPercentageToDP('7')}}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <NavBar_pro />
            </View>
        </>
    )
}

export default ProfileLoggedIn