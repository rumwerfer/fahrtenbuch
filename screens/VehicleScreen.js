import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Dialog from '../atoms/Dialog';
import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Colors from '../res/Colors';
import Icons from '../res/Icons';
import { paddedScreen, form, fillSpace } from '../styles/Styles';
import { TwoTextForm } from '../molecules/Forms';
import { mapStateToProps } from '../redux/Mappers';
import * as VehicleActions from '../redux/VehicleActions';
import * as JourneyActions from '../redux/JourneyActions';

function VehicleScreen(props) {

  const navigation = useNavigation();

  const [vehicleName, setVehicleName] = React.useState('');
  const [numberPlate, setNumberPlate] = React.useState('');

  // remove vehicle dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);

  // edit vehicle if id given, otherwise add vehicle
  const editVehicleID = props.route.params?.id;
  const editMode = editVehicleID !== undefined;
  if (editMode) {
    const vehicle = props.vehicles.vehicles.find(
      vehicle => vehicle.id === editVehicleID
    );
    useEffect(() => {
      setVehicleName(vehicle.name);
      setNumberPlate(vehicle.numberPlate);
      navigation.setOptions({
        headerRight: () =>
          <IconButton
            onPress={showDialog}
            icon={Icons.trash}
            color={Colors.white}
          />
      });
    }, []);
  }

  return (
    <SafeAreaView style={fillSpace}>
      <TwoTextForm
        label1={Strings.vehicleName}
        value1={vehicleName}
        setValue1={setVehicleName}
        label2={Strings.numberPlate}
        value2={numberPlate}
        setValue2={(text) => setNumberPlate(text.toUpperCase())}
        buttonIcon={Icons.save}
        onButtonPress={() => {
          if (validateInput(vehicleName, numberPlate)) {
            const payload = { name: vehicleName, numberPlate: numberPlate };
            if (editMode) {
              props.editVehicle({ ...payload, id: editVehicleID });
            } else {
              props.addVehicle({ ...payload, id: Date.now() });
            }
            navigation.goBack();
          }
        }}
        buttonLabel={Strings.saveVehicle}
      />
      <Dialog
        onConfirm={() => {
          props.removeVehicleJourneys({ vehicleID: editVehicleID });
          props.removeVehicle({ id: editVehicleID });
          navigation.goBack();
        }}
        dialogOpen={dialogOpen}
        hideDialog={hideDialog}
        title={Strings.removeVehicle + '?'}
        message={Strings.removeVehicleMessage}
      />
    </SafeAreaView>
  );
};

function validateInput(vehicleName, numberPlate) {

  if (isBlank(vehicleName)) {
    Toast.show(Strings.enterNameMessage);
    return false;
  }

  if (isBlank(numberPlate)) {
    Toast.show(Strings.enterNumberPlateMessage);
    return false;
  }

  return true;
}

function isBlank(string) {
  return (!string || string.trim().length === 0)
}

const mapDispatchToProps = dispatch => ({
  addVehicle: (payload) => dispatch(VehicleActions.addVehicle(payload)),
  editVehicle: (payload) => dispatch(VehicleActions.editVehicle(payload)),
  removeVehicleJourneys: (payload) =>
    dispatch(JourneyActions.removeVehicleJourneys(payload)),
  removeVehicle: (payload) => dispatch(VehicleActions.removeVehicle(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleScreen);
