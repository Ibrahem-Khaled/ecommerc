import React, { useState, useEffect, useContext } from 'react';
import { Image, View, FlatList, Pressable, StyleSheet, Text, Dimensions } from 'react-native';
import axios from 'axios';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const widths = Dimensions.get('window').width;


export default function Slidehome({ }) {

    const [slider, setSlider] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(`https://arablife.online/api/slider`).then(res => {
            if (isMounted) {
                if (res.data.stuts === 200) {
                    setSlider(res.data.sliders);
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


    return (
        <SwiperFlatList
            autoplay
            autoplayDelay={3.5}
            keyExtractor={(item) => item.id}
            autoplayLoop
            horizontal
            showsHorizontalScrollIndicator={false}
            data={slider}
            renderItem={({ item }) =>
                <Pressable>
                    <Image
                        style={styles.ico}
                        source={{ uri: `https://arablife.online/${item.slider_image}` }} />
                    <Text style={styles.txt}>{item.slider_title}</Text>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        alignSelf: 'center',
                        color: "#fff",
                        bottom: "30%",
                        padding: 15,
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 5
                    }}>Explore</Text>
                </ Pressable>
            }
        />
    );
};

const styles = StyleSheet.create({
    ico: {
        width: widths,
        height: 300,
        alignSelf: "center",
        borderRadius: 10,
        resizeMode: "cover"

    },
    txt: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: 'center',
        color: "gray",
        bottom: "30%",
        textAlign: "left"
    },

});