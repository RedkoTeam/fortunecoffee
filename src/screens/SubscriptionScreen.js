import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import subBackground from "../../assets/FortuneCoffeePNGassets/Subscription/subscriptionBackground.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import subscriptionDescription from "../../assets/FortuneCoffeePNGassets/Subscription/subscriptionDescription.png";
import sub1 from "../../assets/FortuneCoffeePNGassets/Subscription/subscription1.png";
import sub2 from "../../assets/FortuneCoffeePNGassets/Subscription/subscription2.png";
import sub4 from "../../assets/FortuneCoffeePNGassets/Subscription/subscription4.png";
import sub3 from "../../assets/FortuneCoffeePNGassets/Subscription/subscription3.png";
import NavBar from "../navbars/NavBar";
import React from "react";

function SubscriptionScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.virtualContainer}>
            <ImageBackground source={subBackground} style={styles.virtualOne}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backButtonStyle}>
                        <Image source={backButton} />
                    </TouchableOpacity>
                    <Image source={subscriptionDescription} style ={{marginTop:100}}/>

                    <TouchableOpacity onPress={ () => navigation.navigate('Payment', {
                        subscription: 'Amethyst'
                    })}>
                        <Image source={sub1} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Payment', {
                        subscription: 'Rose Quartz'
                    })}>
                        <Image source={sub2}  />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => navigation.navigate('Payment', {
                        subscription: 'Sapphire'
                    })}>
                        <Image source={sub4} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Payment', {
                        subscription: "Tiger's Eye"
                    })}>

                        <Image source={sub3} />
                    </TouchableOpacity>
                </View>
                <NavBar/>
            </ImageBackground>

        </View>
    )
}

export default SubscriptionScreen
