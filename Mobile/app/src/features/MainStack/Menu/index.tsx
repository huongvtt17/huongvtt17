import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import icons from '@/assets/icons';
import { scale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { Button } from '@/components/HOC';
import { firebase } from '@react-native-firebase/database';
import { RadioButton } from 'react-native-paper';


const Menu = memo(() => {
  const { navigate } = useNavigation();
  const { goBack } = useNavigation();

  const profile: any = useSelector((state: RootState) => state.profileSlice.data);
  
  const [checked, setChecked] = React.useState();
  const onSave = (value: any) => {
    //console.log('formData', formData)
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('Mode/')
      .set(value)
    setChecked(value)
  }
  useEffect(() =>{
    firebase
    .app()
    .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('Mode/')
    .on('value', (snapshot: { val: () => any; }) => {
      setChecked(snapshot.val())
    })
  }, [])

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
        <Text style={styles.txtheader}>CHỌN CHẾ ĐỘ</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={styles.viewChoose}>
          <Image
            source={icons.setting.auto}
            style={styles.icUser }
       
          />
          <Text style={styles.txtChoose}>Chế độ auto</Text>
          <RadioButton
            value={2}
            status={checked == 2 ? 'checked' : 'unchecked'}
            onPress={() => onSave(2)}
          />
        </View>

        <View style={styles.viewChoose}>
          <Image
            source={icons.setting.user}
            style={styles.icUser}
          />
          
          <Text style={styles.txtChoose}>Chế độ người dùng</Text>
        
          <RadioButton
            value={1}
            status={checked == 1 ? 'checked' : 'unchecked'}
            onPress={() => {onSave(1), navigate('ModeSetting')} }
            
          />
        </View>
        <View style={styles.viewChoose}>
          <Image
            source={icons.setting.no}
            style={styles.icUser}
          />
          <Text style={styles.txtChoose}>Không điều khiển</Text>
          <RadioButton
            value={0}
            status={checked == 0 ? 'checked' : 'unchecked'}
            onPress={() => onSave(0)}
          />
        </View>
        <View>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5

  },
  icMenu: {
    width: scale(30),
    height: scale(30),
    marginHorizontal: 20,
    marginVertical: 10,
    tintColor: 'black'
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
    fontSize: 20,
    marginVertical: 15
  },
  icUser: {
    width: scale(40),
    height: scale(40),
    marginHorizontal: 20,
    marginVertical: 10,
    tintColor: '#0386D0'
  },
  viewChoose: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#0386D0',
    backgroundColor: '#f0e68c',
    height: 80

  },
  txtChoose: {
    fontSize: 22,
    flex: 0.95
  },
  btnLogout: {
    marginHorizontal: 100
  }


});
// 0: user, 1: auto; -1: khong dieu khien


export default Menu;