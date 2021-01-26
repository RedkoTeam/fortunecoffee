import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import * as firebase from "firebase";
import LoginChecker from "../../util/validators/LoginChecker";
import {Image, ScrollView, Text, View, ImageBackground} from "react-native";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import galaxy from "../../assets/FortuneCoffeePNGassets/shopPage/galaxy.png";
import savedFortunesTitle from "../../assets/FortuneCoffeePNGassets/savedFortunes/savedFortuneTitle.png";
import fortuneBox from "../../assets/FortuneCoffeePNGassets/savedFortunes/Box.png";
import NavBar_fav from "../navbars/NavBar_Favorites";
import XButton from '../../assets/FortuneCoffeePNGassets/bi_x.png'
import gtcr from "../../assets/FortuneCoffeePNGassets/gtcr.png";
import { actuatedNormalize } from '../../util/fontScaler';

// FIRESTORE
import db from '../../util/firestore/firestore'
import { fortunesArray } from '../arrays/fortunesArray';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import { date } from "yup";


function FavoritesScreen() {
    const navigation = useNavigation();
    const [favoritesData, setFavoritesData] = useState([{ 
        "date" : "Please save a fortune first!",
        "fortune": "You are logged in, but you haven't selected a favorite!"}]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [resetTriggered, setReset] = useState(false);
    const [ showMore, setShowMore ] = useState(false);
    let favRef ;
    
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            // Login Checker
            LoginChecker().then((results) =>{
                console.log("USER IS LOGGED IN : " , results)
                setIsLoggedIn(results)
                if(results){
                    try{
                        favRef = db.collection('users').doc(firebase.auth().currentUser.uid);

                        db.collection('users').doc(firebase.auth().currentUser.uid).get()
                        .then(uData => {
                            const userData = uData.data().favorites;
                            console.log("USER DATA: ", userData)
                            if(userData !== undefined){
                                setFavoritesData(userData);
                            }
                            console.log(`USER DATA  ${JSON.stringify(favoritesData)}`);
                        })
                        .catch(error => console.log(error));
                    }catch(e){
                        console.log(e)
                    }
                   
                }
                else{
                    navigation.navigate('SignUp');
                }
            });
        });
        return unsubscribe;

    },[navigation])

    


    return (
        <View style ={{backgroundColor:'#070631', flex: 1,alignItems: 'center',}}>
            <ImageBackground source={ galaxy } style={{flex: 1, width: widthPercentageToDP(100)}} >
                <Image source={savedFortunesTitle} style={{ alignSelf:'center',  top: heightPercentageToDP(10),resizeMode: 'contain',width: widthPercentageToDP(45),height: heightPercentageToDP(6)}} />
                <View style={{flex: 1,flexDirection: 'row', width: '100%', padding: 10, zIndex: 10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{alignSelf:'flex-start', top: heightPercentageToDP('2'), left: widthPercentageToDP('2')}}>
                <Image source={backButton} style={{width :widthPercentageToDP('13'), height :heightPercentageToDP('6'), resizeMode:'contain'}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SubscriptionScreen')}>

<Image source={gtcr} style={{resizeMode: 'contain',width: widthPercentageToDP(15),height: heightPercentageToDP(8),padding:10, marginLeft:"76%" }} />
</TouchableOpacity>
                
                </View>
                <ScrollView style={{ marginTop: heightPercentageToDP(10)}}
                    contentContainerStyle={{marginTop: heightPercentageToDP(0), justifyContent: 'center', alignItems: 'center',}}
                >
                    {favoritesData.map((item, index) =>{
                        return(
                            <View  key={index} style={{padding:30, flex: 1 }}>    
                                {/* This is the container for THE FORTUNES */}
                                <ImageBackground source={fortuneBox} imageStyle={{resizeMode:'stretch'}} style={{flex: 1, width: widthPercentageToDP(87), height: heightPercentageToDP(70), }}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize: actuatedNormalize(15), alignSelf: 'center', top: heightPercentageToDP(4),}}>{item.date}</Text>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', padding:12}}>
                                        <TouchableOpacity onPress={() => {
                                            // //Remove Fav
                                            // // favRef.update({
                                            // //     'favorites' : firebase.firestore.FieldValue.arrayRemove(...[{'date':item.date, 'fortune':item.fortune}])
                                                
                                            // // })
                                            // // reset by just removing it from the array, instead of recalling the whole function
                                            //  db.collection('users').doc(firebase.auth().currentUser.uid).update({
                                            //     'favorites' : firebase.firestore.FieldValue.arrayRemove(...[{'date':item.date, 'fortune':item.fortune}])
                                            //  }).catch(function(error) {
                                            //     console.error("Error removing document: ", error);
                                            //     });
                                            // //  .doc(docId).update({
                                            // //     posts: posts.filter(post => post.id !== deleteId);
                                            // //   })
                                             
    
                                            // setReset(true);
                                        }}>
                                            <Image source={XButton} style={{left: widthPercentageToDP(35), top: heightPercentageToDP(-2),width :widthPercentageToDP('5'), height :heightPercentageToDP('6'), resizeMode:'contain',}}/>
                                        </TouchableOpacity>
                                    </View>    
                                    
                                        {/* TODO : PLEASE FIX THE Text size, you can either scale up the image backgorund or scale down the text */}
                                        <ScrollView>
                                        <View style={{ top:heightPercentageToDP(3), width:'77%', alignSelf: 'center'}}>
                                            <Text adjustsFontSizeToFit={true} style={{ fontSize:actuatedNormalize(12)}}>{item.fortune}</Text>
                                        </View>
                                        </ScrollView>
                                </ImageBackground>
                        </View>
                        )
                    })}
                </ScrollView>
            </ImageBackground>
            <NavBar_fav/>
        </View>
    )
}

export default FavoritesScreen