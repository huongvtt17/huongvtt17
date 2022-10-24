import React, { memo, useState } from 'react';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native';
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
import { replace } from '@/utils/navigation';


const Login = memo(() => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<any>({});

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
    // login(data, async (res: any) => {
    //   setLoadingState(false);
    //   if (res.code == 1 && res.data?.access_token) {    // Login success
    //     dispatch(setToken(res.data.access_token));
    //     replace('MainStack');
    //     await AsyncStorage.setItem('access_token', res.data.access_token);
    //   } else {
    //     if (res.code == 0) {
    //       if (res.data?.error) {
    //         setErrorState(res.data.error);
    //       } else {
    //         Alert.alert('Thông báo', res.message);
    //       }
    //     }
    //   }
    // })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground style={styles.viewAll} source={icons.login.background} resizeMode={'stretch'}>
        <Text style={styles.txtLogin}>Login</Text>
        <Text style={styles.txtContent}>By signing in you are agreeing our Term and privacy policy</Text>

        <View style={styles.viewInput1}>
          <Image
            source={icons.login.email}
            style={styles.icEmail}
          />
          <TextInput
            placeholder={'Email'}
            style={styles.txtEmail}
          // value={keyword}
          // onChangeText={setKeyword}
          />
        </View>
        <View style={styles.viewInput2}>
          <Image
            source={icons.login.password}
            style={styles.icEmail}
          />
          
          <TextInput
            placeholder={'Password'}
            style={styles.txtPassword}
          // value={keyword}
          // onChangeText={setKeyword}
          />
          <Image
            source={icons.login.hide}
            style={styles.icHide}
          />
        </View>
        <View style={styles.btnlogin}>
          {/* <Button>Log In</Button> */}
          <Button
            customTextStyle={{ color: 'white' }}
            color={'#0386D0'}
            onPress={onLogin}
            isLoading={loadingState}>
            Log In
          </Button>
          <TouchableOpacity>
            <Text style={styles.txtForgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBottom}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity >
            <Text style={styles.txtRegister}> Register here</Text>
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
    flex: 1
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
  txtEmail: {
    fontSize: scale(16),
    color: 'black'
  },
  icEmail: {
    width: scale(24),
    height: scale(24)
  },
  icHide: {
    width: scale(24),
    height: scale(24),
    marginLeft: 190,
  },
  txtPassword: {
    fontSize: scale(16),
    color: 'black'
  },
  viewInput1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '100@ms',
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
   
  },
  viewBottom:{
    flexDirection: 'row',
    marginHorizontal: '40@ms',

  },
  txtRegister: {
    color: '#0386D0'
  }
  
});

export default Login;