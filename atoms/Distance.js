import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { centerY, distanceStyle } from '../styles/Styles';
import Strings from '../res/Strings';

export default ({journey, flex}) => {
  return (
    <View style={{flex: flex}}>
      <View style={{...centerY, height: 40}}>
        <Text style={distanceStyle}>
          {journey.endMileage - journey.startMileage + Strings.km}
        </Text>
      </View>
    </View>
  );
}
