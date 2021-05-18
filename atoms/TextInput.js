import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import Colors from '../res/Colors';

function TextInput(props) {
  const [text, setText] = React.useState('');

  return (
    <PaperTextInput
      label={props.label}
      multiline={true}
      value={text}
      onChangeText={text => setText(text)}
    />
  );
}

export default TextInput;
