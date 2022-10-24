import React, { memo } from 'react';
import { TouchableOpacity, Text, FlatList, View, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import { useTranslation } from 'react-i18next';
import * as Progress from 'react-native-progress';
import { navigate } from '@/utils/navigation';

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
                style={{ marginLeft: 15 }}
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
            onPress={() => navigate('OtherAccount')} >
            <Image
                source={{ uri: 'https://meta.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-44.jpg' }}
                style={styles.imgAvatar}
            />
            <Text style={styles.txtName}>Seolhyun</Text>
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
        marginBottom: '10@ms'
    },
    txtHeader: {
        fontFamily: font.SFProTextBold,
        fontWeight: '700',
        fontSize: font_size.VERY_LARGE + 2,
        color: '#314C1C',
        flex: 1
    },
    btnItem: {
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
    imgAvatar: {
        width: '60@ms',
        height: '60@ms',
        borderRadius: '30@ms',
        marginRight: '15@ms'
    },
    txtName: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#3F6766',
        alignSelf: 'center'
    }
})