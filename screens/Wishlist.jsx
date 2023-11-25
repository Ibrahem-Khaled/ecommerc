import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './authScreens/Authcontext';
import {
    StyleSheet, Text, Image, Pressable, FlatList, View, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Wishlist() {
    const navigation = useNavigation()
    const { userinfo } = useContext(AuthContext)

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await fetch(`https://arablife.online/api/get-wishlist-product/${userinfo.user.id}`);
        const data = await resp.json();
        setData(data.wishlist);
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [data]);


    const Removewishlist = (id) => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/wishlistRemove/${id}/${userinfo.user.id}`)
            .then(res => {
                if (isMounted) {
                    if (res.data.success) {
                        alert('succes')
                    }
                }
            });
        return () => {
            isMounted = false
        };
    }


    return (
        <View style={styles.contaner}>
            <Text style={styles.txt}>Wishlist</Text>
            {loading ?
                <ActivityIndicator
                    size={'small'}
                    color={'red'}
                ></ActivityIndicator>
                :
                <FlatList
                    data={data}
                    contentContainerStyle={{ alignItems: "center" }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('productinfo', {
                                    slug: item.product.product_slug,
                                    id: item.product.id,
                                    hearts: true
                                })
                            }}
                            style={styles.todayview}>
                            <Image
                                style={styles.imagetoday}
                                source={{ uri: `https://arablife.online/${item.product.product_thumbnail}` }} />

                            <View style={{ width: "50%", justifyContent: "center" }}>
                                <Text style={styles.price}>{item.product.product_name}</Text>
                                <Text style={{
                                    color: '#848484',
                                    fontSize: 10,
                                    fontWeight: '700',
                                    margin: 5,
                                    textAlign: "left"
                                }}>{item.product.short_disc}</Text>
                            </View>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={styles.price}>${+(item.product.selling_price)} USD</Text>
                                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                    <Ionicons
                                        style={{ alignSelf: "flex-end", margin: 5 }}
                                        name="heart" size={24} color="#FB7181" />
                                    <Ionicons
                                        onPress={() => { Removewishlist(item.id) }}
                                        style={{ alignSelf: "flex-end", margin: 5 }}
                                        name="trash" size={24} color="gray" />
                                </View>
                            </View>
                        </Pressable>
                    }
                />
            }
            {data.length == 0 ?
                <Text style={{ textAlign: "center", marginBottom: "60%", fontWeight: "bold", color: "gray" }}>No Items Here</Text>
                : <Button
                    mode="contained"
                    style={{
                        width: "80%", alignSelf: "center",
                        height: 54,
                        borderRadius: 4,
                        backgroundColor: "red",
                        justifyContent: "center",
                        margin: 5
                    }}
                >
                    Add All to cart
                </Button>}

        </View>
    )
}

const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: "#FFF"
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
        margin: 5,
        textAlign: "left"
    },
})