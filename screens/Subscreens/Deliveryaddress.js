import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import {
    StyleSheet, Text, Image, TouchableOpacity, FlatList, View, Pressable, ScrollView, TextInput, ActivityIndicator
} from 'react-native';
import Header from '../Componntes/Headrback';

let idd = 0
const array = [
    id = idd++,
    name = '',
    adress = '',
    status = 'Pinding',
    transaction_id = '',
    email = '',
    post_code = '',
]


const Delivery = () => {


    const { userinfo } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await fetch(`https://arablife.online/api/get/order/${userinfo.user.id}`);
        const data = await resp.json();
        if (data.orders == null) {
            setOrder(array)
            setLoading(false);
        } if (data.orders == undefined) {
            setOrder(array)
            setLoading(false);
        } else {
            setData(data.data);
            setOrder(data.orders)
            setLoading(false);
        }

    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.main}>
            <Header Titel={'Address'} />

            <View style={{ width: "95%", borderWidth: 1, borderRadius: 10, alignSelf: "center", borderColor: "gray" }}>
                <Text style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}>name :-{order.name}</Text>

                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                    <Text style={styles.txtitem}>Post Code :-{order.post_code}</Text>
                    <Text style={styles.txtitem}>notes :-{order.notes}</Text>
                </View>


                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                    <Text style={styles.txtitem}>contry :-{order.contry}</Text>
                    <Text style={styles.txtitem}>city :-{order.city}</Text>
                </View>

                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                    <Text style={styles.txtitem}>adress :-{order.adress}</Text>
                </View>
            </View>
        </ScrollView >
    )
}

export default Delivery

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    todayview: {
        width: "95%",
        borderColor: "#EDEDED",
        borderBottomWidth: 1,
        borderRadius: 16,
        margin: 4,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    imagetoday: {
        width: 87,
        height: 87,
        resizeMode: "contain",
        alignSelf: "center",
        borderRadius: 5,
        margin: 10
    },
    txttoday: {
        fontWeight: "200",
        fontSize: 16,
        color: "#222",
        margin: 5,
        left: 10
    },
    price: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
        margin: 5
    },
    seeoffer: {
        color: "#002482",
        fontSize: 14,
        fontWeight: "400",
        margin: 8,
        textAlign: "right"
    },
    txtitem: {
        color: "#9098B1",
        fontSize: 14,
        fontWeight: "400",
        margin: 8,
        textAlign: "right"
    },
    item: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignSelf: "center"
    },
})