import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import JourneyDate from '../atoms/Date';
import Distance from '../atoms/Distance';
import { journeyStyle } from '../styles/Styles';

export default ({journey}) => {
  const textColor = useTheme().colors.text;
  return (
    <View style={journeyStyle}>
      <JourneyDate time={journey.startTime} flex={.65} />
      <Distance journey={journey} flex={.35} />
    </View>
  );
}
