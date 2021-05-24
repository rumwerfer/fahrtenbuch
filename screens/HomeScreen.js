import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from 'react-native-paper';

import Summary from '../molecules/Summary';
import Journey from '../molecules/Journey';
import { fillSpace } from '../styles/Styles';
import { mapJourneysToProps } from '../redux/Mappers';

const HomeScreen = ({journeys}) => {
  const themeColors = useTheme().colors;
  return (
    <SafeAreaView
      style={{...fillSpace, backgroundColor: themeColors.screenBackground}}
    >
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={themeColors.primary}
      />
      <JourneyList journeys={journeys} />
      <Summary journeys={journeys} />
    </SafeAreaView>
  );
};

const JourneyList = ({journeys}) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      {journeys.saved.map(
        journey => <Journey journey={journey} key={journey.startTime} />
      )}
    </ScrollView>
  );
}

export default connect(mapJourneysToProps)(HomeScreen);
