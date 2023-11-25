import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet, Text, Image, Pressable, FlatList, View, ScrollView, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Componntes/Headrback';
import axios from 'axios';

export default function Offer() {

    const navigation = useNavigation();
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
            <Header Titel={'Offers'}/>
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
    },
    price: {
        color: '#222',
        fontSize: 16,
        fontWeight: '700',
        margin: 5
    },

});

