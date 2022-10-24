import React, { memo, useEffect, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import icons from '@/assets/icons';
import { goBack, navigate } from '@/utils/navigation';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';

interface DynamicHeaderProps extends ViewProps {
    keyword: any;
    onChangeText: (item: any) => void;
    back?: boolean;
    customStyle?: object;
}

export const TextInputHeader = memo(function DynamicHeader({
    back, customStyle, keyword, onChangeText
}: DynamicHeaderProps) {
    const { t } = useTranslation();
    const [onFocus, setFocus] = useState(false);
    const profile: any = useSelector((state: RootState) => state.profileSlice.data);
    return (
        <SafeAreaView style={[styles.container, customStyle]}>
            <View style={styles.center}>
                {back &&
                    <TouchableOpacity style={styles.btnBack} onPress={goBack}>
                        <Image
                            source={icons.header.back}
                            style={styles.icBack}
                        />
                    </TouchableOpacity>
                }
                <View style={[styles.viewInput, { borderColor: onFocus ? '#6B4EFF' : '#E3E5E6' }]}>
                    <Image
                        source={icons.header.search}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder={t('message.search')}
                        style={styles.txtInput}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        value={keyword}
                        onChangeText={(text) => onChangeText(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => navigate('Account')}>
                {profile.avatar ?
                    <FastImage
                        source={{
                            uri: `http://174.138.23.203:8080/storage/${profile.avatar}`, 
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

            </View>
        </SafeAreaView>
    );
});

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'white'
    },
    center: {
        borderBottomColor: '#CCCCCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '55@ms'
    },
    btnBack: {
        paddingLeft: '15@ms',
        zIndex: 2
    },
    icBack: {
        width: '24@ms',
        height: '24@ms',
        alignSelf: 'center'
    },
    viewInput: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: '8@ms',
        alignItems: 'center',
        marginHorizontal: '15@ms',
        height: '35@ms',
        flex: 1
    },
    icon: {
        width: '16@ms',
        height: '16@ms',
        paddingVertical: 0,
        marginLeft: '10@ms',
        marginRight: '5@ms'
    },
    txtInput: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#090A0A',
        paddingVertical: 0,
        flex: 1
    },
    icoAvatar: {
        width: '36@ms',
        height: '36@ms',
        borderRadius: '18@ms',
        marginRight: '10@ms'
    }
});