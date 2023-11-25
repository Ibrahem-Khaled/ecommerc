import { StyleSheet, Text, View, FlatList, Pressable, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import Header from '../Componntes/Headrback'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';




const Addwishlist = ({ id }) => {
    const [heart, setHeart] = useState(false);
    const { userinfo } = useContext(AuthContext)

    const Addwishlist = (cartid) => {
        axios.post(`https://arablife.online/api/add-to-wishlist/${cartid}/${userinfo.user.id}`, {})
            .then(function (response) {
                setHeart(true)
            })
    }
    return (
        <TouchableOpacity
            onPress={() => { heart == false ? Addwishlist(id) : Addwishlist }}
            style={[styles.btn, {
                borderColor: heart == false ? "#FB1314" : "#f59176",
                backgroundColor: heart == false ? "transparent" : "#f59176"
            }]}>
            <Text
                style={{ fontWeight: '400', color: "#272727", fontSize: 14 }}
            >Wishlist</Text>
            {heart === false ? <Image
                style={styles.icon}
                source={require('../../Desktop/bottomicons/heart-outline.png')}
            />
                :
                <Image
                    style={styles.icon}
                    source={require('../../Desktop/bottomicons/heart.png')}
                />
            }
        </TouchableOpacity>
    )
}

const Addtocart = ({ ide, slugs }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('productinfo', {
                    id: ide,
                    slug: slugs,
                })
            }}

            style={[styles.btn, { backgroundColor: '#FB1314' }]}>
            <Text
                style={{ fontWeight: '400', color: '#fff', fontSize: 14 }}
            >Add to Bag</Text>

            <Image
                style={styles.icon}
                source={require('../../Desktop/bottomicons/bag-outline.png')}
            />

        </TouchableOpacity>
    )
}

const Imagerandom = ({image}) => {

    let random = Math.floor(Math.random() * 10);

    return (
        <ImageBackground
            blurRadius={10}
            style={[styles.imagesmall, { justifyContent: "center" }]}
            source={{ uri: `https://arablife.online/${image}` }}
        >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", textAlign: "center" }}>+{random}</Text>
        </ImageBackground>
    )
}




export default function Productsforcate({ route }) {

    const navigation = useNavigation()
    const { name, id, slug } = route.params

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/product/category/${id}/${slug}`).then(res => {
            if (isMounted) {
                if (res.data.newProduct) {
                    setDatas(res.data.newProduct);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <Header
                Titel={`${name}`}
            />
            {loading ?
                <ActivityIndicator
                    size={'small'}
                    color={'red'}
                ></ActivityIndicator>
                :
                <FlatList
                    data={datas}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('productinfo', {
                                        id: item.id,
                                        slug: item.product_slug,
                                    })
                                }}
                                style={styles.mainbtn}
                                key={item.id}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Image
                                        style={styles.imagemain}
                                        source={{ uri: `https://arablife.online/${item.product_thumbnail}` }}
                                    />
                                    <View>
                                        <Image
                                            style={styles.imagesmall}
                                            source={{ uri: `https://arablife.online/${item.product_thumbnail}` }}
                                        />
                                        <Imagerandom 
                                        image={item.product_thumbnail}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.txt}>{item.product_name}</Text>
                                <Text style={styles.brand}>{item.short_disc}</Text>

                                <View style={{
                                    flexDirection: "row", alignItems: "center"
                                }}>
                                    <Text style={styles.priceno}>$ {item.discount_price}</Text>
                                    <Text style={styles.price}>$ {item.selling_price}</Text>
                                    <Text style={styles.save}>({+item.selling_price % +item.discount_price % 100}% Off)</Text>
                                </View>
                            </Pressable>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around"
                            }}>

                                <Addwishlist id={item.id} />
                                <Addtocart ide={item.id} slugs={item.product_name} />

                            </View>
                        </>
                    }
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    mainbtn: {
        width: "95%",
        alignSelf: "center",
    },
    imagemain: {
        width: 216,
        height: 216,
        resizeMode: "cover",
        borderRadius: 10
    },
    imagesmall: {
        width: 120,
        height: 103,
        resizeMode: "cover",
        borderRadius: 10,
        margin: 2
    },
    txt: {
        color: "#272727",
        fontSize: 20,
        fontWeight: "500",
        margin: 2,
        textAlign: "left"
    },
    brand: {
        color: "#272727",
        fontSize: 18,
        fontWeight: "400",
        margin: 2
    },
    priceno: {
        color: "#848484",
        fontSize: 14,
        fontWeight: "400",
        margin: 2,
        textDecorationLine: "line-through"
    },
    price: {
        color: "#272727",
        fontSize: 20,
        fontWeight: "400",
        margin: 2,
    },
    save: {
        color: "#0EB000",
        fontSize: 14,
        fontWeight: "400",
        margin: 2,
    },
    btn: {
        width: 160,
        height: 40,
        backgroundColor: "#FB1314",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FB1314",
        margin: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    icon: {
        width: 17,
        height: 17,
        resizeMode: "contain",
    },
})