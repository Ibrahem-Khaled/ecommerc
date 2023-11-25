import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Header from '../Componntes/Headrback';
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';



const Changepassword = ({ route }) => {
    const { id } = route.params

    const [old_password, setOld_password] = useState()
    const [new_password, setNew_password] = useState()
    const [conf_password, setConf_password] = useState()

    const navigation = useNavigation()

    async function Addorder() {
        if (new_password == conf_password) {
            let res = await axios.post(`https://arablife.online/api/user/changepassword`, {
                id: id,
                old_password: old_password,
                new_password: new_password,
            })
            alert('تم تغيير كلمة السر بنجاح')
            navigation.goBack()
                .catch(
                    alert('يجب ملئ جميع البيانات صحيحا')
                )
        } else {
            alert('كلمتي السر غيؤ متطابقتان')
        }

    }

    return (
        <View style={styles.main}>
            <Header Titel={'Profile'} />
            <TextInput
                label="old password"
                placeholder='old password'
                onChangeText={old => setOld_password(old)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="new password"
                placeholder='new password'
                onChangeText={news => setNew_password(news)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="new password"
                placeholder='new password'
                onChangeText={conf => setConf_password(conf)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <Button
                style={styles.btn}
                mode="contained"
                onPress={Addorder}>
                Update Now
            </Button>
        </View>
    )
}

export default Changepassword

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    inbt: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#fff"
    },
    btn: {
        width: "70%",
        alignSelf: "center",
        height: 60,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: 'red',
        margin: 10
    },
})