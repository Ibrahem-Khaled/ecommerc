import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
export default function Bottomtaps() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = !focused ? require('../Desktop/bottomicons/home-outline.png') : require('../Desktop/bottomicons/home.png')
                    size = focused ? 28 : 28
                }
                else if (route.name === 'Search') {
                    iconName = !focused ? require('../Desktop/bottomicons/search-outline.png') : require('../Desktop/bottomicons/search.png')
                    size = focused ? 28 : 28
                }
                else if (route.name === 'Wishlist') {
                    iconName = !focused ? require('../Desktop/bottomicons/heart-outline.png') : require('../Desktop/bottomicons/heart.png')
                    size = focused ? 28 : 28
                }
                else if (route.name === 'Cart') {
                    iconName = !focused ? require('../Desktop/bottomicons/bag-outline.png') : require('../Desktop/bottomicons/bag.png')
                    size = focused ? 28 : 28
                }
                else if (route.name === 'Profile') {
                    iconName = !focused ? require('../Desktop/bottomicons/profile-outline.png') : require('../Desktop/bottomicons/profile.png')
                    size = focused ? 28 : 28
                }

                return <Image
                    source={iconName}
                    resizeMode='contain'
                    style={{ width: size, height: size }} />;


            },
            tabBarStyle: {
                backgroundColor: "#FFF"
            },
            tabBarInactiveTintColor: "#000",
            tabBarActiveTintColor: "#FB1314",
            tabBarLabelStyle: { fontWeight: "700", fontSize: 12 },
            headerShown: false,
        })}
        >
            <Tab.Screen

                name="Home" component={Home} />
            <Tab.Screen
                name="Search" component={Search} />
            <Tab.Screen
                name="Wishlist" component={Wishlist} />
            <Tab.Screen
                name="Cart" component={Cart} />
            <Tab.Screen
                name="Profile" component={Profile} />

        </Tab.Navigator >
    );
}