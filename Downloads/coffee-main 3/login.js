import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import facebookTitle from './assets/Group6793.png';
import googleTitle from './assets/Group6805.png';
import login from './assets/Group6799.png';
import backgroundPicture from './assets/Union-1.png'

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundPicture} style={styles.backgroundImage}>
        <Text style={styles.title}> 
          fortune coffee
        </Text>
        <Text style={styles.underTitle}> 
        </Text>
        <TouchableOpacity onPress={() => console.log('google pressed')}>
          <Image source={googleTitle} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text> 
        </Text>
        <TouchableOpacity onPress={() => console.log('facebook pressed')}>
          <Image source={facebookTitle} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.underFacebook}> 
          OR LOG IN WITH EMAIL
        </Text>
        <TextInput style={styles.textBox}
          label="Email"
          placeholder = "   Email address"
          placeholderTextColor='#DCDCDC'
        />
        <TextInput style={styles.textBox}
          label="Password"
          placeholder = "    Password"
          placeholderTextColor='#DCDCDC'
        />
        <Text>
        </Text>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => console.log('Sign up pressed')}>
          <Image source={login} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.underSignup}> 
          Forgot Password?{"\n"}
          Create a new 
          <TouchableOpacity onPress={() => console.log('account pressed')}>
            <Text style={styles.login}> account</Text>
          </TouchableOpacity>
        </Text>
      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#483D8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 160,
    height: 130,
  },
  buttonImage: {
    width: 360,
    height: 38,
    paddingBottom: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40
  },
  instructions: {
    color: '#888',
    fontSize: 18,
  }, 
  title: {
    color: '#FFF',
    fontSize: 40,
    textAlign: 'center'
  },
  login: {
    color: '#1E90FF',
    fontSize: 20,
    marginTop: 10
  },
  underTitle: {
    color: '#0080ff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  }, 
  underSignup: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
  }, 
  underFacebook: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
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
  textBox:{
    margin: 15,
    height: 60,
    width: 360,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 40
  },
  backgroundImage:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 2
  }
});

