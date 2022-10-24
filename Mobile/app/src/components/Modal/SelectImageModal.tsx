import React, { memo, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, TouchableHighlight, TextInput, Image } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import { Modalize } from 'react-native-modalize';
import icons from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import {chooseImageFromCamera, chooseImageFromGallery } from '@/utils';

interface Props extends ViewProps {
    modalRef: any,
    setImageProps: any
}

export const SelectImageModal = memo(function SelectModal({
    modalRef, setImageProps
}: Props) {
    const { t } = useTranslation();
    let optionData = [
        { icon: icons.other.camera, type: 'Chụp ảnh', onPress: () => takeImage() },
        { icon: icons.other.image, type: 'Tải ảnh', onPress: () => uploadImage() }
    ]

    const takeImage = async () => {
        modalRef.current.close();
        const image = await chooseImageFromCamera();
        setImageProps(image);
    }

    const uploadImage = async () => {
        modalRef.current.close();
        const image = await chooseImageFromGallery(false, false);
        setImageProps(image);
    }

    return (
        <Modalize
            ref={modalRef}
            snapPoint={150}
            handlePosition={'inside'}
        >
            <View style={styles.flex}>
                <View style={styles.flex}>
                    {optionData.map((item, index) => {
                        return (
                            <TouchableHighlight key={index} onPress={() => item.onPress()}>
                                <View style={styles.btnOption}>
                                    <Image
                                        source={item.icon}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.txtOption}>{item.type}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                    }
                </View>
            </View>
        </Modalize>
    );
});

const styles = ScaledSheet.create({
    flex: {
        // flex: 1
    },
    container: {

    },
    viewInput: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: '8@ms',
        alignItems: 'center',
        marginHorizontal: '15@ms',
        borderColor: '#E3E5E6',
        height: '45@ms'
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
    },
    viewHeader: {
        paddingVertical: '15@ms0.3',
    },
    txtHeader: {
        fontFamily: font.SFProTextBold,
        color: '#000000',
        fontSize: 20,
        marginTop: 20,
        marginHorizontal: '15@ms'
    },
    txtContent: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#798295',
        marginTop: '5@ms0.3'
    },
    btnOption: {
        paddingVertical: '15@ms0.3',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtOption: {
        color: '#000000',
        marginLeft: '15@ms0.3',
        fontSize: font_size.VERY_LARGE
    }
});