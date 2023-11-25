import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/authScreens/Login';
import Register from './screens/authScreens/Register';
import Bottomtaps from './screens/Bottomtaps';
import { AuthContext, AuthProvider } from './screens/authScreens/Authcontext';
import Account from './screens/Subscreens/Account';
import Productsforcate from './screens/Subscreens/Productsforcate';
import Productinfo from './screens/Subscreens/Productinfo';
import { I18nManager } from "react-native";
import { useFonts } from 'expo-font';
import Moreproinfo from './screens/Subscreens/Moreproinfo';
import Notification from './screens/Subscreens/Notification';
import Aboutus from './screens/Subscreens/Aboutus';
import Offer from './screens/Subscreens/Offer';
import Order from './screens/Subscreens/Order';
import MyOrder from './screens/Subscreens/MyOrder';
import Accountupdate from './screens/Subscreens/Accountupdate';
import Changepassword from './screens/Subscreens/Changepassword';
import Delivery from './screens/Subscreens/Deliveryaddress';
import Toast from 'react-native-toast-message';
import Forgetpassword from './screens/authScreens/Forgetpassword';


I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Stack = createNativeStackNavigator();
const Authstack = () => {

  const [fontsLoaded] = useFonts({
    'Amiri': require('./assets/fonts/beIN-Normal.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }


  return (
    <Stack.Navigator
      initialRouteName='login'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ animation: 'slide_from_right' }}
        name="login" component={Login} />
      <Stack.Screen
        options={{ animation: 'fade_from_bottom' }}
        name="register" component={Register} />
      <Stack.Screen
        options={{ animation: 'fade_from_bottom' }}
        name="forgetpassword" component={Forgetpassword} />
    </Stack.Navigator>
  );
}




const Screen = () => {
  return (
    <Stack.Navigator
      initialRouteName='taps'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ animation: 'fade' }}
        name="taps" component={Bottomtaps} />
      <Stack.Screen
        options={{ animation: 'simple_push' }}
        name="account" component={Account} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="proforcate" component={Productsforcate} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="more" component={Moreproinfo} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="productinfo" component={Productinfo} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="notification" component={Notification} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="aboutus" component={Aboutus} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="offer" component={Offer} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="order" component={Order} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="myorder" component={MyOrder} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="updateprof" component={Accountupdate} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="changepassword" component={Changepassword} />
      <Stack.Screen
        options={{ animation: 'slide_from_bottom' }}
        name="delivery" component={Delivery} />
    </Stack.Navigator>
  );
}


const Nav = () => {
  const { userinfo } = useContext(AuthContext)
  return (
    <NavigationContainer>
      <Toast />
      {!userinfo.token ?
        <Authstack />
        :
        <Screen />
      }
    </NavigationContainer>


  );
}
const App = () => {
  return (
    <AuthProvider>
      <Nav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;




