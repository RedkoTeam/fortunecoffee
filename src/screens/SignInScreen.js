import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import SaveItemInStorage from "../../util/SaveItemInStorage";
import RetrieveData from "../../util/GetItemInStorage";
import StoreData from "../../util/SaveItemInStorage";
import * as firebase from "firebase";
import {
    Button,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Text,
    TextInput,
    View
} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Overlay} from "react-native-elements";
import styles from "../styles/styles";
import signBackground from "../../assets/FortuneCoffeePNGassets/Sign/SignBackground.png";
import backButton from "../../assets/FortuneCoffeePNGassets/reading/backButton.png";
import signTitle from "../../assets/FortuneCoffeePNGassets/Sign/signTitle.png";
import signEmailText from "../../assets/FortuneCoffeePNGassets/Sign/signEmailText.png";
import {Formik} from "formik";
import LoginValidationSchema from "../../util/validators/LoginValidationSchema";
import loginButton from "../../assets/FortuneCoffeePNGassets/Sign/LogInButton.png";
import forgotPasswordText from "../../assets/FortuneCoffeePNGassets/Sign/forgotPasswordText.png";
import createNewText from "../../assets/FortuneCoffeePNGassets/Sign/createaNewText.png";
import accoutText from "../../assets/FortuneCoffeePNGassets/Sign/accountText.png";

function SignInScreen() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [currentError, setCurrentError] = useState("");
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const SetTokenInLocalStorage = async (email, pass) => {
        try{

            // THIS IS A BAD WAY OF DOING THIS. But due to time constraint, we just do it like this for now
            // IN the future need to implement a token based login, should never expose user's credentials like so
            await SaveItemInStorage("AUTH_EMAIL", email)
            await SaveItemInStorage("AUTH_PASSWORD", pass)
            console.log("Stored New Credentials")

        }catch(e){
            console.log(e);

        }

        await RetrieveData('ONBOARDING').then( async (val) => {
                if(val !== 'DONE') { // if onboarding
                    await StoreData("ONBOARDING", 'PENDING');
                    //console.log(`OnBoarding State 1: ${RetrieveData('ONBOARDING')}`);
                    await StoreData("ONBOARDING", "DONE");
                    navigation.navigate('Onboarding');
                }
                else {
                    console.log(`Onboarding State: ${JSON.stringify(val)}`);
                }
            }
        )
    }

    // FIRESTORE
    const Signin = async (values) => {
        try{
            firebase.
            auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then((data) => {
                    console.log(data)
                    console.log('User signed in!');
                    SetTokenInLocalStorage(values.email, values.password)
                    // Store to firebase
                    navigation.navigate('ProfileLoggedIn')
                })
                .catch(async (error) => {
                    console.log(error)
                    if (error.code === 'auth/email-already-in-use') {
                        console.log(error.code)
                        setCurrentError(error.code)
                        toggleOverlay();
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log(error.code)
                        setCurrentError(error.code)
                        toggleOverlay();
                    }
                    console.log(error.code)
                    setCurrentError(error.code)
                    toggleOverlay();
                });
        }catch(e){
            console.log(e)
        }
    }

    const render_ShowError = () =>{
        // Display errors
        return visible ? (
            <View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
                    {/* PLEASE CHANGE ME TO WHATEVER YOU GUYS WANT */}
                    <TouchableOpacity onPress={() => console.log("Understood")} style={{alignItems: 'center'}}>
                        <Text style={{color: 'red', fontSize: 20}} >ERROR</Text>
                        <Text >{currentError}</Text>
                        <Button title={'Understood'} onPress={toggleOverlay} style={styles.button}></Button>
                    </TouchableOpacity>
                </Overlay>
            </View>
        ):<></>;
    }
    return (
        <>
            {render_ShowError()}
            <KeyboardAvoidingView style={styles.virtualContainer} behavior='padding'>
                <ImageBackground source={signBackground} style={styles.virtualOne}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButtonStyle}>
                        <Image source={backButton}/>
                    </TouchableOpacity>
                    <Image source={signTitle}  style={{marginTop:'20%', marginBottom:40}}/>
                    <View style={{marginTop:8, marginBottom:20}}>
                        {/* <TouchableOpacity onPress={() => console.log('google pressed')} style={{marginBottom:20}}>
            <Image source={googleTitle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('facebook pressed')}>
            <Image source={facebookTitle} />
          </TouchableOpacity>*/}
                    </View>
                    <Image source={signEmailText} style={{marginBottom:8}}/>
                    <Formik
                        validationSchema={LoginValidationSchema}
                        initialValues={{ email: '', password: ''}}
                        onSubmit={values => Signin(values)}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              isValid,
                          }) => (
                            <>
                                <TextInput style={styles.textBox}
                                           label="Email"
                                           placeholder="    Email address"
                                           placeholderTextColor='#DCDCDC'
                                           autoCapitalize='none'
                                           keyboardType='email-address'
                                           onChangeText={handleChange('email')}
                                />
                                {/* THIS SHOWS THE ERRORS NEEDED TO BE RESOLVED */}
                                {errors.email &&
                                <Text style={{ fontSize: 13, color: 'red' }}>{errors.email}</Text>
                                }
                                <TextInput style={styles.textBox}
                                           label="Password"
                                           placeholder="    Password"
                                           placeholderTextColor='#DCDCDC'
                                           autoCapitalize='none'
                                           passwordRules='required: lower; required: upper; required: digit; required: [-], minlength:5'
                                           onChangeText={handleChange('password')}
                                           secureTextEntry
                                />
                                {errors.password &&
                                <Text style={{ fontSize: 13, color: 'red' }}>{errors.password}</Text>
                                }
                                <TouchableOpacity style={{paddingTop: 8}} disabled={!isValid} onPress={handleSubmit}>
                                    <Image source={loginButton} style={styles.buttonImage}  />
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                    {/* <TouchableOpacity onPress={() => { onLogin(email, password) } }>
          <Image source={loginButton} style={styles.buttonImage} />
        </TouchableOpacity> */}
                    <Image source={forgotPasswordText} style={{marginTop:20}}/>
                    <View style={{flexDirection:'row', marginTop:12}}>
                        <Image source={createNewText} style={{marginRight:4}}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                            <Image source={accoutText}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            </KeyboardAvoidingView>
        </>
    )

}

export default SignInScreen