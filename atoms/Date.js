import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default JourneyDate = ({time}) => {
  const date = new Date(time);
  const dayAndMonth = date.toLocaleDateString(
      undefined, // use device locale
      {day: 'numeric', month: 'long'}
  );
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '400'}}>
        {dayAndMonth}
        {year === currentYear ? '' : ' ' + year}
      </Text>
    </View>
  );
}
