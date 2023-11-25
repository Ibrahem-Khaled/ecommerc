import { StyleSheet, Text, View, ScrollView, Dimensions, Image, Pressable, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import { SafeAreaView } from 'react-native'
import Header from '../Componntes/Headrback'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'


const widths = Dimensions.get('window').width

export default function Moreproinfo({ route, hearts }) {

    const { id, slug } = route.params;
    const { userinfo } = useContext(AuthContext)


    const navigation = useNavigation()

    const [product, setProduct] = useState([]);
    const [multiimage, setMultiimage] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/product/details/${id}/${slug}`)
            .then(res => {
                if (isMounted) {
                    if (res.data) {
                        setProduct(res.data.product);
                        setMultiimage(res.data.multiImage);
                        setColor(res.data.product_color);
                        setSize(res.data.product_size);
                        setLoading(false);
                    }
                }
            });
        return () => {
            isMounted = false
        };
    }, []);


    const [heart, setHeart] = useState(false);

    const Addwishlist = () => {
        axios.post(`https://arablife.online/api/add-to-wishlist/${id}/${userinfo.user.id}`, {}).then(function (response) {
            setHeart(true)
        })
    }

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

    const [addcart, setAddcart] = useState(hearts == null ? false : true);
    const [colors, setColors] = React.useState("");
    const [sizes, setSizes] = React.useState("");

    const Addtocart = () => {
        axios.post('https://arablife.online/api/add/cart', {
            user_id: userinfo.user.id,
            products_id: id,
            products_name: product.product_name,
            products_image: product.product_thumbnail,
            products_price: product.selling_price,
            qty: count,
            products_shortdisc: product.short_disc,
            size: sizes.toString(),
            color: colors.toString(),
            cart_id: cart.id,
        }).then(function (response) {
            setAddcart(true)
        }).catch(function (error) {
            alert(error.message);
        });
    }
    const [count, setCount] = useState(300);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? <ActivityIndicator
                size={'small'}
                color={'red'}
            ></ActivityIndicator> :
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Header />
                    <View>
                        <Image
                            style={styles.imgpage}
                            source={{ uri: `https://arablife.online/${product.product_thumbnail}` }}
                        />
                        <FlatList
                            data={multiimage}
                            keyExtractor={(item) => item.id}
                            horizontal
                            extraData={multiimage}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <Image
                                    style={{ width: 100, height: 100, margin: 5, borderRadius: 10 }}
                                    source={{ uri: `https://arablife.online/${item.photo_name}` }} />
                            }
                        />
                        <View style={styles.view}>
                            <Text style={{ color: "#272727", fontSize: 20, fontWeight: '500' }}>
                                {product.product_name}
                            </Text>
                            <AntDesign name="sharealt" size={24} color="black" />
                        </View>
                        <Text style={styles.barnd}>
                            {product.short_disc}
                        </Text>


                        <View style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between"
                        }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={styles.priceno}>${product.discount_price}</Text>
                                <Text style={styles.price}>${product.selling_price}</Text>
                                <Text style={styles.save}>({+product.selling_price - +product.discount_price}% Off)</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <MaterialCommunityIcons name="progress-clock" size={24} color="red" />
                                <Text style={[styles.save, { color: 'red' }]}>{product.delivered}</Text>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between"
                        }}>
                            <Text style={[styles.barnd, { fontWeight: "bold" }]}>
                                Quantity
                            </Text>
                            <View style={{
                                width: 90, height: 28, backgroundColor: "#EBF0FF", borderRadius: 8,
                                alignItems: "center", justifyContent: "space-between", flexDirection: "row"
                            }}>
                                <TouchableOpacity
                                    onPress={() => { setCount(count + 50) }}
                                    style={{
                                        width: 30, height: 28, backgroundColor: "#fff", justifyContent: "center"
                                    }}>
                                    <AntDesign name="plus" size={20} color="#9098B1" />
                                </TouchableOpacity>
                                <Text style={{
                                    fontWeight: '400', fontSize: 12, color: "#002482",
                                }}>{count}</Text>

                                <TouchableOpacity
                                    onPress={() => { count >= 350 ? setCount(count - 50) : [alert('اقل حد للنزول 300')] }}
                                    style={{
                                        width: 30, height: 28, backgroundColor: "#fff", justifyContent: "center"
                                    }}>
                                    <AntDesign name="minus" size={20} color="#9098B1" />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text style={[styles.barnd, { fontWeight: "bold" }]}>
                            Color
                        </Text>
                        <MultipleSelectList
                            setSelected={(val) => setColors(val)}
                            data={color.split(',')}
                            save="value"
                            placeholder='Select color'
                            search={false}
                            boxStyles={{ width: "80%", alignSelf: "center" }}
                            dropdownStyles={{ width: "80%", alignSelf: "center" }}
                        />

                        <View style={styles.view}>
                            <Text style={[styles.barnd, { fontWeight: "bold" }]}>
                                Select Size
                            </Text>
                            <Text style={[styles.save, { color: '#002482' }]}>Size Chart</Text>
                        </View>
                        <MultipleSelectList
                            setSelected={(val) => setSizes(val)}
                            data={size.split(',')}
                            save="value"
                            placeholder='Select size'
                            search={false}
                            boxStyles={{ width: "80%", alignSelf: "center" }}
                            dropdownStyles={{ width: "80%", alignSelf: "center" }}
                        />
                        <Text style={[styles.barnd, { fontWeight: "bold" }]}>long disc</Text>
                        <Text style={{
                            color: "#000",
                            fontSize: 14,
                            fontWeight: "400",
                            margin: 10,
                        }}
                        >{product.long_disc}</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}>

                            <TouchableOpacity
                                onPress={Addwishlist}
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
                            <TouchableOpacity
                                onPress={addcart == false ? Addtocart : Addtocart}
                                style={[styles.btn, { backgroundColor: addcart == true ? '#fff' : '#FB1314' }]}>
                                <Text
                                    style={{ fontWeight: '400', color: addcart == true ? '#FB1314' : '#fff', fontSize: 14 }}
                                >Add to Bag</Text>
                                {addcart === false ?
                                    <Image
                                        style={styles.icon}
                                        source={require('../../Desktop/bottomicons/bag-outline.png')}
                                    />
                                    :
                                    <Image
                                        style={styles.icon}
                                        source={require('../../Desktop/bottomicons/bag.png')}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    pagerView: {
        width: widths,
        height: 520
    },
    imgpage: {
        width: "98%",
        height: 380,
        alignSelf: "center",
        borderRadius: 5,
        resizeMode: "contain",
        backgroundColor: "black",
        margin: 5
    },
    view: {
        width: '95%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center"
    },
    barnd: {
        color: "#272727",
        fontSize: 18,
        fontWeight: '400',
        margin: 10
    },
    priceno: {
        color: "#848484",
        fontSize: 14,
        fontWeight: "400",
        margin: 5,
        textDecorationLine: "line-through"
    },
    price: {
        color: "#272727",
        fontSize: 20,
        fontWeight: "400",
        margin: 5,
    },
    save: {
        color: "#0EB000",
        fontSize: 14,
        fontWeight: "400",
        margin: 5,
    },



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
        margin: 5
    },
    brand: {
        color: "#272727",
        fontSize: 18,
        fontWeight: "400",
        margin: 5
    },
    btn: {
        width: 160,
        height: 40,
        backgroundColor: "#FB1314",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FB1314",
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    icon: {
        width: 17,
        height: 17,
        resizeMode: "contain",
    },
    size: {
        color: "#000",
        fontSize: 12,
        fontWeight: "400",
        padding: 15,
        margin: 5,
    },

})