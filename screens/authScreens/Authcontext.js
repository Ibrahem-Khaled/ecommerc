import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userinfo, setUserinfo] = useState({});
    const [loading, setLoading] = useState(false);

    const Register = (name, email, password) => {
        setLoading(true)
        axios.post('https://arablife.online/api/user/register', {
            name,
            email,
            password
        }).then(res => {
            let userinfo = res.data;
            setUserinfo(userinfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userinfo))
            setLoading(false)
        }).catch(e => {
            alert('هذا الحساب مسجل لدينا من قبل')
            setLoading(false)

        })

    }
    const Login = (email, password) => {
        setLoading(true)
        axios.post('https://arablife.online/api/user/login', {
            email,
            password
        }).then(res => {
            let userinfo = res.data;
            setUserinfo(userinfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userinfo))
            setLoading(false)
        }).catch(e => {
            alert('Error your information ')
            setLoading(false)
        })

    }

    async function logout() {
        setLoading(true)
        let res = await axios.post('https://arablife.online/api/user/logout', {})
        let remove = await AsyncStorage.removeItem('userInfo');
        setLoading(false)
        setUserinfo({})
    }


    const isLoged = async () => {
        try {
            let userinfo = await AsyncStorage.getItem('userInfo')
            userinfo = JSON.parse(userinfo)
            if (userinfo) {
                setUserinfo(userinfo)
            }
        } catch (e) { }
    }

    useEffect(() => {
        isLoged()
    })
    return (
        <AuthContext.Provider value={{ Register, loading, userinfo, Login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}