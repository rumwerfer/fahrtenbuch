import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { fillSpace } from '../styles/Styles';

const FleetScreen = () => {
  const themeColors = useTheme().colors;
  return (
    <SafeAreaView
      style={{...fillSpace, backgroundColor: themeColors.screenBackground}}
    >
    </SafeAreaView>
  );
};

export default FleetScreen;
