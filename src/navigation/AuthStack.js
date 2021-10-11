import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from "./../screens/SignIn";
import SignUp from "./../screens/SignUp";
const Stack = createStackNavigator();
const AuthStack = () => {
    return (
       <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})
