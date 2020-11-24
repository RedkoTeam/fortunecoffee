import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import reading from './assets/reading.png';
import sharePhoto from './assets/sharePhoto.png';
import largeTitle from './assets/largeTitle.png';

export default function App() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        // workaround for web sharing
        if (Platform.OS === 'web') {
            let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
            setSelectedImage({ localUri: pickerResult.uri, remoteUri });
        } else {
            setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
        }
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    };

    if (selectedImage !== null) {
        return (
            // must wrap all code in navigation container
            <NavigationContainer>
                <View style={styles.container}>
                    <Image
                        source={{ uri: selectedImage.localUri }}
                        style={styles.thumbnail}
                    />
                    <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Share this photo</Text>
                    </TouchableOpacity>
                </View>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Image source={largeTitle} style={styles.appLogo} />
                <View style={styles.logoContainer}>
                    <Image source={reading} style={styles.logo} />
                    <Image source={sharePhoto} style={styles.logo} />
                </View>
                <Text style={styles.instructions}>
                    To share a photo from your phone with a friend, just press the button below!
        </Text>
                <StatusBar style="auto" />

                <TouchableOpacity
                    onPress={openImagePickerAsync}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: "row",
        padding: 20,
    },
    logo: {
        width: 160,
        height: 130,
        marginHorizontal: 10,
    },
    appLogo: {
        width: 320,
        height: 38,
        paddingBottom: 30
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },

});

