import React, {useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {TouchableOpacity} from 'react-native';
import styles from "../styles/styles";
import {Image, ImageBackground, Linking, ScrollView, View,Text,TextInput} from "react-native";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import gemsbg from "../../assets/FortuneCoffeePNGassets/Subscription/Gemsbg.png";
import bgstars from '../../assets/Bgstars.png'
import CheckLoginToken from "../../util/validators/CheckLoginToken";
import LoginChecker from "../../util/validators/LoginChecker";
import Continue from '../../assets/FortuneCoffeePNGassets/Continue.png'
import NavBar from "../navbars/NavBar_Favorites";
import { heightPercentageToDP } from "../../util/scaler";


function Payment({navigation, route}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [postal, setPostal] = useState('')
    const [cityState, setCityState] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [exp_month, setExp_Month] = useState('')
    const [exp_year, setExp_Year] = useState('')
    const [cvc, setCvc] = useState('')
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  
  
    function toStripe(name, email, phone, address, city, country, postal, cityState, cardNumber, exp_month, exp_year, cvc) {
      fetch('https://peaceful-woodland-13730.herokuapp.com/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          address: {
            line1: address,
            city: city,
            country: country,
            postal_code: postal,
            state: cityState
          },
          subscription: route.params.subscription,
          card: {
            number: cardNumber,
            exp_month: exp_month,
            exp_year: exp_year,
            cvc: cvc
          }
        })
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          db.collection('users').doc(firebase.auth().currentUser.uid)
          .set({
            subscriptionLevel: route.params.subscription,
            stripeId: data.subscription.customer,
            subscriptionActive: true
          }).then(() => {
            console.log('yes')
          }).catch(error => console.log(error))
        });
    }
    

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            CheckLoginToken().then(async (result)=>{
                console.log("User TYPE  : " , result)
                // Navigate the user's based off of results
                // TODO, log the user in via firestore
                if(result === "USER"){
                  console.log("THE USER IS A USER")
                  // Login The user
                  LoginChecker().then((results) =>{
                    console.log("USER IS LOGGED IN : " , results)
                    
                  });
                }
                if(result === "GUEST"){
                  LoginChecker().then((results) =>{
                    console.log("USER IS LOGGED IN : " , results)

                    if(!results){
                        navigation.navigate('SignUp')
                    }
                  });
                }
              });
        });
        return unsubscribe;
    },[navigation])


    return paymentSuccessful ?(
        <View style={{flex: 1}}>
            <ImageBackground source={gemsbg} style={styles.bgfull}>
                    <View style={{ flex: 0.7, flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25, marginBottom:"50%" }}>
                        <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                                <Image source={backButton} style={styles.backButtonStyle}/>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ImageBackground>
        </View>
    ):(
        <>
         <View style={{  alignItems: 'center', height: '100%' ,justifyContent: 'center'}}>
            <ImageBackground source={bgstars} style={styles.bgfull}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 25,}}>
                        <View style={{position:'absolute', top:0, flexDirection:'row', width:'100%', margin:10}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                                <Image source={backButton} style={styles.backButtonStyle}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                   <View style={styles.flexInRows}></View>
                  <Text></Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 15, textAlign: 'left', alignSelf: 'stretch', marginLeft: 20, marginTop: 10 }}>Name</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="Name"
                  placeholder="   Enter name here"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={name => setName(name)}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Email</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="Email"
                  placeholder="   Enter Email Here"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={email => setEmail(email)}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Phone</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="Phone"
                  placeholder="   Enter Phone # Here"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={phone => setPhone(phone)}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Address</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="Address"
                  placeholder="   Address"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={address => setAddress(address)}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>City</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="City"
                  placeholder="   City"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={city => setCity(city)}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Country</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="Country"
                  placeholder="   Country"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={country => setCountry(country)}
                  />
              <View style={{ flexDirection: 'row', justifyContent:'space-between' , width: '90%', height: '5%' ,marginTop:15}}>
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch' }}>Postal</Text>
                  <TextInput style={styles.savedFortuneTextBox2}
                  label="Postal"
                  placeholder="   Postal"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={postal => setPostal(postal)}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch'}}>State</Text>
                  <TextInput style={styles.savedFortuneTextBox2}
                  label="State"
                  placeholder="   State"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={cityState => setCityState(cityState)}
                  />
                  </View>
                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Credit Card</Text>
                  <TextInput style={styles.savedFortuneTextBox}
                  label="Credit Card"
                  placeholder="   Card Number"
                  placeholderTextColor='#DCDCDC'
                  onChangeText={cardNumber => setCardNumber(cardNumber)}
                  />

                  <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Credit Card</Text>
                  <View style={{ flexDirection: 'row', width: '90%', height: '6%' }}>

                  <TextInput style={styles.savedFortuneTextBox2}
                      label="Month"
                      placeholder="      Month"
                      placeholderTextColor='#DCDCDC'
                  onChangeText={exp_month => setExp_Month(exp_month)}
                  />
                  <TextInput style={styles.savedFortuneTextBox2}
                      label="Year"
                      placeholder="      Year"
                      placeholderTextColor='#DCDCDC'
                      onChangeText={exp_year => setExp_Year(exp_year)}
                  />
                  <TextInput style={styles.savedFortuneTextBox3}
                      label="CVC"
                      placeholder="      CVC"
                      placeholderTextColor='#DCDCDC'
                      onChangeText={cvc => setCvc(cvc)}
                  />
                  </View>
                  <Text></Text>
                <TouchableOpacity onPress={() => {  toStripe(name, email, phone, address, city, country, postal, cityState, cardNumber, exp_month, exp_year, cvc)
                  }}>
                   <Image style={{backgroundColor:'red'}} source={{Continue}} />
                </TouchableOpacity>
        </ImageBackground>
        </View>
        </>
    )
}



export default Payment