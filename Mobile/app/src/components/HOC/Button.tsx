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
    isSmall?: boolean;
}
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
            backgroundColor: color ? color : '#0386D0',
            //width: width ? width : '70%'
        }]}
            disabled={isLoading ? isLoading : disabled}
            activeOpacity={0.7}>
            {isLoading ?
                <ActivityIndicator color={'white'} size={'small'} /> :
                <Text style={[styles.txtStyle, customTextStyle, ]}>{children}</Text>
            }
        </TouchableOpacity>
    );
});

const styles = ScaledSheet.create({
    btnStyle: {
        height: '55@ms0.3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5@ms',
        //marginTop:40
    },
    // btnStyleSmall: {
    //     height: '35@ms0.3',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: '5@ms',
    // },
    txtStyle: {
        fontFamily: font.SFProTextRegular,
        color: 'white',
        fontSize:24
        
    }
})

