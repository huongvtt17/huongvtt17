import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import icons from '@/assets/icons';
import { scale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { Button } from '@/components/HOC';
import { navigation, replace } from '@/utils/navigation';
import auth from '@react-native-firebase/auth'
import { random } from 'lodash';
import { Colors } from 'react-native-paper';

const Setting = memo(() => {
  const { navigate } = useNavigation();
  const { goBack } = useNavigation();
  let day = new Date();
  const profile: any = useSelector((state: RootState) => state.profileSlice.data);
  const [loadingState, setLoadingState] = useState(false);
  const onLogout = () => {
    setLoadingState(true);
    replace('AuthStack');
  }
  const [isEnabled_1, setIsEnabled_1] = useState(false);
  const [isEnabled_2, setIsEnabled_2] = useState(false);
  const [isEnabled_3, setIsEnabled_3] = useState(false);
  const [isEnabled_4, setIsEnabled_4] = useState(false);

  const toggleSwitch_1 = () => setIsEnabled_1(previousState => !previousState);
  const toggleSwitch_2 = () => setIsEnabled_2(previousState => !previousState);
  const toggleSwitch_3 = () => setIsEnabled_3(previousState => !previousState);
  const toggleSwitch_4 = () => setIsEnabled_4(previousState => !previousState);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        email: user.email
      }
      else {
        replace('AuthStack')
      }
    })


    return unsubscribe
  }, [])
  const Signout = () => {
    auth()
      .signOut()
      .catch(error => Alert.alert(error.message))

  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { goBack() }}>
          <Image
            source={icons.temperature.back}
            style={styles.icMenu}
          />
        </TouchableOpacity>
        <Text style={styles.txtheader}>CÀI ĐẶT</Text>
      </View>
      <View style={styles.viewAvatar}>
        <View style={{
          height: 150,
          width: 150,
          backgroundColor: 'orange',
          borderRadius: 75,
          marginTop: 30,
          justifyContent: 'center',
          alignContent: 'center'
        }}>
          <View style={{
            alignSelf: 'center'
          }}>
            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{auth().currentUser?.email?.charAt(0).toLocaleUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.txtName}>{auth().currentUser?.email}</Text>
      </View>

      <View style={styles.viewChoose}>
        <TouchableOpacity
          onPress={() => { navigate('ChangePassword') }}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              marginHorizontal: 20,
              marginVertical: 20
            }}>
            Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewChoose1}>
        <TouchableOpacity
          onPress={Signout}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center'
            }}
          >
            Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnLogout}>
        <Button
          customTextStyle={{ color: 'black' }}
          color={'#E8E6E6'}
          //onPress={Signout}
          isLoading={loadingState}
        >Đăng xuất</Button>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  icMenu: {
    width: scale(24),
    height: scale(24),
    marginHorizontal: 20,
    marginVertical: 10
  },
  txtheader: {
    //textAlign: 'center',
    fontSize: 24,
    marginLeft: 60
  },
  viewDay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginHorizontal: 120,
    marginVertical: 50


  },
  viewAvatar: {
    alignItems: 'center'
  },
  icon: {
    width: scale(16),
    height: scale(16),
    marginHorizontal: 20,
    marginVertical: 10
  },
  view: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 5
  },
  txtBody: {
    fontSize: 20,
    flex: 0.6
  },
  txtDisplay: {
    fontSize: 20
  },
  txtChart: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30
  },
  txtName: {
    fontSize: 22,
    marginVertical: 15
  },
  icUser: {
    width: scale(32),
    height: scale(32),
    marginHorizontal: 20,
    marginVertical: 10
  },
  viewChoose: {
    marginHorizontal: 30,
    marginVertical: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },

  txtChoose: {
    fontSize: 20,
    flex: 0.95
  },
  btnLogout: {
    marginHorizontal: 80,
    marginTop: 350

  }


});
// 0: user, 1: auto; -1: khong dieu khien


export default Setting;