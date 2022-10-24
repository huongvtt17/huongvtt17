import React, { memo, useEffect, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import icons from '@/assets/icons';
import { goBack, navigate } from '@/utils/navigation';
import { useTranslation } from 'react-i18next';
import { width_screen } from '@/utils';

interface DynamicHeaderProps extends ViewProps {
    keyword: any;
    back?: boolean;
    customStyle?: object;
    setKeyword: any
}

export const SearchHeader = memo(function DynamicHeader({
    back, customStyle, keyword, setKeyword
}: DynamicHeaderProps) {
    const { t } = useTranslation();
    const [onFocus, setFocus] = useState(false);

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
                        autoFocus
                        placeholder={t('clinic.content')}
                        style={styles.txtInput}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        value={keyword}
                        onChangeText={setKeyword}
                    />
                </View>
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
        height: '45@ms',
        flex: 1
    },
    icon: {
        width: '24@ms',
        height: '24@ms',
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
    }
});