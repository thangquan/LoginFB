import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {SocialIcon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const onGoogleButtonPress = async ()=> {
    // Get the users ID token
    console.log('thagnquan')
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const handleOnPressLogin = () => {
    if (!validateEmail(email))
      setErrorMessageEmail('Email must be a valid email');
    if (password.length < 6)
      setErrorMessagePassword('Password must be at least 6 characters');
    if (validateEmail(email) && password.length >= 6)
      loginUser(email.trim(), password)
        .then(res => {
          console.log('Signed ok');
          ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
        })
        .catch(error => {
          console.log(error.code);
          if (error.code === 'auth/wrong-password') {
            ToastAndroid.show(
              'Đăng nhập thất bại! mật khẩu không đúng',
              ToastAndroid.SHORT,
            );
            setErrorMessagePassword('mật khẩu không đúng');
          } else if (error.code === 'auth/network-request-failed') {
            ToastAndroid.show(
              'Đăng nhập thất bại! Kiểm tra kết nối Internet',
              ToastAndroid.SHORT,
            );
          } else if (error.code === 'auth/user-not-found') {
            ToastAndroid.show(
              'Đăng nhập thất bại! Tài khoản không tồn tại',
              ToastAndroid.SHORT,
            );
            setErrorMessageEmail('Tài khoản ko tồn tại');
          } else
            ToastAndroid.show(
              'Đăng nhập thất bại! Lỗi không xác đinh thử lại sau..',
              ToastAndroid.SHORT,
            );
        });
  };
  const loginUser = async (email, password) => {
    const res = await auth().signInWithEmailAndPassword(email, password);
    return res;
  };
  
  return (
    <View style={styles.loginContainer}>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={styles.footerTitle}>Welcome AnimeShop</Text>
          <Text style={styles.footerTitle2}>Đăng nhập tài khoản</Text>
        </View>
        <View style={styles.action}>
          <Input
            label="Email"
            labelStyle={{fontWeight: '500', fontSize: 16}}
            placeholder="Nhập Email vào...."
            leftIcon={<Icon name="mail" size={20} color="gray" />}
            style={{
              fontSize: 16,
              borderWidth: 0,
              borderBottomColor: 'transparent',
            }}
            inputContainerStyle={{borderBottomWidth: 0.5}}
            errorStyle={{color: 'red', marginLeft: 0}}
            errorMessage={errorMessageEmail}
            onChangeText={text => {
              setEmail(text);
              setErrorMessageEmail('');
            }}
          />
          <Input
            label="Password"
            secureTextEntry={secureTextEntry}
            labelStyle={{fontWeight: '500', fontSize: 16}}
            placeholder="Nhập Password vào...."
            style={{
              fontSize: 16,
              borderWidth: 0,
              borderBottomColor: 'transparent',
            }}
            // containerStyle={{backgroundColor:'red'}}
            inputContainerStyle={{borderBottomWidth: 0.5}}
            errorStyle={{color: 'red', marginLeft: 0}}
            errorMessage={errorMessagePassword}
            onChangeText={text => {
              setPassword(text);
              setErrorMessagePassword('');
            }}
          />
        </View>
        <Button
          title="Đăng nhập"
          titleStyle={{color: '#333'}}
          containerStyle={{borderRadius: 20, marginHorizontal: 10}}
          buttonStyle={{backgroundColor: '#5cfff2'}}
          onPress={() => {
            handleOnPressLogin();
          }}
        />
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={() => {
            console.log('a');
          }}
        />
        <SocialIcon
          title="Sign In With Google"
          button
          type="google"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <View style={styles.signup}>
          <Text style={{fontSize: 14}}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupNow}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 5,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 20,
  },
  footerTitle: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  footerTitle2: {
    paddingVertical: 10,
    marginLeft: 10,
    color: 'gray',
    // textAlign: 'center',
  },
  action: {
    // marginTop: 40,
  },
  loginUsingMedia: {
    //   backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupNow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1394f0',
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
  },
});
