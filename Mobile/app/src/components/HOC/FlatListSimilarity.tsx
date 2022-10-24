import React, { memo } from 'react';
import { TouchableOpacity, Text, FlatList, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import FastImage from 'react-native-fast-image';
import EmptyState from './EmptyState';
import { convertMoney } from '@/utils';
import { useTranslation } from 'react-i18next';
interface Props {
    data: Array<any>,
    header: string,
    onPressItem: (item: any) => void,
    seeMore?: boolean,
    onSeeMore?: () => void
};

export const FlatListSimilarity = memo(function FlatListSimilarity({
    data, header, onPressItem, seeMore, onSeeMore
}: Props) {
    return (
        <View  style={{marginBottom: 15}}>
            <RenderHeader header={header} seeMore={seeMore ? seeMore : false} onPress={onSeeMore}/>
            <FlatList
                data={data} 
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                renderItem={({ item, index }) => (<RenderItem item={item} key={index} onPressItem={onPressItem} />)}
                ListEmptyComponent={<EmptyState content={'Chưa có dữ liệu'} />}
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
                    <Text style={styles.txtList}>{t('seeMore')}</Text>
                </TouchableOpacity> : <></>
            }
        </View>
    )
});

const RenderItem = memo(({ item, onPressItem }: { item: any, onPressItem: (item: any) => void }) => {
    return (
        <TouchableOpacity style={styles.btnItem} onPress={() => onPressItem(item)} activeOpacity={0.7}>
            <FastImage
                source={{
                    uri: `http://174.138.23.203:8080/storage/${item.image}`,
                    priority: FastImage.priority.normal,
                }}
                style={styles.icoItem}
            />
            <Text style={styles.txtTitle} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.txtContent} numberOfLines={2}>{item?.price > 0 ? convertMoney(item.price) : item.code}</Text>
        </TouchableOpacity>
    )
});

const styles = ScaledSheet.create({
    container: {
        marginBottom: '15@ms'
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '15@ms'
    },
    txtHeader: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE,
        color: '#090A0A',
        flex: 1
    },
    btnItem: {
        width: '120@ms'
    },
    footer: {
        width: '15@ms'
    },
    txtList: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#8BC724'
    },
    icoItem: {
        width: '120@ms',
        height: '120@ms',
        borderTopRightRadius: '5@ms',
        borderTopLeftRadius: '5@ms',
        backgroundColor: '#CCCCCC'
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL - 2,
        color: '#090A0A',
        width: '120@ms',
        marginTop: '10@ms',
        lineHeight: '12@ms',
        textAlign: 'right',
        paddingRight: '5@ms',
        flex: 1
    },
    txtContent: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL,
        color: '#65C078',
        width: '120@ms',
        marginTop: '5@ms',
        textAlign: 'right',
        paddingRight: '5@ms',
        lineHeight: '16@ms'
    }
})
