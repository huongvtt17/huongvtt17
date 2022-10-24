import React, { memo } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import icons from '@/assets/icons';
import { goBack } from '@/utils/navigation';

interface DynamicHeaderProps extends ViewProps {
    title: string;
    back?: boolean;
    Header?: any;
    customStyle?: object;
    onSearch?: () => void,
}

export const DynamicHeader = memo(function DynamicHeader({
    title, back, Header, customStyle, onSearch
}: DynamicHeaderProps) {
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

                <Text style={styles.txtTitle}>{title}</Text>
                {Header ?
                    Header : <></>
                }
            </View>
        </SafeAreaView>
    );
});

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'white'
    },
    center: {
        borderBottomColor: '#314C1C',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '55@ms',
        borderBottomWidth: 1
    },
    txtTitle: {
        textAlign: 'center',
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.VERY_LARGE + 2,
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
        paddingRight: '15@ms',
        zIndex: 2
    },
    icBack: {
        width: '30@ms',
        height: '30@ms',
        alignSelf: 'center'
    }
});