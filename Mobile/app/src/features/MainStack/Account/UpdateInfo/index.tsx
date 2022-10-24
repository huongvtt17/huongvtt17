import icons from '@/assets/icons';
import { Button } from '@/components/HOC';
import { font, font_size } from '@/configs/fonts';
import { RootState } from '@/redux';
import { width_screen } from '@/utils';
import { goBack, navigate, replace } from '@/utils/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, Platform, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const UpdateInfo = memo(() => {
    const { t } = useTranslation();
    const profile: any = useSelector((state: RootState) => state.profileSlice.data);

    const bookingInfo = [
        {
            data: 'Yoona',
            type: 'Họ tên',
            isChange: true,
            onPress: () => { }
        },
        {
            data: 'thudien@gmail.sothu',
            type: 'Email',
            isChange: true,
            onPress: () => { }
        },
        {
            data: '15/01/1990',
            type: 'Ngày sinh',
            isChange: false,
            onPress: () => { }
        },
        {
            data: 'Nữ',
            type: 'Giới tính',
            isChange: false,
            onPress: () => { }
        }
    ]


    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                        <Image
                            source={icons.header.white_back}
                            style={styles.icoBack}
                        />
                    </TouchableOpacity>
                    <View style={styles.viewInfo}>
                        <View style={styles.containerAvatar}>
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
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.txtChange}>Đổi ảnh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerCnt}>
                        {bookingInfo.map((item, index) => {
                            return (
                                <View style={styles.containerItem} key={index}>
                                    <View style={styles.viewItem}>
                                        <Text style={styles.txtType}>{item.type}</Text>
                                        <TouchableOpacity style={styles.viewData} disabled={item.isChange} activeOpacity={0.7}
                                            onPress={item.onPress}>
                                            {!item.isChange ?
                                                <>
                                                    <Text style={styles.txtData} numberOfLines={1}>{item.data}</Text>
                                                    <Image
                                                        source={icons.other.arrowDown}
                                                        style={styles.icon}
                                                    />
                                                </>
                                                : <TextInput
                                                    placeholder={item.data}
                                                    style={styles.txtInput}
                                                    value={item.data}
                                                    onChangeText={() => { }}
                                                />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.viewEdit}>
                <Text style={styles.txtEdit}>Chỉnh sửa</Text>
            </TouchableOpacity>
        </>
    );
});

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAE2D5'
    },
    viewInfo: {
        paddingHorizontal: '15@ms',
        paddingTop: Platform.OS == 'android' ? '15@ms' : moderateScale(getStatusBarHeight() + 15),
        alignItems: 'center'
    },
    containerTop: {
        backgroundColor: '#314C1C',
        height: 120,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    containerAvatar: {
        position: 'absolute',
        top: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icoAvatar: {
        width: '100@ms',
        height: '100@ms',
        borderRadius: '55@ms',
        borderWidth: 2,
        borderColor: 'white'
    },
    icoBack: {
        width: '40@ms',
        height: '40@ms',
        marginTop: 10,
        marginLeft: 10
    },
    txtChange: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: 'white',
        backgroundColor: '#314C1C',
        paddingHorizontal: '15@ms',
        paddingVertical: '5@ms',
        borderRadius: '20@ms',
        justifyContent: 'center',
        marginTop: '15@ms'
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#314C1C',
        paddingBottom: '8@ms',
        borderBottomWidth: 1
    },
    containerCnt: {
        marginTop: '170@ms',
        marginHorizontal: '15@ms'
    },
    txtName: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#314C1C'
    },
    containerItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#314C1C',
        marginTop: 15
    },
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width_screen - 40,
        alignItems: 'center'
    },
    viewData: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
        justifyContent: 'flex-end',
        paddingVertical: 0
    },
    txtType: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#314C1C',
        flex: 2
    },
    txtData: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#314C1C'
    },
    txtInput: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#090A0A',
        flex: 1,
        textAlign: 'right',
        paddingVertical: 0
    },
    icon: {
        width: '8@ms',
        height: '4@ms',
        marginLeft: '10@ms'
    },
    txtEdit: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: 'white',
        backgroundColor: '#314C1C',
        paddingHorizontal: '25@ms',
        paddingVertical: '10@ms',
        borderRadius: '30@ms',
        justifyContent: 'center',
        marginVertical: '15@ms',
        width: width_screen * 0.4,
        textAlign: 'center'
    },
    viewEdit: {
        backgroundColor: '#DAE2D5',
        alignItems: 'center'
    }
});

export default UpdateInfo;