import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    ScrollView,
    Image, SafeAreaView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from './Authcontext';
import Spinner from 'react-native-loading-spinner-overlay';


const Register = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confpass, setConfpass] = useState('');
    const [scure, setScure] = useState(true);
    const [err, setErr] = useState(false);

    const { Register, loading } = useContext(AuthContext);

    return (
        <SafeAreaView
            style={{ flex: 1, resizeMode: "contine", backgroundColor: "#FFF" }}>
            <Spinner
                visible={loading}
            />
            <ScrollView
                contentContainerStyle={{ alignItems: "center", justifyContent: "space-around" }}
                style={{ flex: 1 }}>
                <Image
                    style={styles.logo}
                    source={require('../../Desktop/logo/logo.png')}
                />
                <Text style={styles.txt}>Welcome to E-Com!</Text>
                <Text style={[styles.txt, { color: "gray", fontWeight: "400", margin: 0 }]}>Let’s make your account.</Text>
                <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "space-around" }}>

                    <TextInput
                        style={styles.intbemails}
                        mode="outlined"
                        label="Your Email / Phone Number"
                        placeholder='Your Email / Phone Number'
                        placeholderTextColor={"#8F8F8F"}
                        //  error={true}
                        onChangeText={email => setEmail(email)}
                        right={<TextInput.Icon icon="email" color={'#9098B1'} />}
                    />
                    <TextInput
                        style={styles.intbemails}
                        mode="outlined"
                        label="Name"
                        // error={true}
                        placeholder='Name'
                        onChangeText={name => setName(name)}
                        placeholderTextColor={"#9098B1"}
                        right={<TextInput.Icon icon="pen" color={'#9098B1'} />}
                    />
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "85%",
                        justifyContent: "space-around",
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,
                        margin:5

                    }}>
                        <TextInput
                            style={[styles.intbemails, { margin: 0 }]}
                            mode="outlined"
                            label="Password"
                            error={err}
                            placeholder='Password'
                            onChangeText={pass => setPassword(pass)}
                            placeholderTextColor={"#9098B1"}
                            secureTextEntry={scure}
                            outlineStyle={{borderWidth:0}}

                        />
                        {scure == true ? <Feather
                            onPress={() => { scure == false ? setScure(true) : setScure(false) }}
                            name="eye" size={24} color="#9098B1" />
                            :
                            <Feather
                                onPress={() => { scure == false ? setScure(true) : setScure(false) }}
                                name="eye-off" size={24} color="#9098B1" />
                        }
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "85%",
                        justifyContent: "space-around",
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,

                    }}>
                        <TextInput
                            style={[styles.intbemails, { margin: 0 }]}
                            mode="outlined"
                            label="Confirm Password"
                            error={err}
                            placeholder='Confirm Password'
                            onChangeText={pass => setConfpass(pass)}
                            placeholderTextColor={"#9098B1"}
                            secureTextEntry={scure}
                            outlineStyle={{borderWidth:0}}
                        />
                        {scure == true ? <Feather
                            onPress={() => { scure == false ? setScure(true) : setScure(false) }}
                            name="eye" size={24} color="#9098B1" />
                            :
                            <Feather
                                onPress={() => { scure == false ? setScure(true) : setScure(false) }}
                                name="eye-off" size={24} color="#9098B1" />
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            password == confpass ? Register(name, email, password) : [setErr(true), alert('error password')]
                        }}
                        style={styles.btn}>
                        <Text style={styles.txtbtn}>Register now</Text>

                    </TouchableOpacity>
                </View>

                <Image
                    style={{ width: "95%" }}
                    resizeMode='contain'
                    source={require('../../Desktop/Or-line.png')} />


                <View style={{ width: "95%", justifyContent: "space-around", flexDirection: "row", margin: 15 }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("register"); }}>
                        <Image
                            style={styles.icon}
                            resizeMode='contain'
                            source={require('../../Desktop/apple.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("register"); }}>
                        <Image
                            style={styles.icon}
                            resizeMode='contain'
                            source={require('../../Desktop/google.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("register"); }}>
                        <Image
                            style={styles.icon}
                            resizeMode='contain'
                            source={require('../../Desktop/facebook.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", margin: 10 }}
                    onPress={() => { navigation.navigate("login"); }}>
                    <Text style={{
                        paddingLeft: 20, color: "gray",
                        fontSize: 13,
                    }}>Already have an account? </Text>
                    <Text style={{ color: "#002482", fontWeight: "bold", fontSize: 13, }}> Log In.</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        alignItems: "center"
    },
    txt: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        width: "90%",
        margin: 10
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
    icon: {
        width: 35,
        height: 35,
    },
});
export default Register;