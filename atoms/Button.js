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
        loading={this.props.loading}
        mode='contained'
        compact={true}
        color={Colors.green}
        style={{borderRadius: 25}}
        contentStyle={{height: 50, width: 70}}
        labelStyle={{fontSize: 30}}
        accessibilityLabel={this.props.label}
      />
    );
  }
}

export default Button;
