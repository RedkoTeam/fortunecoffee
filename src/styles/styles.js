import {StyleSheet} from "react-native";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler'

const styles = StyleSheet.create({
    defaultFont: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 17
    },
    overlay:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'red',
        opacity: 0.3
    },
    mainContainer: {
        flex:1,
        backgroundColor: '#070631',
    },
    shopContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#070631',
    },
    getCrystalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tapCard: {
        color: '#FFF',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 250,
    },
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    authButton1: {
        right: 90,
        top: 30
    },
    authButton2: {
        left: 90,
        top: 30,
    },
    appTitle: {
        paddingBottom: 30,
        paddingTop: 30,
    },
    ellipse: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: '#483D8B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImage: {
        paddingBottom: 50,
        borderRadius: 30,
    },
    getCrystalImage: {
        width: 300,
        height: 38,
        paddingBottom: 50,
        borderRadius: 30,
        marginTop: 265
    },
    instructions: {
        color: '#888',
        fontSize: 18,
    },
    underTitle: {
        color: '#0080ff',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
    },
    xbutton: {
        padding: 20,
        borderRadius: 5,
        marginLeft: 280,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    textBox: {
        margin: 15,
        height: "7%",
        width: '87%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
    },
    backgroundImage: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        opacity: 0.7,
    },
    readingAnimationBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
        width:'100%',
        opacity: 0.8
    },
    readingCoffeeImage: {
        top: 0,
    },
    virtualContainer: {
        flex: 1,
        backgroundColor: '#070631',
        width:'100%'

    },
    virtualOne: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        opacity: 0.7,
    },

    bgfull: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        opacity: 1,
    },

    bgfull2: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        opacity: 0.3,
        
    },
        bgfull1: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height:'110%',
        opacity: 1,
        
    },

    flexInRows: {
        position:'relative',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'100%',
        margin: 16,
    },
    flexInRowsCoffee: {
        flex: 1,
        paddingTop: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        width:'100%',
        alignItems:'flex-end',
    },
    readingTableContainer: {
        flex: 1,
        width:'95%',
        alignSelf:'center',
        alignItems:'center',
        padding: 15,
        marginBottom:200
    },

    readingTableContainer2: {
        width:'90%',
        alignContent:'stretch',
        padding:10,

    },


    helloUserTextContainer: {     
        justifyContent:'center',
        fontSize:35,
        fontStyle:'normal',
        fontWeight:'bold',
        color:'#FFFFFF',
        textShadowColor: 'rgba(47, 145, 211, 0.76)',
        textShadowOffset: {
            width:2,
            height:2
        },
        textShadowRadius:1
    },
    coffeeImageDimension: {
        width: 370,
        height: 550,
        resizeMode: 'contain',
    },
    coffeeBuyButton: {
        width: 310,
        height: 40,
        resizeMode:'contain',
        position: 'absolute',
        bottom: 25,
        left: 35,
    },
    shopBackgroundContainer: {
        position:'absolute',
        width:'100%',
        height:'100%'
    },
    crystalBackground: {
        flex:1,
        width: 350,
        height: 400,
        justifyContent: "center",
        marginHorizontal: 12,
        marginBottom: 450
    },
    subBackgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        padding: 2
    },
    cameraContainer: {
        flex: 1,
    },
    cameraPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor : '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 5,
        margin: 40,
    },
    savedFortuneTextBox: {
        height: "4%",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        marginTop:10,
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    savedFortuneTextBox0: {
        height: '11%',
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    savedFortuneTextBox2: {
        height: "100%",
        width: "25%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    savedFortuneTextBox3: {
        height: "100%",
        width: "50%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    flexRowX: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'100%',
        paddingTop: '10%',
        padding: 12,
    },
    backButtonStyle: {
        position: 'absolute',
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(3),
    },

    backButtonStyle2: {
        position: 'absolute',
        left:widthPercentageToDP(5),
        top:heightPercentageToDP(7),
    },

    backButtonStyle1: {
        marginTop:50,
        marginRight: 300,
        padding:25,
        width :widthPercentageToDP('5'),
        height :heightPercentageToDP('5')
    
    }
});


export default styles;