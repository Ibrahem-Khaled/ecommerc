import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import Header from './Componntes/Headr';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Bell from './Componntes/Bell';




export default function Search() {

    const navigation = useNavigation()

    const [searchQuery, setSearchQuery] = React.useState('');
    const [search, setSearch] = React.useState('');


    async function searchs() {
        let res = await axios.get(`https://arablife.online/api/search/${searchQuery}`)
        if (res.data.products) {
            let data = await setSearch(res.data.products);
            setLoading(false);
        }
    }

    useEffect(() => {
        searchs()
    },);

    const [datas, setDatas] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/date/categories`).then(res => {
            if (isMounted) {
                if (res.data.stuts === 200) {
                    setDatas(res.data.categories);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    return (
        <View style={styles.contaner}>
            <Header />
            <View style={{
                width: '100%',
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around", marginTop: 5
            }}>
                <TextInput
                    keyboardType='web-search'
                    placeholder='Search...'
                    style={{ backgroundColor: "#F2F3F2", borderRadius: 15, width: "80%", height: 45, textAlign: "center" }}
                    onChangeText={val => { [setSearchQuery(val), searchs()] }}
                />
                <Bell />
            </View>

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

            {search !== undefined ?
                <FlatList
                    data={search}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    renderItem={({ item }) =>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('productinfo', {
                                    slug: item.product_slug,
                                    id: item.id
                                })
                            }}
                            style={styles.todayview}>
                            <Image
                                style={styles.imagetoday}
                                source={{ uri: `https://arablife.online/${item.product_thumbnail}` }} />
                            <View style={{ width: "100%", backgroundColor: '#FFF', borderRadius: 16, }}>
                                <Text style={styles.txttoday}>{item.product_name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.price}>{item.selling_price}$</Text>
                                </View>
                            </View>
                        </Pressable>
                    }
                />
                :
                <Text style={styles.noitem}>No Items</Text>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: "#FFF"
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
    txthistory: {
        margin: 5,
        left: 15,
        color: "#223263",
        fontWeight: "600",
        fontSize: 14
    },
    dicont: {
        fontWeight: "200",
        fontSize: 14,
        alignSelf: 'center',
        color: "#fff",
        margin: 2
    },
    todayview: {
        width: "32%",
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
    noitem: {
        color: '#000',
        fontSize: 100,
        fontWeight: '700',
        margin: 5
    },

})