import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

const Home = () => {
    return (
        <View style={styles.home}>
            <Text>{auth().currentUser.email}</Text>
            <TouchableOpacity style={{padding:20,backgroundColor:'red'}}
                onPress={()=>
                    {
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
