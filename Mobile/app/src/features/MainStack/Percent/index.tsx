import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import icons from '@/assets/icons';
import { scale } from 'react-native-size-matters';
import { goBack } from '@/utils/navigation';


const Percent = memo(() => {
  const { navigate } = useNavigation();
  const { goBack} = useNavigation();

  return (
  <>
    <View style={styles.header}>
      <TouchableOpacity
       activeOpacity={0.7}
       onPress={() => {goBack()}}>
        <Image
            source={icons.temperature.back}
            style={styles.icMenu}
          />
          </TouchableOpacity>
          <Text style={styles.txtheader}>Độ ẩm không khí</Text>
    </View>
    <View style={styles.viewDay}>
      <TouchableOpacity>
        <Image
            source={icons.temperature.back}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.txtDay}>Tháng 10 12</Text>
        <TouchableOpacity>
        <Image
            source={icons.temperature.next}
            style={styles.icon}
          />
        </TouchableOpacity>
    </View>
    <View style={styles.view}>
      <Text style={styles.txtBody} >Độ ẩm cao nhất:</Text>
      <Text style={styles.txtDisplay}> 30%</Text>
    </View>
    <View style={styles.view}>
      <Text style={styles.txtBody} >Độ ẩm thấp nhất:</Text>
      <Text style={styles.txtDisplay}> 20%</Text>
    </View>
    <View style={styles.view}>
      <Text style={styles.txtBody} >Độ ẩm trung bình:</Text>
      <Text style={styles.txtDisplay}> 25%</Text>
    </View>
    <Text style={styles.txtChart}>Biểu đồ</Text>
    <View>
     
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
    backgroundColor:'#ffffff',
    marginHorizontal: 120,
    marginVertical: 50
  

  },
  txtDay: {

  },
  icon: {
    width: scale(16),
    height: scale(16),
    marginHorizontal: 20,
    marginVertical: 10
  },
  view: {
    flexDirection:'row',
    marginHorizontal: 30,
    marginVertical: 5
  },
  txtBody: {
    fontSize: 20,
    flex:0.6
  },
  txtDisplay: {
    fontSize: 20
  },
  txtChart: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30
  }
});


export default Percent;