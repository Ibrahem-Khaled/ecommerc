import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, SafeAreaView, Pressable, Image, TouchableOpacity
} from 'react-native';
import { Ionicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';





export default function Header({ Titel }) {
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}>
            <StatusBar hidden />

            <View style={styles.main}>
                <Ionicons
                    onPress={() => { navigation.goBack(); }}
                    style={{ left: 10 }}
                    name="ios-arrow-back" size={35} color="#000" />

                <Text style={{ color: "#000", fontSize: 20, fontWeight: "500" }}>{Titel}</Text>
            </View>

            <View style={[styles.main, { width: "35%", right: 10 }]}>
                <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
                    <Image
                        style={styles.icons}
                        source={require('../../Desktop/bottomicons/search-outline.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Wishlist') }}>
                    <Image
                        style={styles.icons}
                        source={require('../../Desktop/bottomicons/heart-outline.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
                    <Image
                        style={styles.icons}
                        source={require('../../Desktop/bottomicons/bag-outline.png')}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icons: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    main: {
        flexDirection: "row",
        width: "40%",
        alignItems: "center",
        justifyContent: "space-between"
    },
});

