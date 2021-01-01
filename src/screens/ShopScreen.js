
// Mostly done. Still need back button and add onPress with href to shopify site
import {useNavigation} from "@react-navigation/native";
import {Image, Linking, ScrollView, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../styles/styles";
import galaxy from "../../assets/FortuneCoffeePNGassets/shopPage/galaxy.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import shop from "../../assets/FortuneCoffeePNGassets/shopPage/Shop.png";
import NavBar from "../navbars/NavBar";
import React from "react";
import ShopDatabase from "../arrays/ShopDatabase";

function ShopScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.shopContainer}>
            <Image source={ galaxy } style={styles.shopBackgroundContainer} />
            <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:16}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('ProfileLoggedIn')}}>
                    <Image source={backButton} style={styles.backButtonStyle}/>
                </TouchableOpacity>
                <Image source={shop} style={{position:'absolute', alignSelf:'center', right:'43%', top: 60}} />
            </View>
            <View style={{paddingTop:100}}></View>
            {
                ShopDatabase.map((item, index) =>{
                    return(
                        <View key={index} style={{padding:30}}>
                            <Image source={item.img} style={styles.coffeeImageDimension} />
                            <TouchableOpacity onPress={()=>{Linking.openURL(item.URL)}}>
                                <Image source={item.buyButton} style={styles.coffeeBuyButton} />
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
            <View style={{paddingBottom:150}}></View>
            <NavBar/>
        </ScrollView>
    )
}

export default ShopScreen
