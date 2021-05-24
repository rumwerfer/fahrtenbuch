import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { centerXY, dateStyle } from '../styles/Styles';

export default JourneyDate = (props) => {
  const themeColors = useTheme().colors;

  const date = new Date(props.time);
  const dayAndMonth = date.toLocaleDateString(
      undefined, // use device locale
      {day: 'numeric', month: 'long'}
  );
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return (
    <View style={{...centerXY, flex: props.flex}}>
      <Text style={{...dateStyle, color: themeColors.text}}>
        {dayAndMonth}
        {year === currentYear ? '' : ' ' + year}
      </Text>
    </View>
  );
}
