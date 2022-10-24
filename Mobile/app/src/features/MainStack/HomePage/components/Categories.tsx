import React, { memo } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, Text, TouchableOpacity, Image, ViewProps } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import icons from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import { navigate } from '@/utils/navigation';
import { width_screen } from '@/utils';

interface CategorieProps extends ViewProps {
    clinicId: any;
}

export const Categories = memo(function Categories({
    clinicId
}: CategorieProps) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.viewRow}>
                <TouchableOpacity style={styles.btnCategory} onPress={() => navigate('CreateQuestion')}>
                    {/* <Image
                        source={icons.homepage.add}
                        style={styles.icoCategory}
                    /> */}
                    <Text style={styles.txtLabel}>Tạo câu hỏi mới</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCategory1} onPress={() => navigate('ShuffleQuestion')}>
                    <View style={styles.viewCircle}>
                        {/* <Image
                            source={icons.homepage.shuffle}
                            style={styles.icoCategory}
                        /> */}
                    </View>
                    <Text style={styles.txtLabel1}>Câu hỏi ngẫu nhiên</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewRow}>
                <TouchableOpacity style={styles.btnCategory2} onPress={() => navigate('CreateQuestion')}>
                    <View style={styles.viewCircle}>
                        {/* <Image
                            source={icons.homepage.add}
                            style={styles.icoCategory}
                        /> */}
                    </View>
                    <Text style={[styles.txtLabel1, { marginLeft: 0, marginTop: 10 }]}>Tạo câu hỏi mới</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCategory3} onPress={() => navigate('SolvedQuestion')}>
                    {/* <Image
                        source={icons.homepage.shuffle}
                        style={styles.icoCategory}
                    /> */}
                    <Text style={[styles.txtLabel, { marginTop: 10, marginLeft: 0 }]}>Bộ đề ngẫu nhiên</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = ScaledSheet.create({
    container: {
        paddingVertical: '15@ms',
        paddingHorizontal: '15@ms',
        marginBottom: '130@ms'
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icoCategory: {
        width: '20@ms',
        height: '20@ms'
    },
    btnCategory: {
        width: width_screen / 2 - 14,
        alignItems: 'center',
        backgroundColor: '#314C1C',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        height: '50@ms'
    },
    txtLabel: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: 'white',
        marginLeft: '10@ms'
    },
    btnCategory1: {
        width: width_screen / 2 - 15,
        alignItems: 'center',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 10,
        borderColor: '#314C1C',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '49@ms'
    },
    btnCategory2: {
        width: width_screen / 2 - 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderBottomLeftRadius: 10,
        borderColor: '#314C1C',
        justifyContent: 'center',
        height: '80@ms'
    },
    btnCategory3: {
        width: width_screen / 2 - 14,
        alignItems: 'center',
        borderBottomRightRadius: 10,
        backgroundColor: '#314C1C',
        justifyContent: 'center',
        height: '81@ms'
    },
    txtLabel1: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        marginLeft: '10@ms'
    },
    viewCircle: {
        backgroundColor: '#314C1C',
        height: '30@ms',
        width: '30@ms',
        borderRadius: '15@ms',
        justifyContent: 'center',
        alignItems: 'center'
    }
});