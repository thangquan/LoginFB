import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
const Routes = () => {
    const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

    return (
        <NavigationContainer>
            {user?<AppStack/>:<AuthStack/>}
    </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})
