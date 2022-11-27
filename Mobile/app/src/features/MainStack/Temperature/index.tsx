import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewPagerAndroid } from 'react-native';
import icons from '@/assets/icons';
import { scale } from 'react-native-size-matters';
//import {LineChart} from 'react-native-charts-wrapper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { firebase } from '@react-native-firebase/database';
import { current } from '@reduxjs/toolkit';
import moment from 'moment';


const Temperature = memo(() => {
  const { navigate } = useNavigation();
  const { goBack } = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [currentDate, setCurrentDate] = useState(new Date().getTime());
  const [values, setValues] = useState();
  const [values1, setValues1] = useState();
  const [list, setList] = useState([0])

  useEffect(() => {
    firebase
      .app()
      .database('https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`Data/${moment(currentDate).format('DD-MM-YYYY')}`)
      .on('value', (snapshot: { val: () => any; }) => {
        //setList(snapshot.val())
        let objs = snapshot.val()

        if (objs) {
          let keyList = Object.keys(objs)
          let newArr = []

          for (let i = 0; i < keyList.length; i++) {
            newArr.unshift({
              time: keyList[i],
              data: objs[keyList[i]]
            })
          }
          

          let newGroup = [];
          for (let i = 0; i < 24; i++) {
            let group = newArr.filter((ele: any) => ele.time.substring(0, 2) == i)


            if (group && group.length > 0) {
              var max = group.sort((a, b): any => {
                return new Date('2022-11-20T' + a.time).getTime() - new Date('2022-11-20T' + b.time).getTime();
              });
              newGroup.push(max[0]?.data?._Temperature)
            } else {
              newGroup.push(0)
            }
          }
          //console.log('newGroup', newGroup)
          setList(newGroup)
        } else {
          let arr = []
          for (let i = 0; i < 24; i++){
            arr.push(0)
          }
          setList(arr)
        }
      }
      )

  }, [currentDate])
  //console.log(list);
  
  const Chart = () => {
    let arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    console.log('abc',JSON.stringify(list));
    
    if(JSON.stringify(list) == JSON.stringify(arr)){
      
      return(
        <View style={styles.viewIcon}>
          <Text style= {{fontSize: 20, marginBottom: 70}}>Chưa có dữ liệu</Text>
          <Image
          source={icons.temperature.circle}
          style={{height:scale(100), width: scale(100)}}
        />
        </View>
      )
    }
    else{
      return(
        <>
        <View style={styles.view}>
        <Text style={styles.txtBody} >Nhiệt độ cao nhất:</Text>
        <Text style={styles.txtDisplay}> 30ºC</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.txtBody} >Nhiệt độ thấp nhất:</Text>
        <Text style={styles.txtDisplay}> 20ºC</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.txtBody} >Nhiệt độ trung bình:</Text>
        <Text style={styles.txtDisplay}> 25ºC</Text>
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
          height={300}
          chartConfig={chartConfig}
          yAxisInterval={4}
        />
      </View>
        </>
      )
    }
  }
  const data = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
      "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
      {
        data: [...list],
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

  const onPressback = () => {
    setCurrentDate(prev => prev - 86400000)
  }
  const onPressnext = () => {
    setCurrentDate(prev => prev + 86400000)
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
        <Text style={styles.txtheader}>Nhiệt độ</Text>
      </View>
      <View style={styles.viewDay}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressback}
        >
          <Image
            source={icons.temperature.back}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.txtDay}>{moment(currentDate).format('DD-MM-YYYY')}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          //onPress={() => setList([1,2])}
          onPress={onPressnext}
        >
          <Image
            source={icons.temperature.next}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      
      
      
     
      {/* <View style={{flex: 1, backgroundColor: 'white'}}>
    <LineChart style={styles.chart}
            data={{dataSets:[{label: "demo", values: [{y: 2}, {y: 2}, {y: 1}]}]}}
          />
    </View> */}
     {/* <Text style={styles.txtChart}>Biểu đồ</Text>
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
          yAxisInterval={4}
        />
      </View> */}
      <Chart/>
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
    backgroundColor: '#ffffff',
    marginVertical: 50,
    alignSelf: 'center'


  },
  txtDay: {
    fontSize: 20
  },
  icon: {
    width: scale(16),
    height: scale(16),
    marginHorizontal: 20,
    marginVertical: 20,
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
  chart: {
    flex: 1
  },
  viewIcon: {
    alignItems: 'center',
    marginVertical: 60,
    alignSelf: 'center',
   
  },
 
});


export default Temperature;