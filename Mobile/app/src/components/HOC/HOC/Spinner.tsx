import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
export const Spinner = ({ customStyle, color }: {
    customStyle?: object,
    color?: string
}) => {
    return (
        <ActivityIndicator size={'small'} style={[styles.container, customStyle]} color={color ? color : 'gray'} />
    );
};

const styles = ScaledSheet.create({
    container: {
        marginTop: '100@ms'
    }
});
