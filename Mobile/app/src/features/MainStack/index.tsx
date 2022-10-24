import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomePage from './HomePage';
import { useTranslation } from 'react-i18next';
import { ScaledSheet } from 'react-native-size-matters';
import icons from '@/assets/icons';
import { Image } from 'react-native';
import { font } from '@/configs/fonts';
const MainStack = memo(function () {
  const { t } = useTranslation();

  return (
    <HomePage />
  );
})

export default MainStack;

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ico: {
    width: '24@ms',
    height: '24@ms'
  }
})
