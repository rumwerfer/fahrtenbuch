import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar, useTheme } from 'react-native-paper';

import Button from '../atoms/Button';
import Strings from '../res/Strings';
import {
  sumDistance,
  mediumPadding,
  journeyButtonContainer,
  smallVerticalPadding,
  centerX,
} from '../styles/Styles';
import Icons from '../res/Icons';
import Fonts from '../styles/Fonts';
import Constants from '../res/Constants';

export default ({journeys}) => {
  const enRoute = journeys.ongoing !== null;
  const distanceSum = journeys.saved.reduce(
    (sum, journey) =>
    sum + (journey.endMileage - journey.startMileage), 0
  );
  const themeColors = useTheme().colors;
  const navigation = useNavigation();
  return (
    <View style={{...mediumPadding, backgroundColor: themeColors.summary}}>
      <View style={journeyButtonContainer}>
        <Button
          onPress={() => navigation.navigate('journey', {start: !enRoute})}
          /* route params for screen title */
          icon={enRoute ? Icons.finishJourney : Icons.startJourney}
          label={enRoute ? Strings.finishJourney: Strings.startJourney}
        />
      </View>
      <View style={centerX}>
        <Text style={{...sumDistance, paddingRight: 12}}>
          {distanceSum + Strings.km}
        </Text>
      </View>
      <Text style={Fonts.lightgreen}>
        {
          distanceSum < Constants.distanceGoal
          ? Strings.kmToGo(Constants.distanceGoal - distanceSum)
          : Strings.madeIt
        }
      </Text>
      <ProgressBar progress={ distanceSum / Constants.distanceGoal } />
    </View>
  );
}
