import React, { memo, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ActivityIndicator, StatusBar, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { font, font_size } from '@/configs/fonts';
import { ScaledSheet } from 'react-native-size-matters';
import icons from '@/assets/icons';
import { width_screen } from '@/utils';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/HOC';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/AccessTokenSlice';
import { navigation, replace } from '@/utils/navigation';
import auth from '@react-native-firebase/auth'
const Introduce = memo(() => {
    const { navigate } = useNavigation();
    const { t } = useTranslation();
    const [loginState, setLoginState] = useState(true);
    const dispatch = useDispatch();
    const getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            dispatch(setToken(token));
            setTimeout(() => {
                replace('MainStack');
            }, 1000);
        } else {
            setLoginState(false);
        }
    }

    useEffect(() => {
        setTimeout( () => {
            getToken();
        },1000)
    }, []);
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
          if (user) {
            replace("MainStack")
          }
        
        })
        return unsubscribe
      }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'}/>
            <ImageBackground style={styles.center} source={icons.introduce.background} resizeMode={'cover'}>
                <View style={styles.viewBtn}>
                {loginState ?
                    <ActivityIndicator color={'gray'} size={'large'} /> :
                    <Button onPress={() => navigate('Login')} color={'#3F6766'} customTextStyle={{color: 'white'}} width={width_screen * 0.6}>{t('start')}</Button>
                }
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
});

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        flex: 1
    },
    viewBtn: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center'
    }
});

export default Introduce;
