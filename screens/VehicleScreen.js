import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

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
        props.addVehicle({name: vehicleName, numberPlate: numberPlate});
        navigation.navigate('fleet');
      }}
      buttonLabel={Strings.saveVehicle}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  addVehicle: (payload) => dispatch(VehicleActions.addVehicle(payload)),
});

export default connect(mapVehiclesToProps, mapDispatchToProps)(VehicleScreen);
