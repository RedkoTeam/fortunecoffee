import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity,ScrollView} from 'react-native';
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
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler'

function SubscriptionScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.virtualContainer}>
                <ImageBackground source={subBackground} style={styles.virtualOne}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18 }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{
                                left:widthPercentageToDP(0),
                                top:heightPercentageToDP(3)
                            }}>
                                    <Image source={backButton} />
                    </TouchableOpacity>
                </View>
 
                    <Image source={subscriptionDescription} style={{width: widthPercentageToDP(70), height: heightPercentageToDP(25), marginTop: heightPercentageToDP(-6), resizeMode:'contain'}}/>
                    <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column',alignItems: 'center', }}>


                            <TouchableOpacity onPress={ () => navigation.navigate('Payment', {
                                subscription: 'Amethyst'
                            })}>
                                <Image source={sub1} style={{ width: widthPercentageToDP(80), height: heightPercentageToDP(12.3), resizeMode:'contain'}}/>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={ () => navigation.navigate('Payment', {
                                 subscription: 'Rose Quartz'
                            })}>
                                <Image source={sub2} style={{width: widthPercentageToDP(70), height: heightPercentageToDP(10.2), resizeMode:'contain', right: 3, marginTop: -4}}/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Payment', {
                                subscription: 'Sapphire'
                            })}>
                                <Image source={sub4} style={{width: widthPercentageToDP(70), height: heightPercentageToDP(10), resizeMode:'contain', right: 3,marginTop: 1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Payment', {
                                subscription: "Tiger's Eye"
                            })}>

                                <Image source={sub3} style={{width: widthPercentageToDP(70), height: heightPercentageToDP(10), resizeMode:'contain', right: 3,marginTop: 4}}/>
                            </TouchableOpacity>
                            
                        </View>
                        </ScrollView>
                      
                </ImageBackground>
            <NavBar/>
        </View>
    )
}

export default SubscriptionScreen
