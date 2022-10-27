import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import icons from '@/assets/icons';
import { scale } from 'react-native-size-matters';
import { goBack } from '@/utils/navigation';
import { LineChart } from 'react-native-chart-kit';


const Percent = memo(() => {
  const { navigate } = useNavigation();
  const { goBack} = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
      "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
      {
        data: [20, 45, 28, 80, 120, 43, 12, 45, 43, 11, 75, 34, 23, 65, 34, 21, 53, 54, 52, 46, 87, 11, 32, 76],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional

        strokeWidth: 2 // optional
      }
    ],
    legend: ["Temperature"] // optional
  };
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",

    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `#333`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

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
        <LineChart
          onDataPointClick={({ value, dataset, getColor }) => {
            console.log('test:', value)
          }
          }
          data={data}
          width={screenWidth}
          height={270}
          chartConfig={chartConfig}
        />
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