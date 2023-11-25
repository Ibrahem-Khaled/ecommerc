import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import {
    StyleSheet, Text, Image, TouchableOpacity, FlatList, View, Pressable, ScrollView, TextInput, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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


const MyOrder = () => {




    const navigation = useNavigation()
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
            <Header Titel={'My orders'} />
            {loading ? <ActivityIndicator></ActivityIndicator> :
                data.map((item) => {
                    return (
                        <Pressable
                            key={item.id}
                            style={styles.todayview}>
                            <Image
                                style={styles.imagetoday}
                                source={{ uri: `https://arablife.online/${item.products_image}` }} />


                            <View style={{ width: "50%", justifyContent: "space-around" }}>
                                <Text style={styles.price}>{item.products_name}</Text>
                                <Text style={{
                                    color: '#002482',
                                    fontSize: 14,
                                    fontWeight: '700',
                                    margin: 5
                                }}>$ {+item.products_price * +item.qty}</Text>
                            </View>
                            <View style={{ justifyContent: "space-around" }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                                </View>
                                <Text>x{item.qty}</Text>
                            </View>
                        </Pressable>
                    )
                })
            }

            {order.map((orders) => {
                return (
                    <View 
                    key={orders.id}
                    style={{ width: "95%", borderWidth: 1, borderRadius: 10, alignSelf: "center", borderColor: "gray",margin:5 }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}>name :-{orders.name}</Text>

                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                            <Text style={styles.txttoday}>Stuts :-{orders.status}</Text>
                            <Text style={styles.txttoday}>transaction id :-{orders.transaction_id}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                            <Text style={styles.txtitem}>Post Code :-{orders.post_code}</Text>
                            <Text style={styles.txtitem}>notes :-{orders.notes}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                            <Text style={styles.txtitem}>totalamount :-{orders.totalamount}</Text>
                            <Text style={styles.txtitem}>shiping :-{orders.shiping}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                            <Text style={styles.txtitem}>contry :-{orders.contry}</Text>
                            <Text style={styles.txtitem}>city :-{orders.city}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                            <Text style={styles.txtitem}>email :-{orders.email}</Text>
                            <Text style={styles.txtitem}>phone :-{orders.phone}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                            <Text style={styles.txtitem}>adress :-{orders.adress}</Text>
                        </View>
                    </View>
                )
            })}

        </ScrollView >
    )
}

export default MyOrder

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