import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import Dialog from '../atoms/Dialog';
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

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);

  return (
    <View style={{ ...smallPadding, ...backgroundColor, ...centerY }}>
      <Text style={Fonts.tinyCenterWhite}>
        {Strings.ongoingJourneyMessage(journey.startMileage, vehicleName)}
      </Text>
      <IconButton
        onPress={showDialog}
        icon={Icons.cancel}
        style={absoluteRight}
        color={Colors.white}
        size={18}
      />
      <Dialog
        onConfirm={props.discardJourney}
        dialogOpen={dialogOpen}
        hideDialog={hideDialog}
        title={Strings.discardJourney + '?'}
        message={Strings.discardJourneyMessage}
      />
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  discardJourney: () => dispatch(JourneyActions.discardJourney()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OngoingJourney);
