import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    ScrollView,
    ImageBackground, Image, SafeAreaView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from './Authcontext';
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar } from 'expo-status-bar';

const Forgetpassword = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    return (
        <SafeAreaView
            style={{ flex: 1, resizeMode: "contine", backgroundColor: "#FFF" }}>
            <StatusBar hidden />

            <ScrollView
                contentContainerStyle={{ alignItems: "center", justifyContent: "space-around" }}
                style={{ flex: 1 }}>

                <Image
                    style={styles.logo}
                    source={require('../../Desktop/logo/logo.png')}
                />

                <Text style={styles.txt}>Forgot Password</Text>
                <Text style={[styles.txt, { color: "gray", fontWeight: "400", margin: 10, fontSize: 14 }]}>* We will send you a message to set or reset your new password</Text>

                <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "space-around" }}>

                    <TextInput
                        style={styles.intbemails}
                        mode="outlined"
                        label="Your Email / Phone Number"
                        placeholder='Your Email / Phone Number'
                        placeholderTextColor={"#9098B1"}
                        // error={true}
                        onChangeText={text => setEmail(text)}
                        right={<TextInput.Icon icon="email" color={'#9098B1'} />}
                    />

                    <TouchableOpacity
                        onPress={() => {  }}
                        style={styles.btn}>
                        <Text style={styles.txtbtn}>Send Verification</Text>

                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 160,
        height: 160,
        alignItems: "center"
        , resizeMode: "contain"
    },
    txt: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        width: "90%",
        margin: 5
    },
    txtbtn: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
    btn: {
        width: "85%",
        height: 52,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#51A229",
        justifyContent: "center",
        margin: 10
    },
    intbemails: {
        width: "85%",
        fontSize: 15,
        alignSelf: "center",
        margin: 5,
        backgroundColor: '#fff'
    },
});
export default Forgetpassword;