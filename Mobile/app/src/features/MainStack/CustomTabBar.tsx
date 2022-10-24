import React, { memo, useCallback } from 'react';
import { InteractionManager, TouchableWithoutFeedback, View, Image, Text, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { isTablet } from 'react-native-device-info';
import { font, font_size } from '@/configs/fonts';
import Svg, { Circle, Path } from 'react-native-svg';
import { ScaledSheet } from 'react-native-size-matters';
const halfPartBtnAdd = 36;

export const CustomTabBar = memo(function CustomTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    return (
        <View>
            <View style={styles.containerAbsolute}>
                <BgTabBar />
                <View style={styles.contentContainer} pointerEvents="box-none">
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = useCallback(() => {
                            InteractionManager.runAfterInteractions(() => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            });
                        }, [route, isFocused, index]);

                        if (index === 2) {
                            return (
                                <View
                                    key={'tab-' + index.toString()}>
                                    <LoyaltyButton onPress={onPress} />
                                </View>
                            );
                        }

                        return (
                            <TouchableWithoutFeedback
                                key={'tab-' + index.toString()}
                                accessibilityRole="button"
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}>
                                <View style={styles.bottomBarIcon}>
                                    {options &&
                                        options.tabBarIcon &&
                                        options.tabBarIcon({
                                            focused: isFocused,
                                            color: '',
                                            size: 0,
                                        })}
                                    <Text numberOfLines={1} style={[styles.txtTabName, { color: isFocused ? '#8BC724' : '#8C8C8C' }]}>
                                        {label}
                                    </Text>
                                    {isFocused && <View style={styles.indicator} />}
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            </View>
        </View>
    );
});

const LoyaltyButton = memo(({ onPress }: {
    onPress: () => void
}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.viewIconLoyalty}>
            <View style={styles.viewLoyaltyContainer}>
                <Svg
                    width={60}
                    height={60}
                    viewBox="0 0 60 60"
                    fill="none">
                    <Circle cx={30} cy={30} r={30} fill="#86C022" />
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30 50c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"
                        fill="#fff"
                        fillOpacity={0.2}
                    />
                    <Image
                        source={require('@/assets/icons/Tabbar/gift.png')}
                        resizeMode={'stretch'}
                        style={styles.icoGift}
                    />
                </Svg>
            </View>
        </View>
    </TouchableWithoutFeedback>
));

const BgTabBar = memo(() => (
    <View style={styles.viewTabBarContainer}>
        <View style={styles.viewImageContainer}>
            <Image
                source={require('@/assets/icons/Tabbar/tabbar-bg-left.png')}
                style={styles.imgLeftRight}
                resizeMode={'stretch'}
            />
            <Image
                source={require('@/assets/icons/Tabbar/tabbar-bg-side.png')}
                style={styles.imgSide}
                resizeMode={'stretch'}
            />
            <Image
                source={require('@/assets/icons/Tabbar/tabbar-bg-center.png')}
                style={styles.imgCenter}
            />
            <Image
                source={require('@/assets/icons/Tabbar/tabbar-bg-side.png')}
                style={styles.imgSide}
                resizeMode={'stretch'}
            />
            <Image
                source={require('@/assets/icons/Tabbar/tabbar-bg-right.png')}
                style={styles.imgLeftRight}
                resizeMode={'stretch'}
            />
        </View>
        <View style={styles.imgFillWhite} />
    </View>
));

const styles = ScaledSheet.create({
    containerAbsolute: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: halfPartBtnAdd + 70 + (isIphoneX() || isTablet() ? 20 : 0),
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingTop: halfPartBtnAdd,
        flexDirection: 'row',
        alignItems: 'center',
        width: isTablet() ? 500 : 'auto',
    },
    bottomBarIcon: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: 10,
    },
    indicator: {
        width: 15,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#86C022',
        marginTop: 2,
    },
    viewTabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 80 + (isIphoneX() || isTablet() ? 20 : 0)
    },
    viewImageContainer: {
        width: '100%',
        height: 60,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgLeftRight: {
        height: 60,
        width: 30,
    },
    imgCenter: {
        height: 60,
        width: 120,
    },
    imgSide: {
        height: 60,
        flex: 1,
    },
    imgFillWhite: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewIconLoyalty: {
        flex: 1,
        height: halfPartBtnAdd + 70 + (isIphoneX() || isTablet() ? 20 : 0),
        marginBottom: 0,
        alignItems: 'center',
        marginTop: -halfPartBtnAdd,
    },
    viewLoyaltyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: halfPartBtnAdd * 2,
        height: halfPartBtnAdd * 2,
        borderRadius: halfPartBtnAdd
    },
    txtTabName: {
        textAlign: 'center',
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_SMALL,
        lineHeight: 15,
        color: '#121212',
        marginTop: '5@ms0.3'
    },
    icoGift: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 15
    }
});
