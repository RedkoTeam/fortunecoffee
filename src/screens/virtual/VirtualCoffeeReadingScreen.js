import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import backButton from "../../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import useAVirtualCoffee from "../../../assets/useAVirtualCoffee.png";
import virtualImage from "../../../assets/virtualImage.png";
import submitPhoto from "../../../assets/submitPhoto.png";
import photoGallery from "../../../assets/photoGallery.png";



function VirtualCoffeeReadingScreen() {
    const [image, setImage] = useState(null);
    // useEffect(() => {
    //   async () => {
    //     if (Platform.OS !== 'web'){
    //       const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    //   }
    // });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect: [3,2],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled){
            setImage(result.uri);
        }
    };

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070631' }}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 0, width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{alignContent: 'left'}} >
                    <Image source={backButton}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')} style={{alignContent: 'right', marginTop: 10}}>
                    <Image source={useAVirtualCoffee}/>
                </TouchableOpacity>
            </View>
            {image && <Image source={{uri: image}} style={{marginTop:20, height: '40%', width: '80%', borderWidth:5, borderColor: '#FFF'}} />}
            <Image source={virtualImage} style={{marginTop:10}}/>
            {image && <View>
                <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimationScreen2')}>
                    <Image source={submitPhoto} style={{marginTop:30}} />
                </TouchableOpacity>
            </View>}
            <TouchableOpacity onPress={pickImage}>
                <Image source={photoGallery} style={{marginTop:30}} />
            </TouchableOpacity>
        </View>
    )
}

export default VirtualCoffeeReadingScreen