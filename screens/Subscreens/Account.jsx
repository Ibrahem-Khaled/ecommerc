import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../authScreens/Authcontext';
import { AntDesign, Foundation, Feather, Octicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function Header() {
    const navigation = useNavigation()


    return (
        <View style={styles.head}>
            <AntDesign
                onPress={() => { navigation.goBack() }}
                style={{ margin: 5 }}
                name="left" size={24} color="#848484" />
            <Text style={styles.txthead}>
                Your Account
            </Text>
        </View>
    )
}


idd = 0
const btns = [
    {
        id: idd++,
        navigation: '',
        name: 'Address Book',
    },
    {
        id: idd++,
        navigation: '',
        name: 'Send Feedback',
    },
]




export default function Account() {

    const navigation = useNavigation()
    const { userinfo } = useContext(AuthContext)
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        async function Userdata() {
            let res = await axios.get(`https://arablife.online/api/user/date/${userinfo.user.id}`)
            setDatas(res.data)
        }
        Userdata()
    });


    return (
        <SafeAreaView>

            <Header />

            <TouchableOpacity
                onPress={() => navigation.navigate('account')}
                style={{ flexDirection: "row", alignItems: "center" }}>

                {datas.photo !== null ?
                    <Image
                        style={{ width: 57, height: 57, borderRadius: 35 * 2, resizeMode: "contain", margin: 10 }}
                        source={{ uri: `https://arablife.online/${datas.photo}` }} />
                    :
                    <Image
                        style={{ width: 57, height: 57, borderRadius: 35 * 2, resizeMode: "contain", margin: 10 }}
                        source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }} />
                }
                <View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#000",
                        textAlign: "left",
                        margin: 5
                    }}>{datas.name}</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#848484",
                        textAlign: "left",
                        margin: 5
                    }}>{datas.email}</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.navigate('updateprof', {
                    id: datas.id,
                    name: datas.name,
                    email: datas.email,
                    phone: datas.phone,
                    address: datas.address,
                })
            }}>
                <View style={styles.maininfo}>
                    <View style={[styles.maininfosub, { width: '45%' }]}>
                        <MaterialIcons name="drive-file-rename-outline" size={24} color="#FB1314" />
                        <Text style={styles.txtinfo}>Name</Text>
                    </View>
                    <View style={[styles.maininfosub, { justifyContent: "space-between" }]}>
                        <Text style={[styles.txtinfo,
                        { marginLeft: 0, marginRight: 20, color: "#848484" }]}>{datas.name}</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </View>

                <View style={styles.maininfo}>
                    <View style={[styles.maininfosub, { width: '45%' }]}>
                        <Feather name="mail" size={24} color="#FB1314" />
                        <Text style={styles.txtinfo}>Email</Text>
                    </View>
                    <View style={[styles.maininfosub, { justifyContent: "space-between" }]}>
                        <Text style={[styles.txtinfo,
                        { color: "#848484" }]}>{datas.email}</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </View>

                <View style={styles.maininfo}>
                    <View style={[styles.maininfosub, { width: '45%' }]}>
                        <Octicons name="device-mobile" size={24} color="#FB1314" />
                        <Text style={styles.txtinfo}>Phone Number</Text>
                    </View>

                    <View style={[styles.maininfosub, { justifyContent: "space-between" }]}>
                        <Text style={[styles.txtinfo,
                        { color: "#848484" }]}>{datas.phone}</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate('changepassword', {
                    id: datas.id,
                })
            }}>
                <View style={styles.maininfo}>
                    <View style={[styles.maininfosub, { width: '45%' }]}>
                        <MaterialIcons name="lock-outline" size={24} color="#FB1314" />
                        <Text style={styles.txtinfo}>Change Password</Text>
                    </View>

                    <View style={[styles.maininfosub, { justifyContent: "space-between" }]}>
                        <Text style={[styles.txtinfo,
                        { color: "#848484" }]}>•••••••••••••••••</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </View>
            </TouchableOpacity>


            <Image
                resizeMode='contain'
                style={{ height: 2, width: "100%" }}
                source={require('../../Desktop/Line.png')}

            />

            {btns.map((item) => (
                <TouchableOpacity
                    onPress={() => { navigation.navigate(item.navigation) }}
                    style={styles.btn}
                    key={item.id}>

                    <Text style={styles.btntxt}>{item.name}</Text>

                </TouchableOpacity>
            ))}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    head: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginBottom: 5
    },
    txthead: {
        fontSize: 20,
        fontWeight: "400",
        left: 35
    },
    maininfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 15,
        width: "95%"
    },
    maininfosub: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "51%"
    },
    txtinfo: {
        fontWeight: "400",
        fontSize: 14,
        color: "#000",
        textAlign: "left"
    },
    btn: {
        margin: 11,
        left: 15
    },
    btntxt: {
        fontSize: 18,
        fontWeight: "400",
        color: "#272727",
        width: "65%"
    },
})