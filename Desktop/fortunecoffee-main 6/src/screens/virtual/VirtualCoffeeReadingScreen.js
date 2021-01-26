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
import {widthPercentageToDP,heightPercentageToDP} from '../../../util/scaler';



function VirtualCoffeeReadingScreen({route}) {
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
    const type = route.params.type;
    console.log(type)

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

    const RenderCorrectButton = () =>{

        switch(type){
            case 'photo':{
                return (<>
                    <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimationScreen2',{type:'photo'})}>
                        <Image source={submitPhoto} style={{marginTop:'10%', width :widthPercentageToDP('37'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                    </TouchableOpacity>
                </>)
            }
            case 'palm':{
                return (<>
                    <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimationScreen2',{type:'palm'})}>
                        <Image source={submitPhoto} style={{marginTop:'10%', width :widthPercentageToDP('37'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                    </TouchableOpacity>
                </>)
            }
            case 'face':{
                return (<>
                    <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimationScreen2',{type:'face'})}>
                        <Image source={submitPhoto} style={{marginTop:'10%', width :widthPercentageToDP('37'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                    </TouchableOpacity>
                </>)
            }
            case 'coffee':{
                return (<>
                    <TouchableOpacity onPress={() => navigation.navigate('ReadingAnimationScreen2',{type:'coffee'})}>
                        <Image source={submitPhoto} style={{marginTop:'10%', width :widthPercentageToDP('37'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                    </TouchableOpacity>
                </>)
            }
            default:{
                break;
            }
        }

    }

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070631' }}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 0, width: '100%', justifyContent: 'space-between', padding: 25, marginTop: 18}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                <Image source={backButton} style={{width :widthPercentageToDP('13'), height :heightPercentageToDP('6'), resizeMode:'contain'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('VirtualOne')} style={{ marginTop: 10}}>
                    <Image source={useAVirtualCoffee} style={{width :widthPercentageToDP('37'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
                </TouchableOpacity>
            </View>
            {image && <Image source={{uri: image}} style={{marginTop:'30%', height: '30%', width: '60%', borderWidth:5, borderColor: '#FFF'}} />}
            <Image source={virtualImage} style={{marginTop:'10%', width :widthPercentageToDP(67), height :heightPercentageToDP(15), resizeMode:'contain'}}/>
            {image && <View>
                {RenderCorrectButton()}
            </View>}
            <TouchableOpacity onPress={pickImage}>
                <Image source={photoGallery} style={{marginTop:'5%', width :widthPercentageToDP('37'), height :heightPercentageToDP('5'), resizeMode:'contain'}} />
            </TouchableOpacity>
        </View>
    )
}

export default VirtualCoffeeReadingScreen