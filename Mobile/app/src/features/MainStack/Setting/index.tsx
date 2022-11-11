import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import icons from '@/assets/icons';
import { scale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { Button } from '@/components/HOC';
import { replace } from '@/utils/navigation';

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
        <Text style={styles.txtheader}>Cài đặt</Text>
      </View>
      <View style={styles.viewAvatar}>
        <View style={{
          height:100, 
          width:100, 
          backgroundColor:'white',
          borderRadius:50,
          marginTop: 30,
          }}>
            <View style={{
          alignSelf: 'center'}}>
              <Text>H</Text>
            </View>
          </View>
          <Text style={styles.txtName}>Huongvtt17@gmail.com</Text>
      </View>
      
      <View style={styles.viewChoose}>
        <Image
          source={icons.setting.moon}
          style={styles.icUser}
        />
        <Text style={styles.txtChoose}>Chế độ tối</Text> 
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled_3 ? "#81b0ff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            onValueChange={toggleSwitch_3}
            value={isEnabled_3}
            
          />
      </View>
      <View style={styles.viewChoose}>
        <Image
          source={icons.setting.user}
          style={styles.icUser}
        />
        <Text style={styles.txtChoose}>Âm thanh</Text> 
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled_4 ? "#81b0ff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            onValueChange={toggleSwitch_4}
            value={isEnabled_4}
          />
      </View>
      <View style = {styles.btnLogout}>
     <Button 
      customTextStyle={{ color: 'black' }}
      color={'#E8E6E6'}
      onPress={onLogout}
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
    fontSize: 20,
    marginVertical:15
  },
  icUser: {
    width: scale(32),
    height: scale(32),
    marginHorizontal: 20,
    marginVertical: 10
  },
  viewChoose: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
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