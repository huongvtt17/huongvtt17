import { font, font_size } from '@/configs/fonts';
import React, { memo, ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore

interface ButtonProps extends TouchableOpacityProps {
    children?: ReactNode;
    color?: string,
    width?: number,
    customTextStyle?: object;
    isLoading?: boolean;
    disabled?: boolean;
    isSmall?: boolean;}
export const Button = memo(function Button({
    children,
    color,
    width,
    customTextStyle,
    isLoading,
    isSmall,
    disabled,
    ...props
}: ButtonProps) {                                       
    return (
        <TouchableOpacity {...props} style={[isSmall ? styles.btnStyleSmall : styles.btnStyle, {
            backgroundColor: color ? color : '#ffffff',
            
        }]}
            disabled={isLoading ? isLoading : disabled}
            activeOpacity={0.7}>
            {isLoading ?
                <ActivityIndicator color={'white'} size={'small'} /> :
                <Text style={[styles.txtStyle, customTextStyle, { fontSize: isSmall ? font_size.NORMAL : font_size.VERY_LARGE }]}>{children}</Text>
            }
        </TouchableOpacity>
    );
});

const styles = ScaledSheet.create({
    btnStyle: {
        height: '120@ms',
        // alignItems: 'center',
        //justifyContent: 'center',
        borderRadius: '10@ms',
        marginHorizontal: '30@ms'
    },
    btnStyleSmall: {
       // height: '40@ms',
        //alignItems: 'center',
        //justifyContent: 'center',
        //borderRadius: '48@ms',
    },
    txtStyle: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#121212',
    }
})

