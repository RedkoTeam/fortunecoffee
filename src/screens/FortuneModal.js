import {Text, View} from "react-native";
import styles from "../styles/styles";
import React from "react";

function FortuneModal() {
    return (
        <View style={styles.virtualContainer}>
            <Text> Hello </Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Fortune Modal</Text>
            </View>
        </View>
    )
}


export default  FortuneModal