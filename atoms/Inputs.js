import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';

import Colors from '../res/Colors';
import Strings from '../res/Strings';
import { inputHeight, formPadding } from '../styles/Styles';
import Fonts from '../styles/Fonts';

export const TextInput = (props) => {
  return (
    <PaperTextInput
      label={props.label}
      multiline={true}
      value={props.text}
      onChangeText={props.setText}
      style={inputHeight}
    />
  );
}

export const MileageInput = (props) => {
  return (
    <PaperTextInput
      label={props.label ?? Strings.mileage}
      value={props.mileage}
      onChangeText={props.setMileage}
      onBlur={props.preselectVehicle}
      keyboardType='numeric'
      autoCompleteType='off'
      autoCorrect={false}
      style={{...inputHeight, ...Fonts.rightAlign}}
    />
  );
}
