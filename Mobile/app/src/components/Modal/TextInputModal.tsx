import React, { memo, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, TouchableHighlight, TextInput } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import Modal from "react-native-modalbox";

interface Props extends ViewProps {
    modalRef: any,
    data: {
        title: string,
        keyword?: any,
        setKeyword?: (item: any) => void
    },
    onPress: (data: any) => void
}

export const TextInputModal = memo(function SelectModal({
    modalRef, data, onPress
}: Props) {
    return (
        <Modal
            ref={modalRef}
            backdrop={true}
            position={'bottom'}
            style={styles.containerModal}
            backdropPressToClose={true}
            swipeToClose={false}
            coverScreen
        >
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>{data.title}</Text>
                <TextInput
                    value={data.keyword}
                    onChangeText={data.setKeyword}
                />
            </View>
        </Modal>
    );
});

const styles = ScaledSheet.create({
    containerModal: {
        zIndex: 2,
        width: '100%',
        backgroundColor: 'white',
        height: 300
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
    }
});