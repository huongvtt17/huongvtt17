import React, { memo } from 'react';
import { TouchableOpacity, Text, FlatList, View, RefreshControl, Image, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import FastImage from 'react-native-fast-image';
import { Spinner } from '@/components/HOC';
import icons from '@/assets/icons';
import { convertMoney } from '@/utils';
import EmptyState from './EmptyState';
import { useDispatch } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import Storage, { ClinicsInCart } from '@/utils/Storage';
import { setClinics } from '@/redux/ClinicsSlice';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';

interface Props {
    size: 'normal' | 'large',
    data: Array<any>,
    isEnd: boolean;
    onPress: () => void,
    type: 'product' | 'vaccine',
    onPressItem?: (item: any) => void,
    refresh: any,
    onRefresh: () => void,
    isLoading: boolean
};

export const FlatListProduct = memo(function FlatListVertical({
    data, size, isEnd, type, onPressItem, onPress, refresh, onRefresh, isLoading
}: Props) {
    return (
        <View style={styles.container}>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={data}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} tintColor={'gray'} />}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<RenderItem item={item} key={index} size={size} onPress={onPressItem} type={type} />)}
                ListFooterComponent={
                    <>
                        {!isEnd ?
                            isLoading ?
                                <ActivityIndicator size={'small'} color={'gray'} />
                                :
                                <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                                    <Text style={styles.txtSeeMore}>Xem thêm</Text>
                                </TouchableOpacity>
                            : <></>
                        }
                        <Text style={styles.txtNoProduct}>{'Hãy nhắn cho SKGo về sản phẩm bạn cần tìm, đội ngũ của chúng tôi sẽ giúp bạn!'} </Text>
                    </>}
            // ListEmptyComponent={
            //     <Text style={styles.txtNoProduct}>{'Hãy nhắn cho SKGo về sản phẩm bạn cần tìm, đội ngũ của chúng tôi sẽ giúp bạn!'} </Text>
            // }
            />
        </View>
    );
});

const RenderItem = memo(({ item, size, type, onPress }: { item: any, size: 'normal' | 'large', type: 'product' | 'vaccine', onPress: any }) => {
    const isNormal = size == 'normal';
    const dispatch = useDispatch()

    const onCart = async () => {
        // await Storage.removeData(ClinicsInCart);
        let clinics = await Storage.getObject(ClinicsInCart);
        let haveClinic = false;
        clinics.forEach((element: any) => {
            if (element.clinic_id == item.clinic_id) {
                haveClinic = true;
                let haveItem = false;
                element.items.forEach((e: any) => {
                    if (e.product_id == item.id) {
                        haveItem = true;
                    }
                });
                if (!haveItem) {
                    SimpleToast.showWithGravity("Đã thêm vào giỏ hàng", SimpleToast.SHORT, SimpleToast.CENTER)
                    element.items.push({
                        product_id: item.id,
                        clinic_id: item.clinic_id,
                        quantity: 1,
                        total: item.price,
                        name: item.name,
                        image: item.image,
                    });
                } else {
                    SimpleToast.showWithGravity("Sản phẩm đã được chọn", SimpleToast.SHORT, SimpleToast.CENTER)
                }
            }
        });

        if (!haveClinic) {
            let data = {
                clinic_id: item.clinic_id,
                items: [{
                    product_id: item.id,
                    quantity: 1,
                    clinic_id: item.clinic_id,
                    total: item.price,
                    name: item.name,
                    image: item.image,
                }]
            };
            clinics.push(data);
        }
        dispatch(setClinics(clinics));
        Storage.setData(ClinicsInCart, clinics);
    }

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
                {type == 'product' ?
                    <Text style={[styles.txtContent, { fontSize: isNormal ? font_size.VERY_SMALL : font_size.SMALL }]}>{item.price ? convertMoney(item.price) : item?.code}</Text>
                    : <Text style={[styles.txtContent, { fontSize: isNormal ? font_size.VERY_SMALL : font_size.SMALL }]}>{item.code}</Text>
                }
            </View>
            {type == 'product' &&
                <TouchableOpacity style={styles.touchCart} activeOpacity={0.7} onPress={onCart}>
                    <Image
                        source={icons.clinicInfo.cart}
                        style={styles.icCart}
                    />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    )
});

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: '15@ms',
        backgroundColor: 'white',
        paddingBottom: 0
    },
    btnItem: {
        marginBottom: '15@ms',
        borderWidth: 1,
        borderColor: '#E3E5E5',
        borderRadius: '4@ms',
        width: '48%'
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
        color: '#65C078',
        marginTop: '5@ms'
    },
    txtNoProduct: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE,
        paddingHorizontal: 5,
        paddingBottom: getBottomSpace() + (isIphoneX() ? 0 : 20),
        color: '#409518',
        backgroundColor: 'white'
    },
    txtSeeMore: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        marginHorizontal: 10
    }
})

