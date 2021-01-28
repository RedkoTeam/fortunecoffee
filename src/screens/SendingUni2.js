import {useLinkTo, useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View} from "react-native";
import ViewPager from "@react-native-community/viewpager";
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from "../styles/styles";
import sendingbg from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone.gif";
import sendingbg2 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone2.gif";
import sendingbg3 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone3.gif";
import sendingbg4 from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Phone4.gif";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import Nextbtn from "../../assets/FortuneCoffeePNGassets/Psychic/manifest/Next.png";
import React, {useRef,useState} from "react";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler';
//import { Audio } from 'expo-av';




function SendingUni2(){
    const navigation = useNavigation();
    const pagerRef = useRef(null);
    const [sound, setSound] = useState();
    const handlePageChange = pageNumber => {
        console.log(pageNumber)
        pagerRef.current.setPage(pageNumber);
    };

   /* const playSound = async ()=>{
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../../assets/music.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
*/
   /* React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);
*/
  /*  React.useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async  () => {
            await playSound();
        });
        return unsubscribe;

      },[navigation])

*/
    return (
        <ViewPager style={styles.virtualContainer} initialPage={0} ref={pagerRef}>
            <View key="1">
                <ImageBackground source={sendingbg2} style={styles.bgfull}>
                <TouchableOpacity onPress={() => handlePageChange(1)}>
                    <Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0), width :widthPercentageToDP(30), height :heightPercentageToDP('8'), resizeMode:'contain'}} />
                </TouchableOpacity>
                </ImageBackground>
            </View>
            <View key="2">
                <ImageBackground source={sendingbg3} style={styles.bgfull}>
                    <TouchableOpacity onPress={() =>  handlePageChange(2)} >
                    <Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0), width :widthPercentageToDP(30), height :heightPercentageToDP('8'), resizeMode:'contain'}}/>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View key="3">
            <ImageBackground source={sendingbg4} style={styles.bgfull}>
                <TouchableOpacity onPress={async () => {
                    handlePageChange(3);
                    }}>
                <Image source={Nextbtn} style={{marginTop:heightPercentageToDP(67),marginRight:widthPercentageToDP(0), width :widthPercentageToDP(30), height :heightPercentageToDP('8'), resizeMode:'contain'}}/>
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
