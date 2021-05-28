import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Dropdown from 'react-native-paper-dropdown';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { inputHeight } from '../styles/Styles';
import { mapStateToProps } from '../redux/Mappers';

function VehicleDropdown(props) {

  if (props.ongoingJourney) {
    return <View />;
  }

  const [showDropdown, setShowDropdown] = useState(true);

  const vehicleList = props.vehicles.vehicles.map( vehicle => {
    console.log({name: vehicle.name, mileage: vehicle.mileage });
    return { label: vehicle.name, value: vehicle.id };
  });

  useEffect(() => {
    props.setVehicleID(preselectVehicle(props.journeys, props.vehicles));
  }, []); // only run on componentDidMount

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

function preselectVehicle(journeys, vehicles) {

  /*
  assert: at least one vehicle exists
  (otherwise VehicleScreen is opened instead)
  TODO
  */

  // 1. vehicle with nearest mileage (same or less)
  // TODO

  // TODO: preselectVehicle sollte auch nach dem foto machen nochmal passieren

  // 2. last used vehicle
  if (journeys.saved && journeys.saved.length !== 0) {
    return journeys.saved[journeys.saved.length - 1].vehicleID;
  }

  // 3. last added vehicle
  return vehicles.vehicles[vehicles.vehicles.length - 1].id;
}

export default connect(mapStateToProps)(VehicleDropdown);
