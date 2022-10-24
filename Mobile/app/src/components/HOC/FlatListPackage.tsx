import React, { memo } from 'react';
import { TouchableOpacity, Text, FlatList, View, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import * as Progress from 'react-native-progress';
import { navigate } from '@/utils/navigation';

interface Props {
    data: Array<any>
};

export const FlatListPackage = memo(function FlatListHorizontal({
    data
}: Props) {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<RenderItem item={item} key={index} />)}
                ListFooterComponent={<View style={styles.footer} />}
            />
        </View>
    );
});

const RenderItem = memo(({ item }: { item: any }) => {
    return (
        <TouchableOpacity style={styles.btnItem} activeOpacity={0.7}
            onPress={() => navigate('PackageDetail')} >
            <View style={styles.viewPk}>
                <Text style={styles.txtTitle} numberOfLines={2}>{'Bộ câu hỏi 1 Bộ câu hỏi 1 Bộ câu hỏi 1'}</Text>
                <Text style={styles.txtContent} numberOfLines={2}>{'Chưa hoàn thành'}</Text>
            </View>
            <View style={styles.viewPk1}>
                <View style={styles.viewAvatar}>
                    <Image
                        source={{ uri: 'https://kenh14cdn.com/2020/8/10/photo-1-1597051380162862366200.jpg' }}
                        style={styles.imgAvatar}
                    />
                    <Text style={[styles.txtAvatar, { marginBottom: 0 }]}>By: Seolhyunari</Text>
                </View>
                <View style={styles.viewRow} />
                <View style={styles.viewAvatar}>
                    <View style={styles.viewQuestion}>
                        <Text style={styles.txtSolved}>9<Text style={styles.txtTotal}>/10</Text></Text>
                        <Text style={styles.txtAvatar}>Câu hỏi</Text>
                    </View>
                    <View style={styles.viewCol} />
                    <View style={styles.viewQuestion}>
                        <Text style={styles.txtSolved}>20</Text>
                        <Text style={styles.txtAvatar}>phút</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
});

const styles = ScaledSheet.create({
    container: {
        marginBottom: '20@ms'
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '15@ms',
        marginBottom: '15@ms'
    },
    txtHeader: {
        fontFamily: font.SFProTextBold,
        fontWeight: '700',
        fontSize: font_size.VERY_LARGE + 2,
        color: '#314C1C',
        flex: 1
    },
    btnItem: {
        marginHorizontal: '15@ms',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15@ms',
    },
    footer: {
        width: '15@ms'
    },
    viewPk: {
        backgroundColor: '#314C1C',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        height: '100%',
        paddingHorizontal: '15@ms',
        paddingVertical: '25@ms',
        flex: 0.8
    },
    viewPk1: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        height: '100%',
        borderColor: '#314C1C',
        backgroundColor: 'white',
        flex: 1.2
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE,
        color: 'white',
        textAlign: 'center'
    },
    txtContent: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#5A833A',
        marginTop: '5@ms',
        textAlign: 'center'
    },
    viewAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5@ms',
        flex: 1
    },
    imgAvatar: {
        width: '32@ms',
        height: '32@ms',
        borderRadius: '16@ms',
        marginRight: '5@ms',
        marginVertical: '10@ms'
    },
    txtAvatar: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        marginBottom: '5@ms'
    },
    viewRow: {
        width: '100%',
        height: 1,
        backgroundColor: '#314C1C'
    },
    viewCol: {
        width: 1,
        height: '100%',
        backgroundColor: '#314C1C'
    },
    viewQuestion: {
        flex: 1,
        alignItems: 'center'
    },
    txtSolved: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL * 2,
        color: '#314C1C',
        lineHeight: '30@ms',
        marginTop: '5@ms'
    },
    txtTotal: {
        fontFamily: font.SFProTextRegular,
        color: 'rgba(43, 125, 66, 0.7)',
        fontSize: font_size.VERY_SMALL * 1.5
    }
})