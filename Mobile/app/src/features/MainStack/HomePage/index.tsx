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
import { setProfile } from '@/redux/ProfileSlice';
import { useIsFocused } from '@react-navigation/core';
import { font, font_size } from '@/configs/fonts';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import database from '@react-native-firebase/database';
import { firebaseApp } from '@/Firebase/ConfigFirebase';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';

const HomePage = memo(() => {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.accessTokenSlice.token);
  const profile: any = useSelector((state: RootState) => state.profileSlice.data);
  const [values, setValues] = useState();
  const [status, setStatus] = useState();
  const [isVisible, setIsVisible] = useState(false);
  let date = new Date()




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

  


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          //onPress={() => { setIsVisible(!isVisible) }}
          onPress={() => { navigate('ModeSetting') }}
        >
          <Image
            source={icons.homepage.menu}
            style={styles.icMenu}
          />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Bảng điều khiển</Text>
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
          <TouchableOpacity
          // onPress={OnOff}
          >
            <Image
              source={icons.homepage.power}
              style={styles.icPower}
            />
          </TouchableOpacity>
          <Text>{status?.FAN}</Text>
          <Text style={styles.txtbody}>Quạt</Text>

        </View>
        <View style={styles.view}>
          <TouchableOpacity

          >
            <Image
              source={icons.homepage.power}
              style={styles.icPower}
            />
          </TouchableOpacity>
          <Text>{status?.PHUNSUONG}</Text>
          <Text style={styles.txtbody}>Phun Sương</Text>
        </View>
        <View style={styles.view}>
          <TouchableOpacity>
            <Image
              source={icons.homepage.power}
              style={styles.icPower}
            />
          </TouchableOpacity>
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
          <Text style={styles.txtDisplay}>{values?._Humidity}%</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewDisplay}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewControl}
          onPress={() => { navigate('Percent') }}
        >
          <Image
            source={icons.homepage.land}
            style={styles.icon}
          />
          <Text style={styles.txtView}>Độ ẩm đất</Text>
          <Text style={styles.txtDisplay}>{values?._Moisture} %</Text>
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
          <Text style={styles.txtDisplay}>{values?._CO2} ppm</Text>
        </TouchableOpacity>
      </View>
      {
        isVisible ?
          <View style={{
            position: 'absolute',
            width: 150,
            height: 100,
            backgroundColor: 'yellow',
            top: 60,
            left: 20
          }}>
            <Text>1</Text>
            <Text>2</Text>
          </View>
          : <></>
      }


      {/* <StatusBar barStyle={'dark-content'} />
      <Header
        username={'Yoonabar'}
        avatar={'https://vcdn-giaitri.vnecdn.net/2020/05/30/t79Y43W-8289-1590814926.jpg'}
        description={'Welcome to Vatta toeic'}
        
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {false ?
          <ActivityIndicator size={'small'} style={{ marginVertical: 20 }} color={'gray'} />
          : <FlatListPackageHome
            header={t('homepage.recent')}
            data={[1, 2, 3]}
            seeMore={true}
            onPress={() => { }}
          />
        }

        {false ?
          <Spinner />
          : <FlatListUser
            header={t('Người dùng tích cực')}
            data={[1, 2, 3, 4, 5]}
            seeMore={true}
            onPress={() => { }}
          />
        }
        <Text style={styles.txtHeader}>{'Tiện ích'}</Text>
        <Categories clinicId={clinicId} />
      </ScrollView> */}
    </>
  );
});

const styles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'

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
    marginLeft: '70@ms',
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
