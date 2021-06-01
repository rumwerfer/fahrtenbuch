import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import JourneyDate from '../atoms/Date';
import Distance from '../atoms/Distance';
import { journeyListItem, centerX } from '../styles/Styles';
import Fonts from '../styles/Fonts';

export default ({journey}) => {
  const textColor = useTheme().colors.text;
  return (
    <View style={journeyListItem}>
      <View style={{ flex: .65 }}>
        <View style={{ justifyContent: 'space-between'}}>
          <JourneyDate time={journey.startTime}/>
          <View style={centerX}>
            <Text style={Fonts.tiny}>{journey.route}</Text>
          </View>
        </View>
      </View>
      <Distance journey={journey} flex={.35} />
    </View>
  );
}
