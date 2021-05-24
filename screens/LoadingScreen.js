/* shown while redux-persist rehydrates redux store */

import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import StatusBar from '../atoms/StatusBar';
import Strings from '../res/Strings';
import { centerXY, paddedScreen } from '../styles/Styles';

export default () => {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };
  const textColor = { color: themeColors.text };
  return (
    <SafeAreaView style={{ ...backgroundColor, ...centerXY, ...paddedScreen }}>
      <StatusBar />
      <ActivityIndicator size='large' style={{marginBottom: 40}}/>
      <Text style={textColor}>
        {Strings.loadingMessage}
      </Text>
    </SafeAreaView>
  );
}
