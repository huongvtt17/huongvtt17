import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, ActivityIndicator, Image, Switch, Alert, } from 'react-native';
import { FlatListPackageHome, FlatListUser, Spinner } from '@/components/HOC';
import { useTranslation } from 'react-i18next';
import { navigate } from '@/utils/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import icons from '@/assets/icons';
import { height_screen, width_screen } from '@/utils';
import { followingClinic, getProducts, getProfile, getClinics, getVaccines } from '@/services';
import { setProfile } from '@/redux/ProfileSlice';
import { font, font_size } from '@/configs/fonts';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import database from '@react-native-firebase/database';
import { firebaseApp } from '@/Firebase/ConfigFirebase';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';
import { Database, getDatabase, ref, set } from "firebase/database";
import { Button } from '@/components/HOC';
import { useNavigation } from '@react-navigation/native';
import { sample } from 'lodash';


const HomePage = memo(() => {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.accessTokenSlice.token);
  const profile: any = useSelector((state: RootState) => state.profileSlice.data);
  const [formData, setFormData]: any = React.useState();
  const { goBack } = useNavigation();

  const [isEnabled_1, setIsEnabled_1] = useState(false);
  const [isEnabled_2, setIsEnabled_2] = useState(false);
  const [isEnabled_3, setIsEnabled_3] = useState(false);

  const toggleSwitch_1 = () => setIsEnabled_1(previousState => !previousState);
  

  const onChangeData = (key: any, value: any) => {
    setFormData({
      ...formData,
      [key]: value
    })
  }
  const onSave = () => {
    //console.log('formData', formData)
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('Condition/')
      .update(formData)
    Alert.alert('Đã lưu thành công')
  }

  useEffect(() => {
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('Condition/')
      .on('value', (snapshot: { val: () => any; }) => {
        console.log('snapshot', snapshot.val())

        setFormData(snapshot.val())
      }
      )
  }, [])



  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { goBack() }}
        >
          <Image
            source={icons.temperature.back}
            style={styles.icBack}
          />
        </TouchableOpacity>
        <Text style={styles.txtheader}>CÀI ĐẶT NGƯỠNG</Text>
      </View>

      <View style={styles.viewControl}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image
              source={icons.modesetting.fan}
              style={{ height: scale(50), width: scale(50), marginHorizontal: 20, marginVertical: 10 }}
            />
            <Text style={styles.txtbody}>Quạt</Text>
          </View>
          <View style={styles.viewToggle}>
            <Text style={styles.txtInfo}>Chế độ hoạt động theo ngưỡng nhiệt độ</Text>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txtInfo}>Nhiệt độ từ</Text>
            <View style={styles.viewInput1}>
              <TextInput
                style={styles.txtInput}
                value={`${formData?.minTemp}`}
                onChangeText={(val: any) => onChangeData('minTemp', val)}
              />
            </View>
            <Text style={styles.txtInfo}>℃ đến</Text>
            <View style={styles.viewInput1}>
              <TextInput
                style={styles.txtInput}
                value={`${formData?.maxTemp}`}
                onChangeText={(val: any) => onChangeData('maxTemp', val)}
              />
            </View>
            <Text style={styles.txtInfo}>℃</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewControl}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={icons.modesetting.phunsuong}
              style={{ height: scale(50), width: scale(50),marginHorizontal: 20, marginVertical: 10  }}
            />
            <Text style={styles.txtbody}>Phun sương</Text>
          </View>
          <View style={styles.viewToggle}>

            <Text style={styles.txtInfo}>Chế độ hoạt động theo ngưỡng độ ẩm</Text>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txtInfo}>Độ ẩm từ</Text>
            <View style={styles.viewInput1}>
              <TextInput
                style={styles.txtInput}
                value={`${formData?.minMoisture}`}
                onChangeText={(val: any) => onChangeData('minMoisture', val)}
              />
            </View>
            <Text style={styles.txtInfo}>% đến</Text>
            <View style={styles.viewInput1}>
              <TextInput
                style={styles.txtInput}
                value={`${formData?.maxMoisture}`}
                onChangeText={(val: any) => onChangeData('maxMoisture', val)}
              />
            </View>
            <Text style={styles.txtInfo}>%</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewControl}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={icons.modesetting.van}
              style={{ height: scale(56), width: scale(56),marginHorizontal: 20, marginVertical: 10  }}
            />
            <Text style={styles.txtbody}>Khí CO2</Text>
          </View>
          <View style={styles.viewToggle}>

            <Text style={styles.txtInfo}>Chế độ hoạt động theo ngưỡng nồng độ</Text>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txtInfo}>Nồng độ từ</Text>
            <View style={styles.viewInput1}>
              <TextInput
                style={styles.txtInput}
                value={`${formData?.minCo2}`}
                onChangeText={(val: any) => onChangeData('minCo2', val)}
              />
            </View>
            <Text style={styles.txtInfo}>ppm đến</Text>
            <View style={styles.viewInput1}>
              <TextInput
                style={styles.txtInput}
                value={`${formData?.maxCo2}`}
                onChangeText={(val: any) => onChangeData('maxCo2', val)}
              />
            </View>
            <Text style={styles.txtInfo}>ppm</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnSave}>
        <Button
          onPress={onSave}
        >
          Lưu thay đổi
        </Button>
      </View>

    </>
  );
});

const styles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5

  },
  icBack: {
    width: scale(24),
    height: scale(24),
    marginHorizontal: '5@ms',
    marginVertical: '10@ms'

  },
  txtheader: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 60,


  },
  viewControl: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 15,
    borderRadius: 10,
    borderColor: '#0386D0',
    backgroundColor: '#ffffff'
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '20@ms',

  },
  icToggle: {

  },
  txtbody: {
    fontSize: 26,

  },

  viewInput: {
    flexDirection: 'row',
    marginHorizontal: '20@ms',
    alignItems: 'center',
    marginBottom: 20
  },
  txtInfo: {
    fontSize: 17
  },
  viewInput1: {
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: '#469FD1',
    height: 45,
    width: 60,
    alignItems: 'center',
    


  },
  txtInput: {
    color: 'black',
    fontSize: 16,
  },
  btnSave: {
    marginTop: '20@ms',
    marginHorizontal: '50@ms',
  }
});

export default HomePage;
