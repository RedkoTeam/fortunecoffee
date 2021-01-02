import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import * as firebase from "firebase";
import LoginChecker from "../../util/validators/LoginChecker";
import {Image, ScrollView, Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../styles/styles";
import galaxy from "../../assets/FortuneCoffeePNGassets/shopPage/galaxy.png";
import savedFortunesTitle from "../../assets/FortuneCoffeePNGassets/savedFortunes/savedFortuneTitle.png";
import fortuneBox from "../../assets/FortuneCoffeePNGassets/savedFortunes/Box.png";
import NavBar_fav from "../navbars/NavBar";
import XButton from '../../assets/FortuneCoffeePNGassets/bi_x.png'
// FIRESTORE
import db from '../../util/firestore/firestore'

function FavoritesScreen() {
    const navigation = useNavigation();
    const [favoritesData, setFavoritesData] = useState([{"fortune" : "You're not logged in. Please come back and check after logging in"}]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [resetTriggered, setReset] = useState(false);


    // TODO: NEED  TO CHECK FOR ERRORS HERE. ASSUME THERE IS NO DATA AND WHAT DO YOU DO IF NO DATA
    // TODO: GRABBING DATA SHOULD BE THE LAST THING
    // Please run the function through the login checker first. Then go ahead and pull the data
    // Then check for the data before you do anything else. If the data format is correct, it it exists .etc
    //const favRef = db.collection('users').doc(firebase.auth().currentUser.uid);

    useEffect(()=>{
        let mounted = true;
        const unsubscribe = navigation.addListener('focus', () => {
            // Login Checker
            LoginChecker().then((results) =>{
                console.log("USER IS LOGGED IN : " , results)
                setIsLoggedIn(results)
                if(results){
                    //Default to logins, if the user is logged in but no favoruits are selected
                    setFavoritesData([{"fortune": "You are logged in, but you haven't selected a favorite!"}])
                    db.collection('users').doc(firebase.auth().currentUser.uid).get()
                        .then(uData => {
                            const userData = uData.data().favorites;
                            setFavoritesData(userData);
                            console.log(`USER DATA  ${JSON.stringify(favoritesData)}`);
                        })
                        .catch(error => console.log(error));
                }
                else{
                    navigation.navigate('SignUp');
                }
            });
        });
        return unsubscribe;

    },[navigation])

    useEffect(()=>{
        let mounted = true;
        setFavoritesData([])
        if(mounted){

            // TODO: NEED  TO CHECK FOR ERRORS HERE. ASSUME THERE IS NO DATA AND WHAT DO YOU DO IF NO DATA
            // TODO: GRABBING DATA SHOULD BE THE LAST THING
            // favRef.get()
            //     .then(uData => {
            //         const userData = uData.data().favorites;
            //         setFavoritesData(userData);
            //         console.log(`USER DATA  ${JSON.stringify(favoritesData)}`);
            //     })
            //     .catch(error => console.log(error));
        }
        setReset(false);
        return () => { mounted = false; }
    }, [resetTriggered])

    return (
        <View style={{flexGrow:1, justifyContent:'space-between'}}>
            <ScrollView contentContainerStyle={styles.shopContainer}>
                <Image source={ galaxy } style={styles.shopBackgroundContainer} />
                <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:16}}>
                    {/*} <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
          <Image source={backButton} style={styles.backButtonStyle}/>
        </TouchableOpacity>*/}
                    <Image source={savedFortunesTitle} style={{position:'absolute', alignSelf:'center', right:'28%', top: 100}} />
                </View>
                <View style={{paddingTop: 130}}></View>
                {
                    favoritesData.map((item, index) => {
                        // favorites data is showing up in the console.log but not populating on the screen
                        // this needs to be changed from a map to something else to correctly access the fortunes.
                        return(
                            <View key={index} style={{padding:30}}>
                                <Image source={fortuneBox} />
                                <View style={{flexDirection:'row', position: 'absolute', bottom:500, right:0, alignItems:'center', padding:12}}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize: 21, right: 75}}>{item.date}</Text>
                                    <TouchableOpacity onPress={() => {

                                        // TODO: CONDITIONAL RENDERER HERE IN CASE DATA DOESNT EXIST

                                        // favRef.update({
                                        //     'favorites' : firebase.firestore.FieldValue.arrayRemove(...[{'date':item.date, 'fortune':item.fortune}])
                                        // })
                                        setReset(true);
                                    }}>
                                        <Image source={XButton} style={{right:50, bottom:-5}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{position:'absolute', top:150, left: 60, width:'90%'}}>
                                    <Text style={{fontSize:17}}>{item.fortune}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{paddingBottom:180}}></View>
            </ScrollView>
            <NavBar_fav/>
        </View>
    )
}

export default FavoritesScreen