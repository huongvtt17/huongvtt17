import React, { memo, useEffect, useState } from 'react';
import { TouchableOpacity, Text, FlatList, View, RefreshControl, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import FastImage from 'react-native-fast-image';
import { width_screen } from '@/utils';
import EmptyState from './EmptyState';
import { useSelector } from 'react-redux';
import { getVaccines } from '@/services';
import { RootState } from '@/redux';
interface Props {
    size: 'normal' | 'large'
    categoryId: any,
    type: 'product' | 'vaccine',
    nameVaccine: any
    onPressItem?: (item: any) => void
};

export const FlatListVaccine = memo(function FlatListVertical({
    categoryId, size, type, nameVaccine, onPressItem
}: Props) {
    const [vaccines, setVaccines] = useState([]);
    let data = {
        name: '',
        category_id: categoryId,
        orderBy: 'order,asc',
        limit: 50,
        page: 1
    }
    const token = useSelector((state: RootState) => state.accessTokenSlice.token);

    useEffect(() => {
        getVaccines(data, token, (res: any) => {
            console.log("vaccines", res)
            if (res.code == 1) {
                setVaccines(res.data.vaccines.data);
            }
            //  setLoadingFirst(false);
        });
    }, []);
    return (
        vaccines && vaccines.length > 0 ?
            <View style={styles.container}>
                <Text style={styles.txtName}>{nameVaccine}</Text>
                <FlatList
                    data={vaccines}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<RenderItem item={item} key={index} size={size} onPress={onPressItem} type={type} />)}
                    ListFooterComponent={<View style={styles.footer} />}
                    ListEmptyComponent={<EmptyState content={'Chưa có dữ liệu'} />}
                />
            </View>
            : <></>
    );
});

const RenderItem = memo(({ item, size, type, onPress }: { item: any, size: 'normal' | 'large', type: 'product' | 'vaccine', onPress: any }) => {
    const isNormal = size == 'normal';

    return (
        <TouchableOpacity style={styles.btnItem} onPress={() => onPress(item)} activeOpacity={0.7}>
            <FastImage
                source={{
                    uri: `http://174.138.23.203:8080/storage/${item.image}`,
                    priority: FastImage.priority.normal,
                }}
                style={isNormal ? styles.icoItem : styles.icoItemLarge}
            />

            <View style={styles.viewContent}>
                <Text style={[styles.txtTitle, { fontSize: isNormal ? font_size.NORMAL : font_size.VERY_LARGE }]}>{item.name}</Text>
                <Text style={styles.txtContent} numberOfLines={2}>{item.code}</Text>
            </View>
        </TouchableOpacity>
    )
});

const styles = ScaledSheet.create({
    container: {
        padding: '15@ms',
        backgroundColor: 'white',
        paddingBottom: 0
    },
    btnItem: {
        marginBottom: '15@ms',
        borderWidth: 1,
        borderColor: '#E3E5E5',
        borderRadius: '4@ms',
        width: width_screen / 2 - 30,
        marginRight: 10
    },
    icoItem: {
        width: '100@ms',
        height: '100@ms',
        borderRadius: '5@ms',
        backgroundColor: '#CCCCCC'
    },
    icoItemLarge: {
        width: '100%',
        height: '160@ms',
        borderTopLeftRadius: '4@ms',
        borderTopRightRadius: '4@ms',
        backgroundColor: '#CCCCCC'
    },
    touchCart: {
        position: 'absolute',
        right: '5@ms',
        top: '5@ms'
    },
    icCart: {
        width: '38@ms',
        height: '38@ms'
    },
    viewContent: {
        margin: '8@ms'
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL,
        color: '#090A0A'
    },
    txtContent: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL,
        color: '#8BC724',
        marginTop: '3@ms'
    },
    footer: {
        height: 150
    },
    txtName: {
        fontFamily: font.SFProTextBold,
        fontSize: font_size.VERY_LARGE + 4,
        color: '#409518',
        marginBottom: 10
    }
})