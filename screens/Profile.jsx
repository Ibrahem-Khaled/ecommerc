import { StyleSheet, Text, View, Image, Linking } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './authScreens/Authcontext';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import Terms from './Componntes/Terms';


idd = 0
const btns = [
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/shoping.png'),
        navigation: 'myorder',
        name: 'My Orders',
    },
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/location.png'),
        navigation: 'delivery',
        name: 'Delivery Address',
    },
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/payment.png'),
        navigation: '',
        name: 'Payment Methods',
    },
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/offers.png'),
        navigation: 'offer',
        name: 'Offers',
    },
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/Bell.png'),
        navigation: 'notification',
        name: 'Notifications',
    },
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/help.png'),
        navigation: '+201033262040',
        link: 'https://wa.me/+201033262040',
        name: 'Contact Us',
    },
    {
        id: idd++,
        icon: require('../Desktop/proflieicons/about.png'),
        navigation: 'aboutus',
        name: 'About',
    },
]




export default function Profile() {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const { userinfo, logout } = useContext(AuthContext)
    const navigation = useNavigation()
    return (
        <View style={styles.main}>
            <TouchableOpacity
                onPress={() => navigation.navigate('account')}
                style={{ flexDirection: "row", alignItems: "center" }}>

                {userinfo.user.photo !== null ?
                    <Image
                        style={styles.image}
                        source={{ uri: `https://arablife.online/${userinfo.user.photo}` }} />
                    :
                    <Image
                        style={styles.image}
                        source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }} />
                }
                <View>
                    <Text style={styles.txt}>{userinfo.user.name}</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#848484",
                        textAlign: "left",
                        margin: 5
                    }}>{userinfo.user.email}</Text>
                </View>
            </TouchableOpacity>

            {btns.map((item) => (
                <TouchableOpacity
                    onPress={() => { item.link ? Linking.openURL(item.link) : navigation.navigate(item.navigation) }}
                    style={styles.btn}
                    key={item.id}>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Image
                            source={item.icon}
                            style={styles.icon}
                        />
                        <Text style={styles.btntxt}>{item.name}</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                onPress={logout}
                style={styles.btn}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Feather name="log-out" size={24} color="#DB0B0B" />
                    <Text style={{
                        color: "#DB0B0B",
                        fontSize: 14,
                        fontWeight: "700",
                        width: "65%"
                    }}>Log Out</Text>
                </View>
                <View style={{ width: 24 }}></View>
            </TouchableOpacity>


            <Text style={{
                textAlign: "center",
                fontSize: 14,
                color: "#7C7979",
                fontWeight: "500",
                marginTop: 30
            }}
                onPress={toggleModal}
            >Privacy Policy | Terms and Conditions</Text>

            <Modal
                style={{ flex: 1, alignItems: "center" }}
                isVisible={isModalVisible}>
                <Terms />
                <Text style={{ padding: 10, backgroundColor: 'red', textAlign: "center", borderRadius: 10, fontWeight: "800", fontSize: 18 }}
                    onPress={toggleModal}
                >close</Text>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    txt: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        textAlign: "left",
        margin: 5
    },
    image: {
        width: 57,
        height: 57,
        borderRadius: 35 * 2,
        resizeMode: "contain",
        margin: 10
    },
    btn: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 35,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    btntxt: {
        fontSize: 14,
        fontWeight: "500",
        color: "#272727",
        width: "65%"
    },
})