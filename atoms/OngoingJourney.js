import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import { mapStateToProps } from '../redux/Mappers';
import Fonts from '../styles/Fonts';
import Strings from '../res/Strings';
import Colors from '../res/Colors';
import Icons from '../res/Icons';
import { smallPadding, absoluteRight, centerY } from '../styles/Styles';
import * as JourneyActions from '../redux/JourneyActions';

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

  const discardDialog = () =>
    Alert.alert(
      'Fahrt verwerfen',
      'Möchtest du die begonnene Fahrt wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'OK', onPress: props.discardJourney },
      ],
      { cancelable: true }
    );

  return (
    <View style={{ ...smallPadding, ...backgroundColor, ...centerY }}>
      <Text style={Fonts.tinyCenterWhite}>
        {Strings.ongoingJourneyMessage(journey.startMileage, vehicleName)}
      </Text>
      <IconButton
        onPress={discardDialog}
        icon={Icons.cancel}
        style={absoluteRight}
        color={Colors.white}
        size={18}
      />
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  discardJourney: () => dispatch(JourneyActions.discardJourney()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OngoingJourney);
