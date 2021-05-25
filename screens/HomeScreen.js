import React, { useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from 'react-native-paper';

import Summary from '../molecules/Summary';
import Journey from '../molecules/Journey';
import StatusBar from '../atoms/StatusBar';
import { fillSpace, journeyListPadding } from '../styles/Styles';
import { mapJourneysToProps } from '../redux/Mappers';

const HomeScreen = ({journeys}) => {
  const themeColors = useTheme().colors;
  return (
    <SafeAreaView
      style={{...fillSpace, backgroundColor: themeColors.screenBackground}}
    >
      <StatusBar />
      <JourneyList journeys={journeys} />
      <Summary journeys={journeys} />
    </SafeAreaView>
  );
};

const JourneyList = ({journeys}) => {
  const scrollView = useRef(null);
  return (
    <ScrollView
      ref={scrollView}
      contentInsetAdjustmentBehavior='automatic' // iOS 11+
      onContentSizeChange={() =>
        scrollView.current.scrollToEnd({animated: false})
      }
      contentContainerStyle={journeyListPadding}
    >
      {journeys.saved.map(
        journey => <Journey journey={journey} key={journey.startTime} />
      )}
    </ScrollView>
  );
}

export default connect(mapJourneysToProps)(HomeScreen);
