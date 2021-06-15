import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Toast from 'react-native-simple-toast';

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
    journey => journey.id === props.route.params.id
  );

  const [startMileage, setStartMileage] = React.useState('');
  const [endMileage, setEndMileage] = React.useState('');
  const [route, setRoute] = React.useState('');
  const [vehicleID, setVehicleID] = React.useState(-1);
  const [tutorID, setTutorID] = React.useState(-1);
  const [weather, setWeather] = React.useState(-1);
  const [startTime, setStartTime] = React.useState(-1);
  const [endTime, setEndTime] = React.useState(-1);
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
    setStartMileage(journey.startMileage.toString());
    setEndMileage(journey.endMileage.toString());
    setRoute(journey.route);
    setVehicleID(journey.vehicleID);
    setTutorID(journey.tutorID);
    setWeather(journey.weather);
    setStartTime(journey.startTime);
    setEndTime(journey.endTime);
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
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onButtonPress={() => {
          if (
            validateInput(startMileage, endMileage, route, startTime, endTime)
          ) {
            console.log(startMileage);
            props.editJourney({
              id: journey.id,
              startMileage: startMileage,
              endMileage: endMileage,
              route: route,
              vehicleID: vehicleID,
              tutorID: tutorID,
              weather: weather,
              startTime: startTime,
              endTime: endTime,
            });
            navigation.goBack();
          }
        }}
      />
      <Dialog
        onConfirm={() => {
          props.removeJourney({ id: journey.id });
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

function validateInput(startMileage, endMileage, route, startTime, endTime) {

  // no empty fields
  if (isBlank(startMileage)) {
    Toast.show(Strings.enterStartMileageMessage);
    return false;
  }
  if (isBlank(endMileage)) {
    Toast.show(Strings.enterEndMileageMessage);
    return false;
  }
  if (isBlank(route)) {
    Toast.show(Strings.enterRouteMessage);
    return false;
  }

  // validate distance
  const distance = endMileage - startMileage;
  if (distance <= 0) {
    Toast.show(Strings.negativeDistanceMessage);
    return false;
  }
  if (distance > 9999) {
    Toast.show(Strings.highDistanceMessage);
    return false;
  }

  // validate time
  if (startTime >= endTime) {
    Toast.show(Strings.negativeTimeMessage);
    return false;
  }

  return true;
}

function isBlank(string) {
  return (!string || string.trim().length === 0)
}

const mapDispatchToProps = dispatch => ({
  removeJourney: (payload) => dispatch(JourneyActions.removeJourney(payload)),
  editJourney: (payload) => dispatch(JourneyActions.editJourney(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
