import {useNavigation} from "@react-navigation/native";
import React, {useRef} from "react";
import ViewPager from "@react-native-community/viewpager";
import styles from "../styles/styles";
import {Image, ImageBackground, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import OnboardingBg from "../../assets/FortuneCoffeePNGassets/Onboarding/Onboarding.png";
import Next from "../../assets/FortuneCoffeePNGassets/Onboarding/Next.png";
import OnboardingBg1 from "../../assets/FortuneCoffeePNGassets/Onboarding/Onboarding-1.png";
import OnboardingBg2 from "../../assets/FortuneCoffeePNGassets/Onboarding/Onboarding-2.png";
import getStarted from "../../assets/FortuneCoffeePNGassets/Onboarding/getStarted.png";

function Onboarding({}){
    const navigation = useNavigation();
    const pagerRef = useRef(null);
    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };
    return (
        <ViewPager style={styles.virtualContainer} initialPage={0} ref={pagerRef}>
            <View key="1">
                <ImageBackground source={OnboardingBg} style={styles.virtualOne}>
                    <View style={{justifyContent:'flex-end', paddingBottom: 20, height:'100%'}}>
                        <TouchableOpacity onPress={() => handlePageChange(1)} >
                            <Image source={Next} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View key="2">
                <ImageBackground source={OnboardingBg1} style={styles.virtualOne}>
                    <View style={{justifyContent:'flex-end', paddingBottom: 20, height:'100%'}}>
                        <TouchableOpacity onPress={() => handlePageChange(2)} >
                            <Image source={Next} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View key="3">
                <ImageBackground source={OnboardingBg2} style={styles.virtualOne}>
                    <View style={{justifyContent:'flex-end', paddingBottom: 20, height:'100%'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                            <Image source={getStarted} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </ViewPager>
    )
}


export default Onboarding