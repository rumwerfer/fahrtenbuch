import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

export default () => {
  const color = useTheme().colors.primary;
  return (
    <RNStatusBar
      barStyle={'light-content'}
      backgroundColor={color}
    />
  );
}
