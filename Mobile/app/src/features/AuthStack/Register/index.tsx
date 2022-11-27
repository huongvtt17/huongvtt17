import React, { memo, useEffect, useRef, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, Platform, ImageBackground } from 'react-native';
import icons from '@/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { height_screen, width_screen } from '@/utils';
import { Button } from '@/components/HOC';
import { font, font_size } from '@/configs/fonts';
import { register, cities, districts } from '@/services';
import moment from 'moment';
import { replace } from '@/utils/navigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/AccessTokenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth'
const Register = memo(() => {
    const { navigate } = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [formUserData, setFormUserData] = useState({
        //name: '',
        email: '',
        password: '',
        confirm_password: 0
    });

    const [loadingState, setLoadingState] = useState(false);
    const [errorState, setErrorState] = useState<any>({});

    const updateFormData = (key: string, value: any) => {
        setFormUserData((preData) => {
            return {
                ...preData,
                [key]: value
            }
        });
    }

    const onRegister = () => {
        setLoadingState(true);
        register(formUserData, async (res: any) => {
            setLoadingState(false);
            // if (res.code == 1) {
            //     Alert.alert('Thông báo', 'Đăng ký thành công, bạn hãy sử dụng tài khoản vừa đăng ký để đăng nhập nhé');
            //     replace('Login');
            // } else {
            //     if (res.code == 0) {
            //         if (res.data?.error) {
            //             setErrorState(res.data.error);
            //         } else {
            //             Alert.alert('Thông báo', res.message);
            //         }
            //     }
            // }
            if (res.code == 1 && res.data?.access_token) {    // Login success
                dispatch(setToken(res.data.access_token));
                replace('MainStack');
                await AsyncStorage.setItem('access_token', res.data.access_token);
            } else {
                if (res.code == 0) {
                    if (res.data?.error) {
                        setErrorState(res.data.error);
                    } else {
                        Alert.alert('Thông báo', res.message);
                    }
                }
            }
        })
    }

    const handleSignUp = () => {
        auth()
          .createUserWithEmailAndPassword(email,password)
          .then(userCredentials=> {
            const user = userCredentials.user;
            console.log('Registered with:', user.email)
            Alert.alert("Dang ki thanh cong")
        
          })
          .catch(error =>Alert.alert(error.message))
         
      }
    

    return (
        <View style={styles.container}>
            {/* <KeyboardAwareScrollView style={styles.center} showsVerticalScrollIndicator={false}> */}
            <ImageBackground style={styles.viewAll} source={icons.introduce.login} resizeMode={'stretch'}>
                <View style={styles.viewContainer}>
                    <Text style={styles.txtLogin}>{t('register.header')}</Text>
                    
                    <View style={styles.viewInput}>
                        <Image source={icons.introduce.mail}
                            style={styles.icoUsername} />
                        <TextInput
                            placeholder={'Nhập Email'}
                            style={styles.txtInput}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Image source={icons.introduce.password}
                            style={styles.icoUsername} />
                        <TextInput
                            placeholder={'Nhập mật khẩu'}
                            style={styles.txtInput}
                        />
                    </View>
                    <View style={[styles.viewInput, { marginBottom: 20 }]}>
                        <Image source={icons.introduce.password}
                            style={styles.icoUsername} />
                        <TextInput
                            placeholder={'Nhập lại mật khẩu'}
                            style={styles.txtInput}
                        />
                    </View>
                    <Button
                        customTextStyle={{ color: 'white' }}
                        color={'#3F6766'}
                        width={width_screen * 0.4}
                        // onPress={onRegister}
                        // isLoading={loadingState}
                        onPress = {handleSignUp}
                        >
                        {t('register.login')}
                    </Button>
                    <View style={styles.viewBottom}>
                        <Text style={styles.txtNoAccount}>{t('register.noAccount')}</Text>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <Text style={styles.txtRegister}>{t('register.register')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            {/* </KeyboardAwareScrollView> */}
        </View>
    );
});

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'white'
    },
    center: {
        marginTop: Platform.OS == 'android' ? 0 : getStatusBarHeight() + 10
    },
    viewAll: {
        flex: 1
    },
    viewTop: {
        flex: 1
    },
    viewContainer: {
        backgroundColor: 'white',
        height: height_screen * 0.65,
        marginTop: height_screen * 0.25,
        paddingTop: 30,
        marginHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
        shadowRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        elevation: 2
    },
    txtRegister: {
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#3F6766',
        marginVertical: '30@ms'
    },
    txtLogin: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL * 2,
        color: '#3F6766'
    },
    viewInput: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: width_screen * 0.8,
        marginTop: '15@ms'
    },
    icoUsername: {
        width: '24@ms',
        height: '24@ms',
        marginRight: 5
    },
    txtInput: {
        paddingVertical: 0,
        marginVertical: 10,
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        flex: 1
    },
    txtForgot: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: 'rgba(0, 0, 0, 0.5)',
        marginVertical: '10@ms'
    },
    viewBottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtNoAccount: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: 'rgba(0, 0, 0, 0.6)',
        marginRight: 5
    }
});

export default Register;