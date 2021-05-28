import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from 'react-native-paper-dropdown';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { inputHeight } from '../styles/Styles';
import { mapVehiclesToProps, mapJourneysToProps } from '../redux/Mappers';

function VehicleDropdown(props) {

  if (props.ongoingJourney) {
    return <View />;
  }

  const [showDropdown, setShowDropdown] = useState(true);

  const vehicleList = props.vehicles.vehicles.map( vehicle => {
    return { label: vehicle.name, value: vehicle.id };
  });

  return (
    <View style={props.containerStyle} >
      <Dropdown
        label={Strings.vehicle}
        value={props.vehicleID}
        setValue={props.setVehicleID}
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

export default connect(mapVehiclesToProps, mapJourneysToProps)(VehicleDropdown);
