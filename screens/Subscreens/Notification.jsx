import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Componntes/Headrback'

const Notification = () => {
    return (
        <View style={styles.main}>
            <Header Titel={'Notification'} />
            <Text style={styles.txt}>Not notification now!</Text>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    main: {
        flex:1,
        justifyContent: "center"
    },
    txt: {
        textAlign:"center",
        fontFamily:"Amiri",
        fontSize:18,
        flex:1
    },
})