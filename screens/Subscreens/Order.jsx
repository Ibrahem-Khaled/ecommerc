import {
    ScrollView, StyleSheet, Text, View, ActivityIndicator, Pressable, Image, TouchableOpacity, FlatList
} from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import Header from '../Componntes/Headrback'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { TextInput, Button } from 'react-native-paper';


const Order = () => {

    const navigation = useNavigation()
    const { userinfo } = useContext(AuthContext)

    const [phone, setPhone] = useState(0)
    const [contry, setContry] = useState('')
    const [city, setCity] = useState('')
    const [adress, setAdress] = useState('')
    const [postcode, setPostcode] = useState(0)
    const [notes, setNotes] = useState('')

    const [cart, setCart] = useState([])

    useEffect(() => {
        axios.post('https://arablife.online/api/cart', {
            user_id: userinfo.user.id,
        }).then(function (response) {
            setCart(response.data.data)
        }).catch(function (error) {
            alert(error.message);
        });
    }, []);

    async function Addorder() {
        if (phone && contry && city && adress && postcode && notes !== null) {
            let res = await axios.post('https://arablife.online/api/add/order', {
                user_id: userinfo.user.id,
                cart_id: cart.id,
                name: userinfo.user.name,
                email: userinfo.user.email,
                phone: phone,
                contry: contry,
                city: city,
                adress: adress,
                post_code: postcode,
                notes: notes,
            })
            let data = await alert('Your order created')
            navigation.navigate('taps')
        } else {
            alert('من فضلك ادخل جميع البيانات صحيحة')
        }
    }

    return (
        <ScrollView style={styles.main}>
            <Header Titel={'Orders'} />
            <TextInput
                label="phone"
                placeholder='phone'
                onChangeText={phone => setPhone(phone)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="Address"
                placeholder='Address'
                onChangeText={adress => setAdress(adress)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                multiline
                style={styles.inbt}
            />
            <TextInput
                label="Contry"
                placeholder='Contry'
                onChangeText={contry => setContry(contry)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="City"
                placeholder='City'
                onChangeText={city => setCity(city)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="PostCode"
                placeholder='PostCode'
                onChangeText={postcode => setPostcode(postcode)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                style={styles.inbt}
            />
            <TextInput
                label="Notes"
                placeholder='Notes'
                onChangeText={notes => setNotes(notes)}
                outlineStyle={{ borderRadius: 10, borderColor: "#EBF0FF" }}
                mode='outlined'
                multiline
                style={styles.inbt}
            />

            <Button
                style={styles.btn}
                mode="contained"
                onPress={Addorder}>
                Order Now
            </Button>
        </ScrollView>
    )
}

export default Order

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFF"
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
        margin: 100
    }
})