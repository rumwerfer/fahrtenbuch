import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from 'react-native-paper-dropdown';
import { TextInput } from 'react-native-paper';

import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { inputHeight } from '../styles/Styles';

export default function VehicleDropdown(props) {

  const [showDropdown, setShowDropdown] = useState(true);

  const vehicleList = [
    { label: 'test1', value: '1' },
    { label: 'test2', value: '2' },
  ];

  if (props.ongoingJourney) {
    return <View />;
  }

  return (
    <View style={props.containerStyle} >
      <Dropdown
        label={Strings.vehicle}
        value={props.vehicle}
        setValue={props.setVehicle}
        list={vehicleList}
        visible={showDropdown}
        showDropDown={() => setShowDropdown(true)}
        onDismiss={() => setShowDropdown(false)}
        inputProps={{ right: <TextInput.Icon name={Icons.unfoldList} /> }}
        /*
          height of dropdown can't be changed yet.
          fateh999 said on github 25/05/21 they would add that in next release.
          current release was 1.0.2
        */
      />
    </View>
  );
};
