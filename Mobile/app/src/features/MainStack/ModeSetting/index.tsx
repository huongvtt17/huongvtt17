import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, ActivityIndicator, Image, Switch, } from 'react-native';
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
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import database from '@react-native-firebase/database';
import { firebaseApp } from '@/Firebase/ConfigFirebase';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';
import { Database, getDatabase, ref, set } from "firebase/database";
import { Button } from '@/components/HOC';
import { useNavigation } from '@react-navigation/native';


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
  const toggleSwitch_2 = () => setIsEnabled_2(previousState => !previousState);
  const toggleSwitch_3 = () => setIsEnabled_3(previousState => !previousState);
  const onChangeData = (key: any, value: any) => {
    setFormData({
      ...formData,
      [key]: value
    })
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

  const onSave = () => {
    //console.log('formData', formData)
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('Condition/')
      .update(formData)
  }

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
        <Text style={styles.txtheader}>Cài đặt chế độ</Text>
      </View>

      <View style={styles.viewControl}>
        <View>
          <Text style={styles.txtbody}>Quạt</Text>
          <View style={styles.viewToggle}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled_1 ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch_1}
              value={isEnabled_1}
            />

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
          <Text style={styles.txtbody}>Phun sương</Text>
          <View style={styles.viewToggle}>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled_2 ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch_2}
              value={isEnabled_2}
            />
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
          <Text style={styles.txtbody}>Khí CO2</Text>
          <View style={styles.viewToggle}>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled_3 ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch_3}
              value={isEnabled_3}
            />
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
    marginBottom: 40

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
    marginHorizontal: '20@ms'

  },
  icToggle: {

  },
  txtbody: {
    fontSize: 24
  },

  viewInput: {
    flexDirection: 'row',
    marginHorizontal: '20@ms',
    alignItems: 'center',
    marginBottom: 20
  },
  txtInfo: {
    fontSize: 16
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
    marginTop: '30@ms',
    marginHorizontal: '50@ms',
  }
});

export default HomePage;
