import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatListPackage } from '@/components/HOC';
import { useTranslation } from 'react-i18next';
import { DynamicHeader } from '@/components/Header';
import { navigate } from '@/utils/navigation';
import { useRoute } from '@react-navigation/native';
import { getProducts } from '@/services';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { ScaledSheet } from 'react-native-size-matters';
import { font, font_size } from '@/configs/fonts';

const SolvedQuestion = memo(() => {
    const { t } = useTranslation();
    const route = useRoute<any>();
    let clinicId = route?.params?.clinicId;
    const token = useSelector((state: RootState) => state.accessTokenSlice.token);
    const [products, setProducts] = useState([1, 2, 3]);

    let optionData = [
        { id: 1, name: 'Tất cả' },
        { id: 2, name: 'Đã hoàn thành' },
        { id: 3, name: 'Chưa hoàn thành' }
    ]

    return (
        <>
            <DynamicHeader title={'Bộ câu hỏi đã làm'} back />
            <View style={styles.viewTop}>
                {optionData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => { }} activeOpacity={0.7}>
                            <Text style={[styles.txtOption, {opacity: index == 0 ? 1 : 0.7}]}>{item.name}</Text>
                            <View style={[styles.viewRow, {backgroundColor: index == 0 ? '#314C1C' : 'white'}]}/>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <FlatListPackage
                data={products}
            />
        </>
    );
});

export default SolvedQuestion;

const styles = ScaledSheet.create({
    viewTop: {
        backgroundColor: 'white',
        paddingTop: '10@ms',
        paddingHorizontal: '20@ms',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        elevation: 4
    },
    txtOption: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    },
    viewRow: {
        height: 2,
        backgroundColor: '#314C1C',
        width: '60%',
        alignSelf: 'center'
    }
});