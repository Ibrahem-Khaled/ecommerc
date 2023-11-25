import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Header from '../Componntes/Headrback';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';



const Accountupdate = ({ route }) => {
    const { email, phone, name, id, address } = route.params

    const [phones, setPhones] = useState(phone)
    const [emails, setEmails] = useState(email)
    const [names, setNames] = useState(name)
    const [adresss, setAdresss] = useState(address)
    const [image, setImage] = useState(null);

    const navigation = useNavigation()

    async function Addorder() {

        let res = await axios.post(`https://arablife.online/api/userdata/update/${id}`, {
            name: names,
            phone: phones,
            email: emails,
            address: adresss,
            photo: image,
        })
        alert('Updated')
        navigation.goBack()
            .catch(
                alert('يجب ملئ جميع البيانات')
            )
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.main}>
            <Header Titel={'Profile'} />
            <TextInput
                label="name"
                placeholder='name'
                value={names}
                onChangeText={name => setNames(name)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="email"
                placeholder='email'
                value={emails}
                onChangeText={email => setEmails(email)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="phone"
                placeholder='phone'
                value={phones}
                onChangeText={phone => setPhones(phone)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="address"
                placeholder='address'
                value={adresss}
                onChangeText={address => setAdresss(address)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TouchableOpacity
                onPress={pickImage}
                style={styles.img}>
                {image && <Image source={{ uri: image }} style={styles.img} />}
            </TouchableOpacity>
            <Button
                style={styles.btn}
                mode="contained"
                onPress={Addorder}>
                Update Now
            </Button>
        </View>
    )
}

export default Accountupdate

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
    img: {
        width: 150,
        alignSelf: "center",
        height: 150,
        justifyContent: "center",
        borderRadius: 150 * 2,
        margin: 10,
        backgroundColor: "gray"
    },
})