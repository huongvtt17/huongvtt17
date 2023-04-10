import React, { memo, useEffect, useReducer, useState } from 'react';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { View, Text, TouchableOpacity, Image, TextInput, ImageBackground, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import icons from '@/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { height_screen, width_screen } from '@/utils';
import { Button } from '@/components/HOC';
import { font, font_size } from '@/configs/fonts';
import { DynamicHeader } from '@/components/Header';
import { login } from '@/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/AccessTokenSlice';
import { navigation, replace } from '@/utils/navigation';
import  { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { black } from 'react-native-paper/lib/typescript/styles/colors';




const Login = memo(() => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });


  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<any>({});
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const updateFormData = (key: string, value: any) => {
    setFormData((preData) => {
      return {
        ...preData,
        [key]: value
      }
    });
    setErrorState({});
  }

  const onLogin = () => {
    
    setLoadingState(true);
    const data = {
      ...formData,
      phone: formData.phone ? (formData.phone.charAt(0) == '0' ? formData.phone : `0${formData.phone}`) : ''
    };
    replace('MainStack');
  }

 

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email,password)
      .then(userCredentials=> {
        const user = userCredentials.user;
        console.log('Registered with:', user.email)
      })
      .catch(error =>Alert.alert(error.message))
      
  }

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email,password)
      .then()
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        
      })
      .catch( error => {
         Alert.alert(error.message)}) 
      
  }
  
  const forgotPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Mật khẩu gửi về email ")
      })
      .catch((error) => {
        Alert.alert(error.message)}
      )
  }


  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground style={styles.viewAll} source={icons.login.background} resizeMode={'stretch'}>
        <Text style={styles.txtLogin}>ĐĂNG NHẬP</Text>
        <View style={styles.viewInput1}>
          <Image
            source={icons.login.email}
            style={styles.icEmail}
          />
          <TextInput
            placeholder={'Email'}
            style={{fontSize: 21, marginLeft: 10, color: 'black'}}
             value={email}
             onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.viewInput2}>
          <Image
            source={icons.login.password}
            style={styles.icEmail}
          />
          
          <TextInput
            placeholder={'Mật khẩu'}
            style={{fontSize: 21, marginLeft: 10,color: 'black'}}
             value={password}
             onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          {/* <Image
            source={icons.login.hide}
            style={styles.icHide}
          /> */}
        </View>
        <View style={styles.btnlogin}>
          
          <Button
            customTextStyle={{ color: 'white' }}
            color={'#0386D0'}
            onPress={handleLogin}
            //onPress= {onLogin}
            isLoading={loadingState}
            >
            Đăng Nhập
          </Button>
          <TouchableOpacity
          onPress={forgotPassword}
          >
            <Text style={styles.txtForgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBottom}>
          <Text style={{fontSize:18}}>Bạn có tài khoản chưa?</Text>
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('Register')}
           >
            <Text style={styles.txtRegister}> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  viewAll: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  txtLogin: {
    fontSize: scale(24),
    color: 'black',
    marginTop: 40,
    textAlign: 'center'
  },
  txtContent: {
    fontSize: scale(12),
    color: 'black',
    marginTop: 50,
    textAlign: 'center',
    marginLeft: '90@ms',
    marginRight: '90@ms'
  },
  // txtEmail: {
  //   fontSize: scale(20),
  //  // color: 'black'
  // },
  icEmail: {
    width: scale(24),
    height: scale(24)
  },
  icHide: {
    width: scale(24),
    height: scale(24),
    marginLeft: 150,
  },
 
  viewInput1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '70@ms',
    marginHorizontal: '40@ms',
    borderBottomWidth: 1,
    borderColor: '#A6A6A6'
  },
  viewInput2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10@ms',
    marginHorizontal: '40@ms',
    borderBottomWidth: 1,
    borderColor: '#A6A6A6'
    
  },
  btnlogin: {
    marginTop: '40@ms',
    marginHorizontal: '40@ms',
  },
  txtForgot:{
    marginVertical:'10@ms',
    color: '#0386D0',
    fontSize: 18,
    marginTop :40
  },
  viewBottom:{
    flexDirection: 'row',
    marginHorizontal: '40@ms',

  },
  txtRegister: {
    color: '#0386D0',
    fontSize: 18
  }
  
});

export default Login;



