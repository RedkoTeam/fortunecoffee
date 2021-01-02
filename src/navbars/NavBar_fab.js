import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import Ellipse1 from "../../assets/FortuneCoffeePNGassets/HomePage/ellipse.png";
import styles from "../styles/styles";
import Horosbtn from "../../assets/FortuneCoffeePNGassets/HomePage/horosbtn.png";
import Psychicbtn from "../../assets/FortuneCoffeePNGassets/HomePage/psyhbtn.png";
import HomeB from "../../assets/FortuneCoffeePNGassets/HomePage/homeb.png";
import FavoritesW from "../../assets/FortuneCoffeePNGassets/HomePage/favw.png";
import Profilebtn from "../../assets/FortuneCoffeePNGassets/HomePage/Profile.png";
import React from "react";

function NavBar_fav(){
    const navigation = useNavigation();
    return(
        <View style={{flex:1, backgroundColor:'#070631', height:'30%', alignItems:'center', alignContent:'center'}}>
            <Image source={Ellipse1} style={styles.ellipse} />
            <View style={{flexDirection:'row', width:'80%', justifyContent: 'space-between', position:'absolute', bottom: "0%", paddingBottom:5}}>
                <TouchableOpacity onPress={() => navigation.navigate('HoroscopeMain')}>
                    <Image source={Horosbtn}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Psychic')}>
                    <Image source={Psychicbtn} style={{ marginRight:30, bottom:'75%'}}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={HomeB} style={{ bottom:'130%'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <Image source={FavoritesW} style={{ marginLeft:30, bottom:'75%'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileLoggedIn')}>
                    <Image source={Profilebtn} style={{ bottom: "0%", paddingBottom:5}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavBar_fav
