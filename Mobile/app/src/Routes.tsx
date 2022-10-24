import React, { memo, useRef, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/utils/navigation';
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const AuthStackComponent = memo(function AuthStackComponent() {
  return (
    <AuthStack.Navigator initialRouteName={'Introduce'} headerMode={'none'}>
      <AuthStack.Screen name={'Introduce'} component={require('./features/AuthStack/Introduce').default} />
      <AuthStack.Screen name={'Login'} component={require('./features/AuthStack/Login').default} />
      <AuthStack.Screen name={'Register'} component={require('./features/AuthStack/Register').default} />
    </AuthStack.Navigator>
  );
});

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator initialRouteName={'MainStack'} headerMode={'none'}>
      <MainStack.Screen name={'MainStack'} component={require('./features/MainStack').default} />
      <MainStack.Screen name={'UpdateInfo'} component={require('./features/MainStack/Account/UpdateInfo').default} />
      <MainStack.Screen name={'OtherAccount'} component={require('./features/MainStack/Account/OtherAccount').default} />
      <MainStack.Screen name={'Temperature'} component={require('./features/MainStack/Temperature').default} />
      <MainStack.Screen name={'Air'} component={require('./features/MainStack/Air').default} />
      <MainStack.Screen name={'Percent'} component={require('./features/MainStack/Percent').default} />
      <MainStack.Screen name={'Land'} component={require('./features/MainStack/Land').default} />
      <MainStack.Screen name={'ModeSetting'} component={require('./features/MainStack/ModeSetting').default} />
      <MainStack.Screen name={'Setting'} component={require('./features/MainStack/Setting').default} />
    </MainStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  const routeNameRef = useRef('');
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={onStateChange}>
        <RootStack.Navigator initialRouteName="AuthStack" headerMode={'none'}>
          <RootStack.Screen name={'AuthStack'} component={AuthStackComponent} />
          <RootStack.Screen name={'MainStack'} component={MainStackComponent} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
});
