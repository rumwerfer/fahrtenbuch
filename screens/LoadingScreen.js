/* shown while redux-persist rehydrates redux store */

import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import Strings from '../res/Strings';

export default () => {
  const themeColors = useTheme().colors;
  return (
    <SafeAreaView style={{
      backgroundColor: themeColors.screenBackground,
      flex: 1,
      padding: 40,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size='large' style={{marginBottom: 40}}/>
      <Text style={{color: themeColors.text}}>{Strings.loadingMessage}</Text>
    </SafeAreaView>
  );
}
