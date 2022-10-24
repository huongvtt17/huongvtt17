import React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigation = () => navigationRef.current!;

export const navigate = (screenName: string, params?: object) => navigation().navigate(screenName, params);

export const replace = (screenName: string, params?: object) => navigation().dispatch(StackActions.replace(screenName, params));

export const push = (screenName: string, params?: object) => navigation().dispatch(StackActions.push(screenName, params));

export const goBack = () => navigation().goBack();