import React, {useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";

function Payment({navigation, route}) {
    const [result, setResult] = useState(null);

    console.log(route)

    const _handlePressButtonAsync = async () => {
        console.log(route.params.subscription)
        let subscriptionRoute = route.params.subscription;
        // Switch cases for each subscription location
        switch(subscriptionRoute){
            case "Amethyst": {
                console.log("Amethyst selected")
                let result = await WebBrowser.openBrowserAsync('https://payment-fortune-coffee.herokuapp.com');
                setResult(result);
                break;
            }
            case "Rose Quartz": {
                console.log("Amethyst selected")
                let result = await WebBrowser.openBrowserAsync('https://payment-fortune-coffee.herokuapp.com/rose');
                setResult(result);
                break;
            }
            case "Sapphire": {
                console.log("Amethyst selected")
                let result = await WebBrowser.openBrowserAsync('https://payment-fortune-coffee.herokuapp.com/sapphire');
                setResult(result);
                break;
            }
            case "Tiger's Eye": {
                console.log("Amethyst selected")
                let result = await WebBrowser.openBrowserAsync('https://payment-fortune-coffee.herokuapp.com/tiger');
                setResult(result);
                break;
            }
            default:{

            }
        }

    };

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            _handlePressButtonAsync();
        });
        return unsubscribe;
    },[navigation])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backButtonStyle}>
                <Image source={backButton} />
            </TouchableOpacity>
            <Text>{result && JSON.stringify(result)}</Text>

            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backButtonStyle}>
                <Text> Nice! You recieved fortunes and gems!</Text>

            </TouchableOpacity>
        </View>
    );

}



export default Payment