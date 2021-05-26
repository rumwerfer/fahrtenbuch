import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import Button from '../atoms/Button';
import Strings from '../res/Strings';
import {
  distanceWhite,
  summaryStyle,
  journeyButtonContainer
} from '../styles/Styles';
import Icons from '../res/Icons';

export default ({journeys}) => {
  const enRoute = journeys.ongoing !== null;
  const distanceSum = journeys.saved.reduce(
    (sum, journey) =>
    sum + (journey.endMileage - journey.startMileage), 0
  );
  const themeColors = useTheme().colors;
  const navigation = useNavigation();
  return (
    <View style={{...summaryStyle, backgroundColor: themeColors.summary}}>
      <View style={journeyButtonContainer}>
        <Button
          onPress={() => navigation.navigate('mileage', {start: !enRoute})}
          /* route params for screen title */
          icon={enRoute ? Icons.finishJourney : Icons.startJourney}
          label={enRoute ? Strings.finishJourney: Strings.startJourney}
        />
      </View>
      <Text style={distanceWhite}>
        {distanceSum + ' km'}
      </Text>
    </View>
  );
}
