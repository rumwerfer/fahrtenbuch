import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

import Colors from '../res/Colors';
import Fonts from '../styles/Fonts';
import { buttonStyle } from '../styles/Styles';

function Button(props) {
  const [disabled, setDisabled] = React.useState('');
  return (
    <PaperButton
      onPress={() => { setDisabled(true); props.onPress() }}
      icon={props.icon}
      loading={props.loading}
      mode='contained'
      compact={true}
      color={Colors.green}
      style={buttonStyle}
      labelStyle={Fonts.xlarge}
      accessibilityLabel={props.label}
      disabled={props.singlePress ? disabled : false}
    />
  );
}

export default Button;
