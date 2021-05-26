import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { paddedScreen, form } from '../styles/Styles';
import { TwoTextForm } from '../molecules/Forms';

const VehicleScreen = () => {

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
        navigation.navigate('fleet');
      }}
      buttonLabel={Strings.saveVehicle}
    />
  );
};

export default VehicleScreen;
