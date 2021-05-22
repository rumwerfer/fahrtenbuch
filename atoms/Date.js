import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default JourneyDate = (props) => {
  const date = new Date(props.time);
  const dayAndMonth = date.toLocaleDateString(
      undefined, // use device locale
      {day: 'numeric', month: 'long'}
  );
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return (
    <View style={{flex: props.flex, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '400', marginTop: 3}}>
        {/* marginTop = 3 because mileage's fontSize is greater by 6 */}
        {dayAndMonth}
        {year === currentYear ? '' : ' ' + year}
      </Text>
    </View>
  );
}
