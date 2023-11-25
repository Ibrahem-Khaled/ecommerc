import { StyleSheet, Text, View, ActivityIndicator, FlatList, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';

export default function Terms() {

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <ScrollView style={styles.main}>
            {loading ?
                <ActivityIndicator
                    size={'small'}
                    color={'red'}
                ></ActivityIndicator>
                :
                datas.map((item) => {
                    return (
                        <Pressable>
                            <Text style={styles.uppder}>privacy policy</Text>
                            <Text style={styles.txt}>{item.privce}</Text>

                            <Text style={styles.uppder}>terms conditions</Text>
                            <Text style={styles.txt}>{item.terms}</Text>

                            <Text style={styles.uppder}>order return</Text>
                            <Text style={styles.txt}>{item.orderreturn}</Text>

                            <Text style={styles.uppder}>about us</Text>
                            <Text style={styles.txt}>{item.aboutus}</Text>

                            <Text style={styles.uppder}>copyright</Text>
                            <Text style={styles.txt}>{item.copyriht}</Text>
                        </Pressable>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    uppder: {
        fontWeight: "bold",
        fontSize: 18,
        color: "gray",
        margin: 5
    },
    txt: {
        fontSize: 12,
        color: "#000",
        alignSelf: "center",
        fontFamily: "Amiri"
    },
})