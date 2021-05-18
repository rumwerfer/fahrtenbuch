import React, { Component } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import Strings from '../res/Strings';
import Colors from '../res/Colors';

class Button extends Component {
  render() {
    return (
      <PaperButton
        onPress={this.props.onPress}
        icon={this.props.icon}
        mode='contained'
        compact={true}
        color={Colors.green}
        style={{borderRadius: 25}}
        contentStyle={{margin: -5}}
        labelStyle={{fontSize: 40}}
        accessibilityLabel={this.props.label}
      />
    );
  }
}

export default Button;
