import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { centerX } from '../styles/Styles';
import Fonts from '../styles/Fonts';

export default JourneyDate = (props) => {

  const date = new Date(props.time);
  const dayAndMonth = date.toLocaleDateString(
      undefined, // use device locale
      {day: 'numeric', month: 'long'}
  );
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return (
    <View style={centerX}>
      <Text style={Fonts.small}>
        {dayAndMonth}
        {year === currentYear ? '' : ' ' + year}
      </Text>
    </View>
  );
}
