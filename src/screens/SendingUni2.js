import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import ViewPager from "@react-native-community/viewpager";
import {TouchableOpacity} from 'react-native-gesture-handler';
import sendingbg2 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone2.gif";
import styles from "../styles/styles";
import sendingbg3 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone3.gif";
import sendingbg4 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone4.gif";
import sendingbg from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone.gif";

import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import Nextbtn from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Next.png";
import React, {useRef} from "react";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';
git add .




function SendingUni2({}){
    const navigation = useNavigation();
    const pagerRef = useRef(null);
    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };
    return (
        
        <ViewPager style={styles.virtualContainer} initialPage={0} ref={pagerRef}>
            <View key="1">

            <ImageBackground source={sendingbg2} style={styles.bgfull}>

            
<TouchableOpacity onPress={() => handlePageChange(2)}>
    <Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0)}} />
</TouchableOpacity>

</ImageBackground>
            </View>
            <View key="2">
            <ImageBackground source={sendingbg3} style={styles.bgfull}>


<TouchableOpacity onPress={() =>  handlePageChange(3)} >
<Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0)}}/>
</TouchableOpacity>


</ImageBackground>

            </View>
            <View key="3">
            <ImageBackground source={sendingbg4} style={styles.bgfull}>


<TouchableOpacity onPress={() =>  handlePageChange(4)} >
<Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0)}}/>
</TouchableOpacity>

</ImageBackground>
            </View>

            <View key="4">
            <ImageBackground source={sendingbg} style={styles.bgfull}>


<TouchableOpacity onPress={()=>{navigation.navigate('Psychic')}}>
    <Image source={backButton} style={{marginBottom:heightPercentageToDP(80),marginRight:widthPercentageToDP(70)}} />
</TouchableOpacity>

</ImageBackground>
</View>
        </ViewPager>
    )
}





export default SendingUni2