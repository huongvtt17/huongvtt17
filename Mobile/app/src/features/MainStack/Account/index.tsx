import icons from '@/assets/icons';
import { font, font_size } from '@/configs/fonts';
import { RootState } from '@/redux';
import { width_screen } from '@/utils';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';
import { navigate } from '@/utils/navigation';

const Account = memo(() => {
  const { t } = useTranslation();
  const profile: any = useSelector((state: RootState) => state.profileSlice.data);
  const [index, setIndex] = useState(0)
  let list = [
    { id: 1, name: 'Hôm nay' },
    { id: 2, name: 'Hôm qua' },
    { id: 3, name: 'Tuần này' },
    { id: 4, name: 'Tháng này' },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.viewRow}>
          {true ?
            <FastImage
              source={{
                uri: `https://kenh14cdn.com/2020/8/10/photo-1-1597051380162862366200.jpg`,
                priority: FastImage.priority.normal,
              }}
              style={styles.icoAvatar}
            /> :
            <Image
              source={icons.other.profile}
              style={styles.icoAvatar}
            />
          }
          <View style={{ flex: 1 }}>
            <View style={styles.viewRow1}>
              <Text style={styles.txtName}>{'Yoona'}</Text>
              <TouchableOpacity style={styles.viewEdit} activeOpacity={0.7} onPress={() => navigate('UpdateInfo')}>
                <Image
                  source={icons.account.edit}
                  style={[styles.icoStar, { marginRight: 0 }]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.txtPhone}>Chị yêu của bạn Thu KHỈ</Text>
          </View>
        </View>
        <Text style={styles.txtAchieve}>{'Top 1 người dùng tích cực'}</Text>
      </View>

      <View style={styles.viewInfo}>
        <View style={styles.containerAvatar}>
          <View style={styles.containerLike}>
            <View style={styles.viewLike}>
              <Text style={styles.txtAmount}>100</Text>
              <Text style={styles.txtLike}>Likes</Text>
            </View>
            <View style={styles.viewCol} />
            <View style={styles.viewLike}>
              <Text style={styles.txtAmount}>4.7</Text>
              <Text style={styles.txtLike}>Stars</Text>
            </View>
            <View style={styles.viewCol} />
            <View style={styles.viewLike}>
              <Text style={styles.txtAmount}>1K</Text>
              <Text style={styles.txtLike}>Followers</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 25 }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerPk}>
          <Text style={styles.txtHeader}>{'Thành tích'}</Text>
          <View style={styles.viewItem}>
            <TouchableOpacity style={styles.viewPk}>
              <View style={styles.viewRow}>
                <Image
                  source={icons.account.question}
                  style={styles.icoStar}
                />
                <Text style={styles.txtPk1}>Câu hỏi</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.txtPk}>100</Text>
                <Image
                  source={icons.account.next}
                  style={styles.icoNext}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewPk}>
              <View style={styles.viewRow}>
                <Image
                  source={icons.account.coin}
                  style={styles.icoStar}
                />
                <Text style={styles.txtPk1}>Điểm</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.txtPk}>3000</Text>
                <Image
                  source={icons.account.next}
                  style={styles.icoNext}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.viewItem}>
            <TouchableOpacity style={styles.viewPk}>
              <View style={styles.viewRow}>
                <Image
                  source={icons.account.question}
                  style={styles.icoStar}
                />
                <Text style={styles.txtPk1}>Câu hỏi</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.txtPk}>100</Text>
                <Image
                  source={icons.account.next}
                  style={styles.icoNext}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewPk}>
              <View style={styles.viewRow}>
                <Image
                  source={icons.account.package}
                  style={styles.icoStar}
                />
                <Text style={styles.txtPk1}>Bộ câu hỏi</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.txtPk}>100</Text>
                <Image
                  source={icons.account.next}
                  style={styles.icoNext}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerPk1}>
          <Text style={styles.txtHeader}>{'Đã hoàn thành'}</Text>
          <View style={styles.containerBottom}>
            <View style={styles.viewRow1}>
              {list.map((item: any, i: any) => {
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    onPress={() => setIndex(i)}>
                    <Text style={[styles.activeTab, { borderBottomColor: index == i ? '#314C1C' : 'white' }]}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.viewRow1}>
              <View style={styles.viewQuestion}>
                <Text style={styles.txtAmount1}>100<Text style={styles.txtQuestion}> Câu hỏi</Text></Text>
                <Progress.Circle size={90} color={'#314C1C'} progress={0.66} showsText={true} textStyle={{ fontSize: 16 }} thickness={10} />
                <Text style={styles.txtQuestion1}>Phần trăm trả lời đúng</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('SolvedQuestion')}>
                  <Text style={styles.txtSee}>Xem lại</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.viewCol, { height: '80%', marginTop: 10 }]} />
              <View style={styles.viewQuestion}>
                <Text style={styles.txtAmount1}>100<Text style={styles.txtQuestion}> Bộ câu hỏi</Text></Text>
                <Progress.Circle size={90} color={'#314C1C'} progress={0.5} showsText={true} textStyle={{ fontSize: 16 }} thickness={10} />
                <Text style={styles.txtQuestion1}>Trung bình điểm</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('SolvedPackage')}>
                  <Text style={styles.txtSee}>Xem lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE2D5'
  },
  viewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '15@ms',
    paddingTop: Platform.OS == 'android' ? '25@ms' : moderateScale(getStatusBarHeight() + 25),
  },
  containerTop: {
    backgroundColor: '#314C1C',
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: Platform.OS == 'android' ? '25@ms' : moderateScale(getStatusBarHeight() + 25),
    paddingHorizontal: '15@ms'
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerAvatar: {
    position: 'absolute',
    top: -40,
    left: 25,
    backgroundColor: 'white',
    borderRadius: '30@ms',
    width: width_screen - 50
  },
  viewAvatar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icoAvatar: {
    width: '80@ms',
    height: '80@ms',
    borderRadius: '55@ms',
    borderWidth: 2,
    borderColor: 'white',
    marginRight: '15@ms'
  },
  txtName: {
    fontFamily: font.SFProTextSemibold,
    fontSize: font_size.VERY_SMALL * 2,
    color: 'white'
  },
  txtAchieve: {
    fontFamily: font.SFProTextSemibold,
    fontSize: font_size.VERY_LARGE,
    color: 'white',
    alignSelf: 'center',
    marginTop: '10@ms'
  },
  txtPhone: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: 'white'
  },
  icoStar: {
    width: '20@ms',
    height: '20@ms',
    marginRight: '5@ms'
  },
  containerLike: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewLike: {
    alignItems: 'center',
    paddingVertical: 5,
    flex: 1
  },
  txtAmount: {
    fontFamily: font.SFProTextBold,
    fontSize: font_size.LARGE * 2,
    color: '#314C1C',
    lineHeight: 40
  },
  txtLike: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: '#314C1C'
  },
  viewCol: {
    height: '60%',
    backgroundColor: 'rgba(49, 76, 28, 0.7)',
    width: 1
  },
  containerPk: {
    marginHorizontal: 15
  },
  containerPk1: {
    marginHorizontal: 15,
    marginTop: '20@ms'
  },
  viewPk: {
    width: width_screen / 2 - 25,
    height: 55,
    borderWidth: 1,
    borderColor: '#314C1C',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    shadowRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    elevation: 4
  },
  txtPk: {
    fontFamily: font.SFProTextBold,
    fontSize: font_size.VERY_LARGE + 4,
    color: '#314C1C'
  },
  txtPk1: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: '#314C1C'
  },
  txtHeader: {
    fontFamily: font.SFProTextBold,
    fontWeight: '700',
    fontSize: font_size.VERY_LARGE + 2,
    color: '#314C1C'
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15@ms'
  },
  icoNext: {
    width: '12@ms',
    height: '12@ms'
  },
  containerBottom: {
    backgroundColor: 'white',
    padding: '10@ms',
    marginTop: '10@ms',
    borderRadius: '10@ms',
    shadowRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    elevation: 4
  },
  viewRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  activeTab: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: '#314C1C',
    borderBottomWidth: 1
  },
  viewQuestion: {
    flex: 1,
    alignItems: 'center'
  },
  txtAmount1: {
    fontFamily: font.SFProTextBold,
    fontSize: font_size.VERY_SMALL * 2,
    color: '#314C1C',
    marginTop: '10@ms',
    marginBottom: '5@ms'
  },
  txtQuestion: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.VERY_LARGE,
    color: '#314C1C',
    fontWeight: '600'
  },
  txtQuestion1: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.VERY_SMALL,
    color: 'rgba(49, 76, 28, 0.5)',
    marginTop: '5@ms'
  },
  txtSee: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: '#3F6766',
    textDecorationLine: 'underline'
  },
  viewEdit: {
    width: '28@ms',
    height: '28@ms',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Account;
