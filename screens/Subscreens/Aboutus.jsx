import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from '../Componntes/Headrback'
import axios from 'axios';

const Aboutus = () => {
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/condetions`).then(res => {
            if (isMounted) {
                if (res.data.allCondetions) {
                    setDatas(res.data.allCondetions);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    return (
        <View style={styles.main}>
            <Header Titel={'About Us'} />
            <ScrollView>
                {loading ? <ActivityIndicator></ActivityIndicator> : datas.map((item) => {
                    return (
                        <Text style={styles.txt}>{item.aboutus}</Text>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Aboutus

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center"
    },
    txt: {
        fontFamily: "Amiri",
        color: "#000",
        width:"98%",
        alignSelf:"center"
    },
})