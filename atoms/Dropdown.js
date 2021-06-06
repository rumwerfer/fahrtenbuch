import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PaperDropdown from 'react-native-paper-dropdown';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { inputHeight, formPadding } from '../styles/Styles';
import { mapStateToProps } from '../redux/Mappers';
import weather from '../res/weather';

function Dropdown(props) {

  const [showDropdown, setShowDropdown] = useState(true);

  let list, label;
  if (props.type === 'vehicle') {
    list = props.vehicles.vehicles.map( vehicle => {
      return { label: vehicle.name, value: vehicle.id };
    });
    label = Strings.vehicle;
  } else if (props.type === 'tutor') {
    list = props.tutors.tutors.map( tutor => {
      return { label: tutor.nickName, value: tutor.id };
    });
    label = Strings.tutor;
  } else if (props.type === 'weather') {
    list = weather.map((element, index) => {
      return {label: element.label, value: index}
    });
    label = Strings.weather;
  }

  return (
    <View style={formPadding}>
      <PaperDropdown
        label={label}
        value={props.id}
        setValue={props.setID}
        list={list}
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

export default connect(mapStateToProps)(Dropdown);
