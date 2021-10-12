import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Home = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const isSignedInGG = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
            setIsSignedIn(isSignedIn)
    };
    console.log('isSignedIn',isSignedIn)
    useEffect(() => {
        isSignedInGG()
    }, [])
    return (
        <View style={styles.home}>
            <Text>{auth().currentUser.displayName}</Text>
            <Text>{auth().currentUser.email}</Text>
            <TouchableOpacity style={{padding:20,backgroundColor:'red'}}
                onPress={async ()=>
                    {
                        if(isSignedIn) await GoogleSignin.signOut();
                        auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                    }
                }
            >
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    home:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
