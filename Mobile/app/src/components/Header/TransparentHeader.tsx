import React, { memo } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import icons from '@/assets/icons';
import { goBack } from '@/utils/navigation';

interface TransparentHeaderProps extends ViewProps {
    title?: string;
    back?: boolean;
    icon?: any;
    customStyle?: object;
    onPress: () => void,
}

export const TransparentHeader = memo(function DynamicHeader({
    title, back, icon, customStyle, onPress
}: TransparentHeaderProps) {
    return (
        <SafeAreaView style={[styles.container, customStyle]}>
            <ImageBackground
                source={{
                    uri: title
                }}
                style={styles.icoItem}>
                <View style={styles.center}>
                    {back &&
                        <TouchableOpacity style={styles.btnBack} onPress={goBack}>
                            <Image
                                source={icons.product.back}
                                style={styles.icBack}
                            />
                        </TouchableOpacity>
                    }
                    {icon &&
                        <TouchableOpacity style={styles.btnSearch} onPress={onPress}>
                            <Image
                                source={icon}
                                style={styles.icBooking}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
});

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'white'
    },
    icoItem: {
        width: '100%',
        height: '260@ms',
        resizeMode: 'contain'
    },
    center: {
        borderBottomColor: '#CCCCCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '55@ms'
    },
    txtTitle: {
        textAlign: 'center',
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0
    },
    btnBack: {
        paddingLeft: '15@ms',
        zIndex: 2
    },
    btnSearch: {
        right: '15@ms',
        zIndex: 2,
        position: 'absolute'
    },
    icBack: {
        width: '48@ms',
        height: '48@ms',
        alignSelf: 'center'
    },
    icBooking: {
        width: '48@ms',
        height: '48@ms',
        alignSelf: 'center'
    }
});