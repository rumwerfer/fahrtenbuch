import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { paddedScreen } from '../styles/Styles';

const VehicleScreen = () => {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };
  return (
    <SafeAreaView style={{...paddedScreen, ...backgroundColor}} >
    </SafeAreaView>
  );
};

export default VehicleScreen;
