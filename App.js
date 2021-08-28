import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Home from "./src/screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";

const Stack = createStackNavigator();
const App = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({})
