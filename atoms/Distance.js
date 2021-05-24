import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { centerXY, distanceStyle } from '../styles/Styles';

export default ({journey, flex}) => {
  const textColor = useTheme().colors.text;
  return (
    <View style={{...centerXY, flex: flex}}>
      <Text style={{ ...distanceStyle, color : textColor }}>
        {journey.endMileage - journey.startMileage + ' km'}
      </Text>
    </View>
  );
}
