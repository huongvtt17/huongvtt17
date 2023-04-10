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
import { Svg, Text as TextSVG, Rect } from 'react-native-svg';


const Temperature = memo(() => {
  const { navigate } = useNavigation();
  const { goBack } = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [currentDate, setCurrentDate] = useState(new Date().getTime());
  const [values, setValues] = useState();
  const [values1, setValues1] = useState();
  const [list, setList] = useState([0, 0])
  const [maxValue, setmaxValue] = useState();
  const [minValue, setminValue] = useState();

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
              newGroup.push(max[0]?.data?._Temperature || 0)
            } else {
              newGroup.push(0)
            }
          }
          //console.log('newGroup', newGroup)
          setList(newGroup)
        } else {
          let arr = []
          for (let i = 0; i < 24; i++) {
            arr.push(0)
          }
          setList(arr)
        }
      }
      )

  }, [currentDate])
  //console.log(list);

  useEffect(() => {
    let max_val = list.reduce(function (accumulator, element) {
      return (accumulator > element) ? accumulator : element
    });
    setmaxValue(max_val);
    let min_val = list.reduce(function (accumulator, element) {
      return (accumulator < element) ? accumulator : element
    });
    setminValue(min_val);
  })

  const Chart = () => {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //console.log('abc',JSON.stringify(list));
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

    console.log('list', list)
    if (JSON.stringify(list) == JSON.stringify(arr)) {
      return (
        <View style={styles.viewIcon}>
          <Text style={{ fontSize: 20, marginBottom: 70 }}>Chưa có dữ liệu</Text>
          <Image
            source={icons.temperature.circle}
            style={{ height: scale(100), width: scale(100) }}
          />
        </View>
      )
    }
    else {
      return (
        <>
          <View style={styles.view}>
            <Text style={styles.txtBody} >Nhiệt độ cao nhất:</Text>
            <Text style={styles.txtDisplay}> {maxValue}ºC</Text>
          </View>
          <View style={styles.view}>
            <Text style={styles.txtBody} >Nhiệt độ thấp nhất:</Text>
            <Text style={styles.txtDisplay}> {minValue}ºC</Text>
          </View>
          <Text style={styles.txtChart}>Biểu đồ</Text>
          <View>
            <LineChart
              onDataPointClick={(data) => {
                if (data) {
                  let isSamePoint = (tooltipPos.x === data.x
                    && tooltipPos.y === data.y)

                  isSamePoint ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    }
                  })
                    :
                    setTooltipPos({ x: data.x - 7, value: data.value, y: data.y - 50, visible: true });
                }
              }
              }
              decorator={() => {
                return tooltipPos.visible ?
                  <View>
                    <Svg>
                      <Rect x={tooltipPos.x - 15}
                        y={tooltipPos.y + 10}
                        width="40"
                        height="30"
                        fill="#f0f8ff" />
                      <TextSVG
                        x={tooltipPos.x + 5}
                        y={tooltipPos.y + 30}
                        fill="#333"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle">
                        {tooltipPos.value}
                      </TextSVG>
                    </Svg>
                  </View> : null
              }}
              data={{
                labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
                  "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                datasets: [
                  {
                    data: [...list],
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            
                    strokeWidth: 2 // optional
                  }
                ],
                legend: ["Temperature"], // optional
              }}
              width={screenWidth}
              height={350}
              chartConfig={chartConfig}
              yAxisInterval={4}
            />
          </View>
        </>
      )
    }
  }
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    //backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",

    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `#333`,
    strokeWidth: 2, // optional, default 3
    //barPercentage: 0.5,
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
        <Text style={styles.txtheader}>NHIỆT ĐỘ</Text>
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
        {
          moment(currentDate).format('DD-MM-YYYY') != moment(new Date()).format('DD-MM-YYYY') ?
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
            : <View style={styles.button}/>
        }
      </View>
      <Chart />
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
  button: {
    width: scale(16),
    height: scale(16),
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: 'white'
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