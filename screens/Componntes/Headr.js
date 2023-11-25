import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Pressable, Image
} from 'react-native';
import axios from 'axios';




export default function Header() {

    const { userinfo } = useContext(AuthContext)
    const navigation = useNavigation()
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        async function Userdata() {
            let res = await axios.get(`https://arablife.online/api/user/date/${userinfo.user.id}`)
            setDatas(res.data)
        }
        Userdata()
    });

    return (
        <Pressable
            onPress={() => { navigation.navigate('account') }}
            style={styles.container}>
            <StatusBar hidden />

            {datas.photo !== null ?
                <Image
                    style={styles.image}
                    source={{ uri: `https://arablife.online/${datas.photo}` }} />
                :
                <Image
                    style={styles.image}
                    source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }} />
            }
            <View style={styles.viw} >
                <Text style={styles.txt}>{userinfo.user.name}</Text>
            </View>
        </Pressable >
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 5
    },
    txt: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000",
        textAlign: "left"
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 35 * 2,
        resizeMode: "contain",
        margin: 10
    },
});

