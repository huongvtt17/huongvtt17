import { StatusBarProps, StatusBar } from 'react-native';
import React, { memo } from 'react';
interface Props extends Partial<StatusBarProps> {
  theme?: 'light-content' | 'dark-content' | 'default';
  backgroundColor?: string
}

export const StatusBarView = memo(({ theme, backgroundColor, ...props }: Props) => {
  return (
    <>
      <StatusBar barStyle={theme} {...props} backgroundColor={backgroundColor ? backgroundColor : 'white'} />
    </>
  );
});
