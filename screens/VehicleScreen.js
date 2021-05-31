import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { paddedScreen, form } from '../styles/Styles';
import { TwoTextForm } from '../molecules/Forms';
import { mapVehiclesToProps } from '../redux/Mappers';
import * as VehicleActions from '../redux/VehicleActions';

function VehicleScreen(props) {

  const navigation = useNavigation();

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const [vehicleName, setVehicleName] = React.useState('');
  const [numberPlate, setNumberPlate] = React.useState('');

  return (
    <TwoTextForm
      label1={Strings.vehicleName}
      value1={vehicleName}
      setValue1={setVehicleName}
      label2={Strings.numberPlate}
      value2={numberPlate}
      setValue2={setNumberPlate}
      buttonIcon={Icons.save}
      onButtonPress={() => {
        if (validateInput(vehicleName, numberPlate)) {
          const payload = {
            id: Date.now(),
            name: vehicleName,
            numberPlate: numberPlate
          };
          props.addVehicle(payload);
          navigation.goBack();
        }
      }}
      buttonLabel={Strings.saveVehicle}
    />
  );
};

function validateInput(vehicleName, numberPlate) {

  if (isBlank(vehicleName)) {
    Toast.show(Strings.enterVehicleNameMessage);
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
});

export default connect(mapVehiclesToProps, mapDispatchToProps)(VehicleScreen);
