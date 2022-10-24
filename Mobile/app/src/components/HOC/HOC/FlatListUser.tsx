import React, { memo } from 'react';
import { TouchableOpacity, Text, FlatList, View} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import { useTranslation } from 'react-i18next';
import * as Progress from 'react-native-progress';

interface Props {
    data: Array<any>,
    header: string,
    seeMore?: boolean,
    onPress: () => void
};

export const FlatListUser = memo(function FlatListHorizontal({
    data, header, onPress, seeMore
}: Props) {
    let dataPk = [1, 2, 3]

    return (
        <View style={styles.container}>
            <RenderHeader header={header} onPress={onPress} seeMore={seeMore ? seeMore : false} />
            <FlatList
                data={dataPk}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<RenderItem item={item} key={index} />)}
                ListFooterComponent={<View style={styles.footer} />}
            />
        </View>
    );
});

const RenderHeader = memo(({ header, seeMore, onPress }: { header: string, seeMore: boolean, onPress?: () => void }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{header}</Text>
            {seeMore ?
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.txtList}>{t('seeAll')}</Text>
                </TouchableOpacity> : <></>
            }
        </View>
    )
});

const RenderItem = memo(({ item }: { item: any }) => {
    return (
        <TouchableOpacity style={styles.btnItem} activeOpacity={0.7}
            onPress={() => {
            }} >
            <Progress.Circle size={50} color={'#314C1C'} progress={0.5} showsText={true} textStyle={{fontSize: 16}} thickness={5}/>
            <Text style={styles.txtTitle} numberOfLines={2}>{'Bộ câu hỏi 1 Bộ câu hỏi 1 Bộ câu hỏi 1'}</Text>
            <Text style={styles.txtContent} numberOfLines={2}>{'By Authur'}</Text>
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
        marginLeft: '15@ms',
        backgroundColor: 'white',
        width: '105@ms',
        height: '150@ms',
        paddingHorizontal: '10@ms',
        borderRadius: 10,
        paddingTop: '15@ms',
        alignItems: 'center',
        shadowRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        elevation: 4
    },
    footer: {
        width: '15@ms'
    },
    txtList: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#3F6766'
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        width: '85@ms',
        marginTop: '10@ms',
        textAlign: 'center'
    },
    txtContent: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_SMALL,
        color: 'rgba(49, 76, 28, 0.8)',
        width: '85@ms',
        marginTop: '5@ms',
        lineHeight: '16@ms',
        textAlign: 'center'
    }
})