import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { mapStateToProps } from '../redux/Mappers';
import Fonts from '../styles/Fonts';
import Strings from '../res/Strings';
import { smallPadding } from '../styles/Styles';

const OngoingJourney = (props) => {
  const journey = props.journeys.ongoing;
  if (!journey) {
    return null;
  }

  const color = useTheme().colors.summary;
  const backgroundColor = { backgroundColor: color };
  const vehicleName =
    props.vehicles.vehicles
    .find(vehicle => vehicle.id === journey.vehicleID)
    .name;

  return (
    <View style={{ ...smallPadding, ...backgroundColor }}>
      <Text style={Fonts.tinyCenterWhite}>
        {Strings.ongoingJourneyMessage(journey.startMileage, vehicleName)}
      </Text>
    </View>
    // TODO discard journey button
  );
}

export default connect(mapStateToProps)(OngoingJourney);
