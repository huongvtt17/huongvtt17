import React, { memo, useEffect, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import icons from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { navigate } from '@/utils/navigation';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import Storage from '@/utils/Storage';
import { ClinicsInCart } from '@/utils/Storage';
import { setClinics } from '@/redux/ClinicsSlice';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { width_screen } from '@/utils';
import { RootState } from '@/redux';

interface HeaderProps extends ViewProps {
    username: string;
    avatar: string;
    description: string;
}

export const Header = memo(function Header({
    username, avatar, description
}: HeaderProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [unread, setUnread] = useState(0);
    const token: any = useSelector((state: RootState) => state.accessTokenSlice.token);
    const sharePost = () => {
        const url = "Link chia sẻ của SKVietNam là: https://skvietnam.vercel.app/";
        const title = "SKGo";
        const options = Platform.select({
            default: {
                title,
                subject: title,
                message: `${url}`,
            },
        });
        Share.open(options);
    };

    useEffect(() => {
        const getClinics = async () => {
            let clinics = await Storage.getObject(ClinicsInCart);
            if (clinics && clinics.length) {
                dispatch(setClinics(clinics));
            }
        };
        getClinics();
    }, []);

    return (
        <View style={styles.viewAvatar}>
            <View style={styles.viewRow}>
                <TouchableOpacity onPress={sharePost}>
                    <Image
                        source={icons.header.menu}
                        style={styles.icoCart}
                    />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigate("Notification")}>
                    <Image
                        source={icons.header.search}
                        style={styles.icoCart}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.viewRow1}>
                <TouchableOpacity style={styles.viewName} activeOpacity={0.7} onPress={() => navigate('Account')}>
                    {avatar ?
                        <FastImage
                            source={{
                                uri: `${avatar}`,
                                priority: FastImage.priority.normal,
                            }}
                            style={styles.icoAvatar}
                        /> :
                        <Image
                            source={icons.other.profile}
                            style={styles.icoAvatar}
                        />
                    }
                </TouchableOpacity>
                <View>
                    <Text style={styles.txtUsername}>Hi, {username}</Text>
                    <Text style={styles.txtDesc}>{description}</Text>
                </View>
            </View>
        </View>
    );
});

const styles = ScaledSheet.create({
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    viewRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '20@ms'
    },
    viewAvatar: {
        padding: '10@ms',
        backgroundColor: '#314C1C',
        paddingBottom: '50@ms'
    },
    icoCart: {
        width: '25@ms',
        height: '25@ms',
        margin: 5
    },
    icoAvatar: {
        width: '60@ms',
        height: '60@ms',
        borderRadius: '30@ms',
        borderWidth: 2,
        borderColor: 'white',
        marginLeft: '50@ms',
        marginRight: '15@ms'
    },
    viewName: {
    },
    txtUsername: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_SMALL * 2,
        color: 'white',
        lineHeight: 32
    },
    txtDesc: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: 'white'
    }
});