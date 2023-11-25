import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet, Text, Image, Pressable, FlatList, View, ScrollView, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Componntes/Headr';
import Slidehome from './Componntes/Slidehome';
import axios from 'axios';

export default function Home() {

    const navigation = useNavigation();

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/date/categories`).then(res => {
            if (isMounted) {
                if (res.data.stuts === 200) {
                    setDatas(res.data.categories);
                    setLoading(false);
                }
                else if (res.data.stuts === 404) {
                    toast.error(res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);


    const [specialdeals, setSpecialdeals] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/date/special_deals`).then(res => {
            if (isMounted) {
                if (res.data.special_deals) {
                    setSpecialdeals(res.data.special_deals);
                }
                else if (res.data.stuts === 404) {
                    toast.error(res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    const [newproducts, setNewproducts] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/date/new`).then(res => {
            if (isMounted) {
                if (res.data.new) {
                    setNewproducts(res.data.new);
                }
                else if (res.data.stuts === 404) {
                    toast.error(res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    const [hotdeal, setHotdeal] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/date/hot_deals`).then(res => {
            if (isMounted) {
                if (res.data.hot_deals) {
                    setHotdeal(res.data.hot_deals);
                }
                else if (res.data.stuts === 404) {
                    toast.error(res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);


    const [specialoffer, setSpecialoffer] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/date/special_offer`).then(res => {
            if (isMounted) {
                if (res.data.special_offer) {
                    setSpecialoffer(res.data.special_offer);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);




    return (
        <ScrollView style={styles.container}>
            <Header />

            {loading ?
                <ActivityIndicator
                    size={'small'}
                    color={'red'}
                ></ActivityIndicator>
                :
                <FlatList
                    data={datas}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('proforcate', {
                                    name: item.category_name,
                                    id: item.id,
                                    slug: item.category_slug,
                                })
                            }}
                        >
                            <Image
                                style={styles.ico}
                                source={{ uri: `https://arablife.online/${item.category_image}` }} />
                            <Text style={styles.txt}>{item.category_name}</Text>
                        </Pressable>
                    }
                />
            }

            <Slidehome />

            <Text style={{ color: '#272727', fontSize: 20, margin: 5, fontWeight: '500' }}>Today’s Deals</Text>
            <FlatList
                data={specialdeals}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('productinfo', {
                                slug: item.product_slug,
                                id: item.id
                            })
                        }}
                        style={styles.todayview}>
                        <View style={{
                            width: 49, height: 50,
                            justifyContent: "center",
                            alignItems: "center", backgroundColor: "#FB1314",
                            alignSelf: "flex-end", borderBottomLeftRadius: 16, borderTopRightRadius: 16
                        }}>
                            <Text style={styles.dicont}>{+item.discount_price / 100}%</Text>
                            <Text style={styles.dicont}>off</Text>
                        </View>
                        <Image
                            style={styles.imagetoday}
                            source={{ uri: `https://arablife.online/${item.product_thumbnail}` }} />
                        <View style={{ width: "100%", backgroundColor: '#FFF', borderRadius: 16, }}>
                            <Text style={styles.txttoday}>{item.product_name}</Text>
                            <View style={{ flexDirection: 'row', left: 15 }}>
                                <Text style={styles.price}>{item.selling_price}$</Text>
                                <Text style={[styles.price, { textDecorationLine: "line-through" }]}>{item.discount_price}$</Text>
                            </View>
                            <View style={{ width: "90%", borderWidth: .5, borderColor: "#EDEDED", alignSelf: "center" }}></View>
                            <Text style={{ color: "#249B3E", fontSize: 16, fontWeight: "200", margin: 8 }}>Save -
                                {+item.selling_price - +item.discount_pric}$</Text>
                        </View>
                    </Pressable>
                }
            />

            <View style={{ width: "98%", borderWidth: 1, borderColor: "#EDEDED", alignSelf: "center" }}></View>

            <Text style={{ color: '#272727', fontSize: 20, margin: 5, fontWeight: '500' }}>New Products</Text>
            <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-around" }}>
                {newproducts.map((item) => {
                    return (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('productinfo', {
                                    slug: item.product_slug,
                                    id: item.id
                                })
                            }}
                            key={item.id}
                            style={[styles.todayview, { width: '45%' }]}>
                            <Image
                                style={styles.imagetoday}
                                source={{ uri: `https://arablife.online/${item.product_thumbnail}` }} />
                            <View style={{ width: "100%", backgroundColor: '#FFF', borderRadius: 16, }}>
                                <Text style={[styles.txttoday, { textAlign: "center", left: 0, }]}>{item.product_name}</Text>
                                <Text style={[styles.price, { textAlign: "center", left: 0, }]}>Under Rs.{item.selling_price}$</Text>
                            </View>
                        </Pressable>
                    )
                })}
            </View>

            <View style={{ width: "98%", borderWidth: 1, borderColor: "#EDEDED", alignSelf: "center" }}></View>

            <Text style={{ color: '#272727', fontSize: 20, margin: 5, fontWeight: '500' }}>Hot Deals</Text>
            <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-around" }}>
                {hotdeal.map((item) => {
                    return (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('productinfo', {
                                    slug: item.product_slug,
                                    id: item.id
                                })
                            }}
                            key={item.id}
                            style={[styles.todayview, { width: '45%' }]}>
                            <Image
                                style={styles.imagetoday}
                                source={{ uri: `https://arablife.online/${item.product_thumbnail}` }} />
                            <View style={{ width: "100%", backgroundColor: '#FFF', borderRadius: 16, }}>
                                <Text style={[styles.txttoday, { textAlign: "center", left: 0, }]}>{item.product_name}</Text>
                                <Text style={[styles.price, { textAlign: "center", left: 0, }]}>Under Rs.{item.selling_price}$</Text>
                            </View>
                        </Pressable>
                    )
                })}
            </View>
            <View style={{ width: "98%", borderWidth: 1, borderColor: "#EDEDED", alignSelf: "center" }}></View>

            <Text style={{ color: '#272727', fontSize: 20, margin: 5, fontWeight: '500' }}>special offer</Text>
            <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-around" }}>
                {specialoffer.map((item) => {
                    return (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('productinfo', {
                                    slug: item.product_slug,
                                    id: item.id
                                })
                            }}
                            key={item.id}
                            style={[styles.todayview, { width: '45%' }]}>
                            <Image
                                style={styles.imagetoday}
                                source={{ uri: `https://arablife.online/${item.product_thumbnail}` }} />
                            <View style={{ width: "100%", backgroundColor: '#FFF', borderRadius: 16, }}>
                                <Text style={[styles.txttoday, { textAlign: "center", left: 0, }]}>{item.product_name}</Text>
                                <Text style={[styles.price, { textAlign: "center", left: 0, }]}>Under Rs.{item.selling_price}$</Text>
                            </View>
                        </Pressable>
                    )
                })}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    ico: {
        width: 60,
        height: 60,
        alignSelf: "center",
        borderRadius: 60 * 2,
        margin: 8,
        resizeMode: "contain"
    },
    txt: {
        fontWeight: "600",
        fontSize: 14,
        alignSelf: 'center',
        color: "#000",
        margin: 2
    },
    dicont: {
        fontWeight: "200",
        fontSize: 14,
        alignSelf: 'center',
        color: "#fff",
        margin: 2
    },
    todayview: {
        width: 216,
        backgroundColor: "#F5F5F5",
        borderColor: "#EDEDED",
        borderWidth: 1,
        borderRadius: 16,
        margin: 5
    },
    imagetoday: {
        width: 80,
        height: 150,
        resizeMode: "cover",
        alignSelf: "center",
        borderRadius: 5,
        margin: 10,
    },
    txttoday: {
        fontWeight: "200",
        fontSize: 16,
        color: "#222",
        margin: 5,
    },
    price: {
        color: '#222',
        fontSize: 16,
        fontWeight: '700',
        margin: 5
    },

});

