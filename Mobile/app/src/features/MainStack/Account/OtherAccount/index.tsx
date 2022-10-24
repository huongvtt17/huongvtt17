import icons from '@/assets/icons';
import { Button } from '@/components/HOC';
import { font, font_size } from '@/configs/fonts';
import { RootState } from '@/redux';
import { width_screen } from '@/utils';
import { goBack, navigate, replace } from '@/utils/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, Platform, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const OtherAccount = memo(() => {
  const { t } = useTranslation();
  const profile: any = useSelector((state: RootState) => state.profileSlice.data);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
        <Image
          source={icons.header.white_back}
          style={styles.icoBack}
        />
        </TouchableOpacity>
        <View style={styles.viewInfo}>
          <View style={styles.viewTop} />
          <View style={styles.containerAvatar}>
            <View style={styles.viewAvatar}>
              <View style={{ alignItems: 'center' }}>
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
                <Text style={styles.txtLevel}>Lv.7</Text>
              </View>
              <View style={styles.viewName}>
                <Text style={styles.txtName}>{'Yoona'}</Text>
                <Text style={styles.txtPhone}>Chị yêu của bạn Thu KHỈ</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.viewFollow}>
                  <Text style={styles.txtFollow}>Theo dõi</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
                  <Image
                    source={icons.profile.star}
                    style={styles.icoStar}
                  />
                  <Image
                    source={icons.profile.star}
                    style={styles.icoStar}
                  />
                  <Image
                    source={icons.profile.star}
                    style={styles.icoStar}
                  />
                  <Image
                    source={icons.profile.star}
                    style={styles.icoStar}
                  />
                  <Image
                    source={icons.profile.star}
                    style={styles.icoStar}
                  />
                </View>
              </View>
            </View>
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

        <View style={styles.viewRow}>
          <View style={styles.viewAchieve}>
            <ImageBackground source={icons.account.tag} style={styles.icoTag}>
              <Text style={styles.txtRank}>1</Text>
            </ImageBackground>
            <Text style={styles.txtAchieve}>Top 1 đóng góp tuần</Text>
          </View>
          <View style={styles.viewAchieve}>
            <ImageBackground source={icons.account.tag} style={styles.icoTag}>
              <Text style={styles.txtRank}>1</Text>
            </ImageBackground>
            <Text style={styles.txtAchieve}>Top 1 đóng góp tuần</Text>
          </View>
          <View style={styles.viewAchieve}>
            <ImageBackground source={icons.account.tag} style={styles.icoTag}>
              <Text style={styles.txtRank}>1</Text>
            </ImageBackground>
            <Text style={styles.txtAchieve}>Top 1 đóng góp tuần</Text>
          </View>
        </View>

        <View style={styles.containerPk}>
          <TouchableOpacity style={styles.viewPk}>
            <View>
              <Text style={styles.txtPk}>100</Text>
              <Text style={styles.txtPk1}>Câu hỏi</Text>
            </View>
            <Image
              source={icons.profile.next}
              style={styles.icoStar}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewPk}>
            <View>
              <Text style={styles.txtPk}>10</Text>
              <Text style={styles.txtPk1}>Bộ câu hỏi</Text>
            </View>
            <Image
              source={icons.profile.next}
              style={styles.icoStar}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: Platform.OS == 'android' ? '15@ms' : moderateScale(getStatusBarHeight() + 15),
  },
  containerTop: {
    backgroundColor: '#314C1C',
    height: 170,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  viewTop: {
    backgroundColor: 'white',
    marginTop: 45,
    flex: 1,
    height: 200,
    borderRadius: 10,
    paddingTop: 70
  },
  containerAvatar: {
    position: 'absolute',
    top: 10,
    left: 40
  },
  viewAvatar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icoAvatar: {
    width: '110@ms',
    height: '110@ms',
    borderRadius: '55@ms',
    borderWidth: 2,
    borderColor: 'white'
  },
  viewFollow: {
    marginTop: 5
  },
  txtFollow: {
    color: '#314C1C',
    borderWidth: 1,
    borderColor: '#314C1C',
    paddingVertical: '3@ms',
    borderRadius: 20,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: '13@ms'
  },
  txtLevel: {
    color: 'white',
    borderWidth: 1,
    backgroundColor: '#314C1C',
    paddingVertical: '3@ms',
    paddingHorizontal: '13@ms',
    borderRadius: 20,
    marginTop: 15
  },
  icoBack: {
    width: '40@ms',
    height: '40@ms',
    marginTop: 10,
    marginLeft: 10
  },
  viewName: {
    marginLeft: '15@ms',
    flex: 1
  },
  txtName: {
    fontFamily: font.SFProTextSemibold,
    fontSize: font_size.VERY_SMALL * 2,
    color: 'white'
  },
  txtPhone: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: '#314C1C'
  },
  icoStar: {
    width: '30@ms',
    height: '30@ms',
    marginRight: '5@ms'
  },
  containerLike: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  viewLike: {
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20
  },
  viewPk: {
    width: width_screen / 2 - 50,
    height: 100,
    backgroundColor: '#314C1C',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  txtPk: {
    fontFamily: font.SFProTextBold,
    fontSize: font_size.LARGE * 2,
    color: 'white',
    lineHeight: 40
  },
  txtPk1: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: 'white'
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '35@ms',
    marginHorizontal: '15@ms'
  },
  viewAchieve: {
    backgroundColor: 'white',
    width: width_screen / 3 - 20,
    padding: '10@ms',
    paddingTop: '20@ms',
    borderRadius: '10@ms'
  },
  txtAchieve: {
    fontFamily: font.SFProTextRegular,
    fontSize: font_size.NORMAL,
    color: '#314C1C',
    textAlign: 'center'
  },
  txtRank: {
    fontFamily: font.SFProTextSemibold,
    fontSize: font_size.VERY_LARGE,
    color: 'white',
    marginBottom: 7
  },
  icoTag: {
    width: '40@ms',
    height: '40@ms',
    position: 'absolute',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OtherAccount;