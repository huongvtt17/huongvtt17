import React, { memo, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { DynamicHeader } from '@/components/Header';
import { font, font_size } from '@/configs/fonts';
import icons from '@/assets/icons';
import { ScaledSheet } from 'react-native-size-matters';
import { Button, EmptyState, Spinner } from '@/components/HOC';
import { navigate } from '@/utils/navigation';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { getProfile } from '@/services';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { useIsFocused } from "@react-navigation/native";
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { width_screen } from '@/utils';

const PackageHistory = memo(() => {
    const { t } = useTranslation();
    const [childData, setChildData] = useState([1, 2, 3, 4, 5, 6]);
    const [loadingFirst, setLoadingFirst] = useState(false);
    const [index, setIndex] = useState(0);

    let list = [
        { id: 0, type: 'Gần nhất' },
        { id: 1, type: 'Cao nhất' },
        { id: 2, type: 'Thấp nhất' }
    ]

    return (
        <>
            <DynamicHeader title={'Lịch sử làm bài'} back />
            {loadingFirst ?
                <Spinner /> :
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Text style={styles.txtTitle}>Bộ đề đầu tiên của Yoonabar</Text>
                    <View style={styles.viewOverview}>
                        <View style={styles.viewRow1}>
                            <Text style={styles.txtLevel}>Lịch sử làm bài</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('PackageHistory')}>
                                <Text style={styles.txtPoint}>4</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewRow1}>
                            <Text style={styles.txtLevel}>Điểm số trung bình</Text>
                            <Text style={styles.txtPoint}>8.2</Text>
                        </View>
                        <View style={styles.viewRow1}>
                            <Text style={styles.txtLevel}>Điểm số cao nhất</Text>
                            <Text style={styles.txtPoint}>7.9</Text>
                        </View>
                    </View>

                    <View style={styles.viewSeperator}/>
                    <View style={[styles.viewRow1, { marginHorizontal: 15 }]}>
                        {list.map((item: any, i: any) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    activeOpacity={0.7}
                                    onPress={() => setIndex(i)}>
                                    <Text style={index == i ? styles.txtActive : styles.txtInactive}>{item.type}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <FlatList
                        data={childData}
                        style={{ marginHorizontal: 15, marginVertical: 10 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (<Item item={item} key={index} />)}
                        ListEmptyComponent={<EmptyState content={'Chưa có dữ liệu'} />}
                    />
                </View>
            }
        </>
    );
});

const Item = memo(({ item }: { item: any }) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={styles.containerItem} activeOpacity={0.7}
            onPress={() => navigate('MemberInfo', { item: item })}>
            <View style={styles.viewItem}>
                <View style={styles.viewRow}>
                    <Text style={styles.txtLevel} numberOfLines={1}>Thời gian: </Text>
                    <Text style={[styles.txtLevel, { fontFamily: font.SFProTextRegular }]}>17:15 17/11/2021</Text>
                </View>
                <Image source={icons.other.arrowRight}
                    style={styles.icoArrowRight}
                />
            </View>
            <View style={styles.viewRow1}>
                <View style={styles.viewCol}>
                    <Text style={[styles.txtPoint, { fontSize: font_size.VERY_SMALL * 2 }]}>10</Text>
                    <Text style={[styles.txtLevel, { fontFamily: font.SFProTextRegular }]}>Điểm số</Text>
                </View>
                <View style={styles.viewCol}>
                    <Text style={[styles.txtPoint, { fontSize: font_size.VERY_SMALL * 2 }]}>12:14</Text>
                    <Text style={[styles.txtLevel, { fontFamily: font.SFProTextRegular }]}>phút</Text>
                </View>
            </View>
        </TouchableOpacity >
    )
});

const styles = ScaledSheet.create({
    containerItem: {
        marginBottom: '15@ms',
        backgroundColor: 'rgba(218, 226, 213, 0.7)',
        borderWidth: 0.25,
        borderColor: '#314C1C',
        paddingVertical: '8@ms',
        shadowRadius: 8,
        paddingHorizontal: '15@ms',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        elevation: 4,
        borderRadius: 20
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10@ms'
    },
    icoArrowRight: {
        width: '16@ms',
        height: '16@ms'
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: "#314C1C",
        paddingHorizontal: '15@ms',
        paddingVertical: '10@ms',
        textAlign: 'center',
        alignSelf: 'center',
        borderBottomColor: '#314C1C',
        borderBottomWidth: 1,
        width: width_screen
    },
    viewOverview: {
        borderWidth: 1,
        borderColor: '#314C1C',
        marginVertical: '10@ms',
        marginHorizontal: '15@ms',
        padding: '10@ms',
        borderRadius: '20@ms'
    },
    viewRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtLevel: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    },
    txtPoint: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE + 4,
        lineHeight: '28@ms',
        color: '#2B7D42'
    },
    txtActive: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE,
        color: '#314C1C'
    },
    txtInactive: {
        fontFamily: font.SFProTextRegular,
        opacity: 0.8,
        fontSize: font_size.LARGE,
        color: '#314C1C'
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewCol: {
        flex: 1,
        alignItems: 'center'
    },
    viewSeperator: {
        width: width_screen,
        height: 7,
        backgroundColor: '#DAE2D5',
        marginBottom: 10
    }
});

export default PackageHistory;