import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import Providers from "./src/navigation/index";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
const App = () => {
    useEffect(() => {
        GoogleSignin.configure(
            {
            webClientId: '537242371929-av1j4qbp4c65dold3shtrhh4r57bic4m.apps.googleusercontent.com',
            }
            );
    }, [])
    return (
        <Providers/>
    )
}

export default App
