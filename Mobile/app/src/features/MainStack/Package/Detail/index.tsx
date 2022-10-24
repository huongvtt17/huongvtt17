import React, { memo, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, FlatListProduct } from '@/components/HOC';
import { useTranslation } from 'react-i18next';
import { DynamicHeader } from '@/components/Header';
import { navigate } from '@/utils/navigation';
import { useRoute } from '@react-navigation/native';
import { getProducts } from '@/services';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { ScaledSheet } from 'react-native-size-matters';
import { font, font_size } from '@/configs/fonts';
import icons from '@/assets/icons';
import { width_screen } from '@/utils';

const Products = memo(() => {
    const { t } = useTranslation();
    const route = useRoute<any>();
    let clinicId = route?.params?.clinicId;
    const token = useSelector((state: RootState) => state.accessTokenSlice.token);
    const [products, setProducts] = useState([]);
    let text = 'Customer reviews indicate that  reviews indicate that ....'

    useEffect(() => {
        let data = {
            clinic_id: clinicId
        }
        getProducts(data, token, (res: any) => {
            setProducts(res.data.products.data)
        })
    }, [])

    return (
        <>
            <DynamicHeader title={'Chi tiết bộ đề'} back onSearch={() => navigate('SearchClinic', { type: 'product' })} />
            <ScrollView style={styles.container}>
                <View style={styles.viewTop}>
                    <Text style={styles.txtTitle}>Bộ đề câu hỏi đầu tiên của ME</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.viewUsername} onPress={() => navigate('OtherAccount')}>
                        <View style={styles.viewRow}>
                            <Image source={{ uri: 'https://znews-photo.zadn.vn/Uploaded/qfssu/2021_10_25/49702.jpeg' }}
                                style={styles.imgAvatar}
                            />
                            <Text style={styles.txtName}>By: Authur</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.txtFollow}>Theo dõi</Text>
                        </TouchableOpacity>
                        <View style={styles.viewStar}>
                            <Image source={icons.package.star}
                                style={styles.icoStar}
                            />
                            <Image source={icons.package.star}
                                style={styles.icoStar}
                            />
                            <Image source={icons.package.star}
                                style={styles.icoStar}
                            />
                            <Image source={icons.package.star}
                                style={styles.icoStar}
                            />
                            <Image source={icons.package.star}
                                style={styles.icoStar}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewOption}>
                    <Image source={icons.package.like}
                        style={styles.icoLike}
                    />
                    <Image source={icons.package.dislike}
                        style={styles.icoLike}
                    />
                    <Image source={icons.package.comment}
                        style={styles.icoLike}
                    />
                    <Image source={icons.package.share}
                        style={styles.icoLike}
                    />
                </View>

                <View style={styles.viewRecent}>
                    <Text style={styles.txtRecent}>Gần nhất: 9/10, 2 phút còn lại</Text>
                    <TouchableOpacity>
                        <Text style={styles.txtAgain}>Làm tiếp</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewAmount}>
                    <View style={styles.viewNumber}>
                        <Text style={styles.txtNumber}>20</Text>
                        <Text style={styles.txtAmount}>Câu hỏi</Text>
                    </View>
                    <View style={styles.viewCol} />
                    <View style={styles.viewNumber}>
                        <Text style={styles.txtNumber}>10</Text>
                        <Text style={styles.txtAmount}>phút</Text>
                    </View>
                </View>

                <View style={styles.viewDesc}>
                    <View style={styles.viewRow}>
                        <Text style={styles.txtLevel}>Mức độ: </Text>
                        <Text style={styles.txtDesc}>Khó</Text>
                    </View>
                    <Text style={styles.txtLevel}>Mô tả</Text>
                    <Text style={styles.txtDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis, orci eget iaculis ullamcorper, augue augue blandit ipsum, ut aliquet ligula nisl vel ligula. Morbi commodo aliquam magna, at porta leo fermentum sed. Sed quis libero sed mi varius accumsan. Suspendisse vel justo nec augue tincidunt condimentum.</Text>

                    <View style={[styles.viewRow1, { marginTop: 10 }]}>
                        <Text style={styles.txtLevel}>Lịch sử làm bài</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('PackageHistory')}>
                            <Text style={styles.txtInfo}>Xem chi tiết</Text>
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

                    <View style={styles.viewQuestion}>
                        <Text style={styles.txtQuestion} numberOfLines={1}>Câu hỏi 1: </Text>
                        <Text style={styles.txtQuestion1} numberOfLines={1}>{text.length > 100 ? text.substr(0, 100) : text}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.viewBottom}>
                <Button>Luyện tập</Button>
                <Button>Thi thử</Button>
            </View>
        </>
    );
});

export default Products;

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '15@ms',
        backgroundColor: 'white',
        flex: 1
    },
    viewTop: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#314C1C',
        marginTop: '10@ms',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    txtTitle: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE,
        color: 'white',
        flex: 1,
        marginHorizontal: '10@ms'
    },
    viewUsername: {
        flex: 1.25,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: '5@ms',
        paddingHorizontal: '10@ms',
        margin: 6
    },
    imgAvatar: {
        width: '40@ms',
        height: '40@ms',
        borderRadius: '20@ms'
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5@ms'
    },
    txtName: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        marginLeft: '10@ms'
    },
    txtFollow: {
        paddingHorizontal: '10@ms',
        paddingVertical: '3@ms',
        color: '#314C1C',
        borderWidth: 1,
        borderColor: '#314C1C',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: '5@ms'
    },
    icoStar: {
        width: '20@ms',
        height: '20@ms',
        marginHorizontal: '5@ms'
    },
    viewStar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#314C1C',
        paddingHorizontal: '25@ms',
        paddingVertical: 12,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    icoLike: {
        width: '24@ms',
        height: '24@ms'
    },
    viewRecent: {
        backgroundColor: 'rgba(218, 226, 213, 0.8)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        marginHorizontal: '25@ms',
        marginVertical: '10@ms',
        paddingVertical: '6@ms',
        paddingHorizontal: '13@ms',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    txtRecent: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    },
    txtAgain: {
        paddingHorizontal: '10@ms',
        paddingVertical: '3@ms',
        color: 'white',
        backgroundColor: '#314C1C',
        borderRadius: 20,
        alignSelf: 'center'
    },
    viewAmount: {
        borderWidth: 1,
        borderColor: '#314C1C',
        borderBottomWidth: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewNumber: {
        flex: 1,
        alignItems: 'center'
    },
    txtNumber: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE * 2,
        lineHeight: '36@ms',
        color: '#2B7D42',
        marginTop: '5@ms'
    },
    txtAmount: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        marginBottom: '5@ms'
    },
    viewCol: {
        width: 1,
        height: '100%',
        backgroundColor: '#314C1C'
    },
    viewDesc: {
        borderWidth: 1,
        borderColor: '#314C1C',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: '10@ms',
        marginBottom: '10@ms'
    },
    txtLevel: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    },
    txtDesc: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    },
    txtInfo: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#3F6766',
        textDecorationLine: 'underline'
    },
    txtPoint: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE + 4,
        color: '#2B7D42'
    },
    viewQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(196, 196, 196, 0.8)',
        padding: 8,
        marginVertical: '10@ms',
        borderRadius: '10@ms'
    },
    txtQuestion: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    },
    txtQuestion1: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        maxWidth: width_screen * 0.5
    },
    viewBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15@ms',
        backgroundColor: 'white'
    }
})