import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, ActivityIndicator, Image, } from 'react-native';
import { Header, Categories } from './components';
import { FlatListPackageHome, FlatListUser, Spinner } from '@/components/HOC';
import { useTranslation } from 'react-i18next';
import { navigate } from '@/utils/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import icons from '@/assets/icons';
import { height_screen, width_screen } from '@/utils';
import { followingClinic, getProducts, getProfile, getClinics, getVaccines } from '@/services';

import { scale, ScaledSheet } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import database from '@react-native-firebase/database';
import { firebaseApp } from '@/Firebase/ConfigFirebase';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';
import { NotificationListener, requestUserPermission, sendPushNotification } from '@/utils/pushnotification';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomePage = memo(() => {
  const { t } = useTranslation();
  //const token = useSelector((state: RootState) => state.accessTokenSlice.token);
  const profile: any = useSelector((state: RootState) => state.profileSlice.data);
  const [values, setValues] = useState();
  const [status, setStatus] = useState();
  const [isVisible, setIsVisible] = useState(false);
  let date = new Date()

  const Toggle1 = () => {
    if (status?.FAN === "ON") {
      return (
        <Image
          source={icons.homepage.power}
          style={{ tintColor: '#37D211' }}

        />
      )
    } else {
      return (
        <Image
          source={icons.homepage.power}
          style={styles.icPower}
        />
      )
    }
  }
  const Toggle2 = () => {
    if (status?.PHUNSUONG === "ON") {
      return (
        <Image
          source={icons.homepage.power}
          style={{ tintColor: '#37D211' }}

        />
      )
    } else  {
      return (
        <Image
          source={icons.homepage.power}
          style={styles.icPower}
        />
      )
    }
  }
  const Toggle3 = () => {
    if (status?.VAN === "ON") {
      return (
        <Image
          source={icons.homepage.power}
          style={{ tintColor: '#37D211' }}

        />
      )
    } else{
      return (
        <Image
          source={icons.homepage.power}
          style={styles.icPower}
        />
      )
    }
  }

  useEffect(() => {
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('Sensor/')
      .on('value', (snapshot: { val: () => any; }) => {
        // console.log('snapshot', snapshot.val())
        setValues(snapshot.val())
      }
      )
  }, [])

  useEffect(() => {
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('Device/')
      .on('value', (snapshot: { val: () => any; }) => {
        // console.log('snapshot', snapshot.val())
        setStatus(snapshot.val())
      }
      )
  }, [])

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  })
  useEffect(() => {
    if(parseInt(values?._Temperature) > 35 ) {
      sendAlert(
        'CẢNH BÁO',
        'Nhiệt độ vượt ngưỡng'
      )
    }
    if(parseInt(values?._Humidity) > 70 ) {
      sendAlert(
        'CẢNH BÁO',
        'Nhiệt độ vượt ngưỡng'
      )
    }
    if(parseInt(values?._Moisture) > 70 ) {
      sendAlert(
        'CẢNH BÁO',
        'Nhiệt độ vượt ngưỡng'
      )
    }
    if(parseInt(values?._CO2) > 500 ) {
      sendAlert(
        'CẢNH BÁO',
        'Nhiệt độ vượt ngưỡng'
      )
    }

  }, [])

  const sendAlert = async (title: any, body: any) => {
    let token = await AsyncStorage.getItem('fcmToken') 
    console.log('sendPushNotification', token)
    sendPushNotification(
      token,
      title,
      body
    );
  }

  return (
    <>
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          //onPress={() => { setIsVisible(!isVisible) }}
          onPress={() => { navigate('Menu') }}
        >
          <Image
            source={icons.homepage.menu}
            style={styles.icMenu}
          />
        </TouchableOpacity>
        <Text style={styles.txtheader}>TRANG CHỦ</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { navigate('Setting') }}
        >
          <Image
            source={icons.homepage.setting}
            style={styles.icSetting}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.control}>
        <View style={styles.view}>
          <Toggle1 />
          <Text>{status?.FAN}</Text>
          <Text style={styles.txtbody}>Quạt</Text>
        </View>
        <View style={styles.view}>
          <Toggle2 />
          <Text>{status?.PHUNSUONG}</Text>
          <Text style={styles.txtbody}>Phun Sương</Text>
        </View>
        <View style={styles.view}>
          <Toggle3 />
          <Text>{status?.VAN}</Text>
          <Text style={styles.txtbody}>CO2</Text>
        </View>
      </View>
      <View style={styles.viewDisplay}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewControl}
          onPress={() => { navigate('Temperature') }}
        >
          <Image
            source={icons.homepage.temp}
            style={styles.icon}
          />
          <Text style={styles.txtView}> Nhiệt độ</Text>
          <Text style={styles.txtDisplay}>{values?._Temperature} ℃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewDisplay}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewControl}
          onPress={() => { navigate('Air') }}

        >
          <Image
            source={icons.homepage.air}
            style={styles.icon}
          />
          <Text style={styles.txtView}>Độ ẩm không khí</Text>
          <Text style={styles.txtDisplay}>{values?._Humidity.toFixed(2)} %</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewDisplay}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewControl}
          onPress={() => { navigate('Land') }}
        >
          <Image
            source={icons.homepage.land}
            style={styles.icon}
          />
          <Text style={styles.txtView}>Độ ẩm đất</Text>
          <Text style={styles.txtDisplay}>{values?._Moisture.toFixed(2)} %</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewDisplay}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewControl}
          onPress={() => { navigate('Percent') }}
        >
          <Image
            source={icons.homepage.percent}
            style={styles.icon}
          />
          <Text style={styles.txtView}>Nồng độ CO2</Text>
          <Text style={styles.txtDisplay}>{values?._CO2.toFixed(2)} ppm</Text>
        </TouchableOpacity>
      </View>
      </View>
    </>
  );
});

