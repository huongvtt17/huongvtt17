import React, { memo, useEffect, useState } from 'react';
import { TouchableOpacity, Text, FlatList, View, TextInput, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { convertMoney } from '@/utils';
import { setClinics } from '@/redux/ClinicsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import Storage from '@/utils/Storage';
import { ClinicsInCart } from '@/utils/Storage';
import icons from '@/assets/icons';
import { navigate } from '@/utils/navigation';
import { getClinicDetail } from '@/services';

interface Props {
    data: Array<any>,
    header: string,
    canModify: boolean
};

export const FlatListCart = memo(function FlatListCart({
    data, header, canModify
}: Props) {
    console.log("in cart", data)
    return (
        <View style={styles.container}>
            <RenderHeader header={header} />
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<RenderItem item={item} key={index} canAdd={canModify} />)}
            />
        </View>
    );
});

const RenderHeader = memo(({ header }: { header: string }) => {
    return (
        <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{header}</Text>
        </View>
    )
});

const RenderItem = memo(({ item, canAdd }: { item: any, canAdd: boolean }) => {
    const [quantity, setQuantity] = useState(item.quantity ? item.quantity : 1);
    const [clinicName, setClinicName] = useState();
    const amount = `${quantity}`
    const dispatch = useDispatch();
    let clinics: any = useSelector((state: RootState) => state.clinicsSlice.data);
    const token: any = useSelector((state: RootState) => state.accessTokenSlice.token);
    const { t } = useTranslation();

    useEffect(() => {
        getClinicDetail(item.clinic_id, token, (res: any) => {
            if (res.code == 1) {
                setClinicName(res?.data?.clinic?.name)
            }
        })
    }, [])

    if (quantity < 0) return <></>;

    const onSetAmount = async (quantity: number) => {
        if (quantity < 999) {
            setQuantity(quantity);
            let changed = false;
            let tmp = JSON.parse(JSON.stringify(clinics));

            for (let i = 0; i < tmp.length; i++) {
                let products = tmp[i].items;
                for (let j = 0; j < products.length; j++) {
                    let product = products[j];
                    if (product.product_id == item.product_id) {
                        product.quantity = quantity;
                        if (quantity <= 0) product.product_id = 0;
                        changed = true;
                        break;
                    }
                };
                if (changed) break;
            }
            dispatch(setClinics(tmp));
            Storage.setData(ClinicsInCart, tmp);
        } else {
            setQuantity(999)
        }
    }

    return (
        <>
            <Text style={styles.txtClinic} numberOfLines={1}>{clinicName}</Text>
            <TouchableOpacity style={styles.btnItem} disabled={!canAdd} activeOpacity={0.7}
                onPress={() => navigate('ProductInfo', { type: 'product', productId: item.product_id })}>
                {canAdd ? <TouchableOpacity onPress={() => onSetAmount(-1)} style={styles.viewDel} activeOpacity={0.7}>
                    <Image
                        source={icons.other.close}
                        style={styles.icoDel}
                    />
                </TouchableOpacity>
                    : <></>}
                <FastImage
                    source={{
                        uri: `http://174.138.23.203:8080/storage/${item.image}`,
                        priority: FastImage.priority.normal,
                    }}
                    style={styles.icoItem}
                />
                <View style={styles.viewName}>
                    <Text style={styles.txtTitle} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.txtContent} numberOfLines={2}>{convertMoney(item.total ? item.total : item.price)}</Text>
                </View>
                {canAdd ?
                    <View style={styles.viewAmount}>
                        <Text style={styles.txtAmount}>{t('cart.amount')}</Text>
                        <View style={styles.viewAdd}>
                            <TouchableOpacity style={styles.btn} onPress={() => onSetAmount(parseInt(quantity) - 1)}>
                                <Text style={styles.btnAdd}>-</Text>
                            </TouchableOpacity>
                            <TextInput style={styles.amount}
                                value={amount}
                                textContentType={'telephoneNumber'}
                                onChangeText={(value: any) => onSetAmount(value)}
                                keyboardType={'number-pad'}
                                maxLength={3}
                            />
                            {/* <Text style={styles.amount}>{quantity}</Text> */}
                            <TouchableOpacity style={styles.btn} onPress={() => onSetAmount(parseInt(quantity) + 1)}>
                                <Text style={styles.btnAdd}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.viewAmount}>
                        <View style={styles.viewAdd1}>
                            <Text style={styles.txtAmount}>{t('cart.amount')}</Text>
                            <Text style={styles.amount}>{quantity ? quantity : item.pivot?.quantity}</Text>
                        </View>
                    </View>
                }
            </TouchableOpacity>
        </>
    )
});

const styles = ScaledSheet.create({
    container: {
        // marginBottom: '20@ms'
    },
    viewDel: {
        position: 'absolute'
    },
    icoDel: {
        width: 10,
        height: 10,
        tintColor: '#696E78',
        margin: 5
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '25@ms',
        marginBottom: '5@ms'
    },
    txtHeader: {
        fontFamily: font.SFProTextBold,
        fontWeight: '700',
        fontSize: font_size.VERY_LARGE + 4,
        color: '#090A0A',
        flex: 1
    },
    btnItem: {
        marginHorizontal: '25@ms',
        backgroundColor: '#F4FFE2',
        marginBottom: '10@ms',
        flexDirection: 'row',
        borderRadius: '12@ms'
    },
    txtList: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#8BC724'
    },
    viewAmount: {
        marginTop: '15@ms'
    },
    txtAmount: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_SMALL - 2,
        color: '#101725',
        textAlign: 'right',
        marginRight: '10@ms',
        marginBottom: '3@ms'
    },
    icoItem: {
        width: '50@ms',
        height: '50@ms',
        marginVertical: '15@ms',
        marginLeft: '20@ms',
        marginRight: '10@ms',
        backgroundColor: '#CCCCCC',
        borderRadius: '5@ms'
    },
    txtClinic: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL,
        color: '#409518',
        marginHorizontal: '15@ms',
        marginTop: '10@ms',
        marginBottom: '5@ms'
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#090A0A',
        width: '140@ms',
        marginTop: '10@ms'
    },
    txtContent: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL,
        color: '#8BC724',
        width: '140@ms',
        marginTop: '5@ms'
    },
    viewName: {
        flex: 1
    },
    viewAdd: {
        flexDirection: 'row',
        marginRight: '10@ms',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80@ms'
    },
    viewAdd1: {
        justifyContent: 'center',
        width: '60@ms'
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: '4@ms',
        borderColor: '#8BC724',
        borderWidth: 1,
        width: '22@ms',
        height: '22@ms',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    btnAdd: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        lineHeight: '14@ms',
        color: 'black'
    },
    amount: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: 'black',
        textAlign: 'center',
        flex: 2,
        paddingVertical: 0
    }
})