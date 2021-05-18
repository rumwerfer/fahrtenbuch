import React, { Component } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import Strings from '../res/Strings';
import Colors from '../res/Colors';

function Button(props) {
  return (
    <PaperButton
      onPress={props.onPress}
      icon={props.icon}
      loading={props.loading}
      mode='contained'
      compact={true}
      color={Colors.green}
      style={{borderRadius: 25, width: 70}}
      labelStyle={{fontSize: 30}}
      accessibilityLabel={props.label}
    />
  );
}

export default Button;
