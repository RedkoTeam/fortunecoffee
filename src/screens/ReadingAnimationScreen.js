import React, {useEffect, useRef} from "react";
import {Animated, Easing, Image, ImageBackground, InteractionManager, View} from "react-native";
import styles from "../styles/styles";
import readingAnimationBackground
    from "../../assets/FortuneCoffeePNGassets/readingAnimationPage/readingAnimationBackground.png";
import readingCoffee from "../../assets/FortuneCoffeePNGassets/readingAnimationPage/readingCoffee.png";
import coffee from "../../assets/FortuneCoffeePNGassets/readingAnimationPage/coffee.png";


function ReadingAnimationScreen({navigation}){
    const rotateValueHolder = useRef(new Animated.Value(0)).current;
    const startImageRotationFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.loop(
            Animated.timing(rotateValueHolder,
                { toValue: 1,
                    easing: Easing.quad,
                    duration: 3000,
                    useNativeDriver: false,
                }),
            {
                iterations: 1
            }
        ).start();
    };

    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['-45deg', '180deg'],
    });

    useEffect(startImageRotationFunction);
    {
        InteractionManager.runAfterInteractions(() => navigation.navigate("VirtualFive"));
    }
    InteractionManager.runAfterInteractions(() => setTimeout(() => { navigation.navigate('Reading') }, 1000000000000));

    return(
        <View style={styles.mainContainer}>
            <ImageBackground source={ readingAnimationBackground } style={ styles.readingAnimationBackground }>
                <Image source={ readingCoffee } style={ styles.readingCoffeeImage } />
                <Animated.View>
                    <Animated.Image style={ {
                        width: 200,
                        height: 200,
                        transform: [ { rotate: RotateData } ]
                    } }
                                    source={coffee}
                    />
                </Animated.View>
            </ImageBackground>
        </View>
    )
}

export default ReadingAnimationScreen
