import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import Colors from '../res/Colors';
import Strings from '../res/Strings';

export const TextInput = (props) => {
  const [text, setText] = React.useState('');
  return (
    <PaperTextInput
      label={props.label}
      multiline={true}
      value={text}
      onChangeText={text => setText(text)}
      style={{height: 56}}
    />
  );
}

export const MileageInput = () => {
  const [mileage, setMileage] = React.useState('');
  return (
    <PaperTextInput
      label={Strings.mileage}
      value={mileage}
      onChangeText={mileage => setMileage(mileage)}
      keyboardType='numeric'
      autoCompleteType='off'
      autoCorrect={false}
      style={{textAlign: 'right', height: 56}}
    />
  );
}
