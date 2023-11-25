import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './authScreens/Authcontext';
import {
    StyleSheet, Text, Image, TouchableOpacity, FlatList, View, Pressable, ScrollView, TextInput, ActivityIndicator
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';




export const Count = ({ item, qty, id }) => {

    const [count, setCount] = useState(+qty);

    const Updateqty = (cartid) => {
        axios.post(`https://arablife.online/api/update/cart/${cartid}`, {
            qty: count,
        }).then(function (response) {
        })
    }

    return (
        <View style={{
            width: 90, height: 28, backgroundColor: "#EBF0FF", borderRadius: 8,
            alignItems: "center", justifyContent: "space-between", flexDirection: "row"
        }}>
            <TouchableOpacity
                onPress={() => { setCount(count + 50), Updateqty(id) }}
                style={{
                    width: 30, height: 28, backgroundColor: "#fff", justifyContent: "center"
                }}>
                <AntDesign name="plus" size={20} color="#9098B1" />
            </TouchableOpacity>
            <Text style={{
                fontWeight: '400', fontSize: 12, color: "#002482",
            }}>{count}</Text>

            <TouchableOpacity
                onPress={() => { count >= 350 ? setCount(count - 50) : alert('اقل حد للنزول 300'), Updateqty(id) }}
                style={{
                    width: 30, height: 28, backgroundColor: "#fff", justifyContent: "center"
                }}>
                <AntDesign name="minus" size={20} color="#9098B1" />
            </TouchableOpacity>
        </View >
    )
}




export default function Cart() {

    const [pon, setPon] = useState(null);

    const navigation = useNavigation()
    const { userinfo } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await fetch(`https://arablife.online/api/get/cart/${userinfo.user.id}`);
        const data = await resp.json();

        setData(data.data);
        setLoading(false);
    };

    const Removeitemforcart = (id) => {
        axios.post('https://arablife.online/api/delete/cart', {
            cart_id: id,
        }).then(function (response) {
        })
    }

    const [totalAll, setTotalAll] = useState(null)

    async function getUserCar() {
        const response = await fetch(`https://arablife.online/api/get/cart/${userinfo.user.id}`)
        setData(response)
        var setTotal = response.data.data.map((product) => product.products_price).reduce((sum, price) => +sum + +price);
        setTotalAll(setTotal)
        return response
    }
    useEffect(() => {
        fetchData();
        getUserCar();
    }, [data]);

    return (
        <ScrollView style={styles.contaner}>
            <Text style={styles.txt}>Your Cart</Text>
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
                                    <TouchableOpacity
                                        onPress={() => { Removeitemforcart(item.id) }}>
                                        <Feather name="trash" size={24} color="black" />
                                    </TouchableOpacity>

                                </View>
                                <Count
                                    id={item.id}
                                    qty={item.qty} />
                            </View>
                        </Pressable>
                    )
                })}



            {!data.length == 0 ?
                <>
                    <View>
                        <View style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: 44,
                            borderWidth: 1,
                            borderColor: "#EBF0FF",
                            borderRadius: 5,
                            width: 327,
                            margin: 5
                        }}>
                            <TextInput
                                placeholderTextColor={"gray"}
                                placeholder='Enter Coupon Code'
                                style={{
                                    height: "100%",
                                    width: "70%",
                                    textAlign: "center",
                                    fontSize: 14,
                                    fontWeight: "bold"
                                }}
                                onChangeText={val => setPon(val)}
                            />
                            <Text
                                onPress={() => { !pon == null ? alert('success') : alert('not null') }}
                                style={{
                                    height: "100%",
                                    backgroundColor: "#FB1314",
                                    width: "30%",
                                    borderRadius: 5,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontSize: 14,
                                    color: "#FFF",
                                    fontWeight: "bold"
                                }}
                            >Apply</Text>
                        </View>
                        <Text
                            onPress={() => { navigation.navigate('offer') }}
                            style={styles.seeoffer}>See Offers</Text>

                        <View>
                            <View style={styles.item}>
                                <Text style={styles.txtitem}>Items</Text>
                                <Text style={styles.seeoffer}>${totalAll}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.txtitem}>Shipping</Text>
                                <Text style={styles.seeoffer}>$0.00</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.txtitem}>Promo Code (FREE100 Applied!)</Text>
                                <Text style={styles.seeoffer}>($0.00 )</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.txtitem}>Import charges</Text>
                                <Text style={styles.seeoffer}>$0.00</Text>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <Text style={{
                                fontWeight: "700", color: '#000', fontSize: 18,
                                margin: 10
                            }}>Total Price</Text>
                            <Text style={{
                                fontWeight: "700", color: '#038200', fontSize: 18,
                                margin: 10
                            }}>$766.86</Text>
                        </View>
                        <Button mode="contained"
                            style={{
                                width: "80%", alignSelf: "center",
                                height: 54,
                                borderRadius: 4,
                                backgroundColor: "red",
                                justifyContent: "center", margin: 5
                            }}
                            onPress={() => { navigation.navigate('order') }}>
                            Check Out
                        </Button>
                    </View></>
                : <></>}

            {data.length == 0 ?
                <Text style={{ textAlign: "center", marginTop: "60%", fontWeight: "bold", color: "gray" }}>No Items Here</Text>
                : <></>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    txt: {
        fontWeight: "700",
        fontSize: 18,
        color: "#000",
        margin: 15
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