const styles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5

  },
  icMenu: {
    width: scale(24),
    height: scale(24),
    marginHorizontal: '20@ms',
    marginVertical: '10@ms'

  },
  icSetting: {
    width: scale(24),
    height: scale(24),
    marginLeft: '100@ms',
    marginVertical: '10@ms'

  },
  txtheader: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 60

  },
  icPower: {
    height: scale(36),
    width: scale(36),

  },
  icPower1: {
    height: scale(36),
    width: scale(36),

  },
  view: {
    marginVertical: 20,
    alignItems: 'center',
    marginLeft: 30

  },
  txtbody: {
    fontSize: 24
  },
  control: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 40,
    borderRadius: 5,
    borderColor: '#0386D0',

    backgroundColor: '#ffffff'
  },
  viewControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  icon: {
    height: scale(30),
    width: scale(30),
    marginLeft: '15@ms'
  },
  viewDisplay: {
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#0386D0',
    backgroundColor: '#ffffff'
  },
  txtDisplay: {
    fontSize: scale(20),
  },
  txtView: {
    fontSize: scale(20),
    flex: 0.9,
    marginLeft: 16
  },

  // imgBackground: {
  //   width: width_screen,
  //   height: height_screen,
  //   position: 'absolute',
  //   backgroundColor: '#314C1C',
  //   // top: 0,
  //   // right: 0,
  //   // bottom: 0,
  //   // left: 0
  // },
  // container: {
  //   backgroundColor: '#DAE2D5',
  //   borderRadius: 20,
  //   marginTop: -18,
  //   paddingVertical: '20@ms'
  // },
  // viewRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: '15@ms'
  // },
  // txtHeader: {
  //   fontFamily: font.SFProTextBold,
  //   fontWeight: '700',
  //   fontSize: font_size.VERY_LARGE + 2,
  //   color: '#314C1C',
  //   marginLeft: '15@ms',
  //   flex: 1
  // },
  // txtAll: {
  //   fontFamily: font.SFProTextRegular,
  //   fontSize: font_size.NORMAL,
  //   color: '#3F6766'

  // }
});

export default HomePage;
