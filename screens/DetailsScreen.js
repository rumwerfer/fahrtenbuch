import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

import Dialog from '../atoms/Dialog';
import { DetailsForm } from '../molecules/Forms';
import { mapStateToProps } from '../redux/Mappers';
import { fillSpace } from '../styles/Styles';
import Icons from '../res/Icons';
import Colors from '../res/Colors';
import Strings from '../res/Strings';
import * as JourneyActions from '../redux/JourneyActions';

function DetailsScreen(props) {
  const navigation = useNavigation();

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const journey = props.journeys.saved.find(
    journey => journey.startTime === props.route.params.startTime
  );

  const [startMileage, setStartMileage] =
    React.useState(journey.startMileage.toString());
  const [endMileage, setEndMileage] =
    React.useState(journey.endMileage.toString());
  const [route, setRoute] = React.useState(journey.route);
  const [vehicleID, setVehicleID] = React.useState(journey.vehicleID);
  const [tutorID, setTutorID] = React.useState(journey.tutorID);
  const [weather, setWeather] = React.useState(journey.weather);
  // TODO too many useState hooks could be refactored with useReducer

  // remove journey dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        <IconButton
          onPress={showDialog}
          icon={Icons.trash}
          color={Colors.white}
        />
    });
  }, []);

  return (
    <SafeAreaView style={fillSpace}>
      <DetailsForm
        startMileage={startMileage}
        setStartMileage={setStartMileage}
        endMileage={endMileage}
        setEndMileage={setEndMileage}
        route={route}
        setRoute={setRoute}
        vehicleID={vehicleID}
        setVehicleID={setVehicleID}
        tutorID={tutorID}
        setTutorID={setTutorID}
        weather={weather}
        setWeather={setWeather}
        onButtonPress={() => {
          props.editJourney({
            startTime: journey.startTime,
            startMileage: startMileage,
            endMileage: endMileage,
            route: route,
            vehicleID: vehicleID,
            tutorID: tutorID,
            weather: weather,
          });
          navigation.goBack();
        }}
      />
      <Dialog
        onConfirm={() => {
          props.removeJourney({ startTime: journey.startTime });
          navigation.goBack();
        }}
        dialogOpen={dialogOpen}
        hideDialog={hideDialog}
        title={Strings.removeJourney + '?'}
        message={Strings.removeJourneyMessage}
      />
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => ({
  removeJourney: (payload) => dispatch(JourneyActions.removeJourney(payload)),
  editJourney: (payload) => dispatch(JourneyActions.editJourney(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
