
// Mostly done. Still need back button and add onPress with href to shopify site
import {useNavigation} from "@react-navigation/native";
import {Image, Linking, ScrollView, View, ImageBackground} from "react-native";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import galaxy from "../../assets/FortuneCoffeePNGassets/shopPage/galaxy.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import shop from "../../assets/FortuneCoffeePNGassets/shopPage/Shop.png";
import NavBar from "../navbars/NavBar";
import React from "react";
import ShopDatabase from "../arrays/ShopDatabase";
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';

function ShopScreen() {
    const navigation = useNavigation();
    return (
        <>
       <View style={styles.mainContainer}> 
            <ImageBackground source={galaxy} style={{flex: 1}}>
                <View style={{flex: 1,flexDirection: 'row', width: '100%', padding: 25, zIndex: 10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{alignSelf:'flex-start', top: heightPercentageToDP('3'), left: widthPercentageToDP('0')}}>
                        <Image source={backButton}/>
                    </TouchableOpacity>
                </View>
                    <ScrollView contentContainerStyle={styles.shopContainer}>
                        <View style={{}}></View>
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
                    </ScrollView>
            </ImageBackground>
            <NavBar/>
     </View>
    </>
    )
}

export default ShopScreen
