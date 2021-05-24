import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

import Colors from '../res/Colors';
import Fonts from '../styles/Fonts';
import { buttonStyle } from '../styles/Styles';

function Button(props) {
  return (
    <PaperButton
      onPress={props.onPress}
      icon={props.icon}
      loading={props.loading}
      mode='contained'
      compact={true}
      color={Colors.green}
      style={buttonStyle}
      labelStyle={Fonts.xlarge}
      accessibilityLabel={props.label}
    />
  );
}

export default Button;
