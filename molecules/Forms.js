import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import * as JourneyActions from '../redux/JourneyActions';
import Button from '../atoms/Button';
import { TextInput } from '../atoms/Inputs';
import {
  paddedScreen,
  alignSelfEnd,
  fillHalf,
  fillThird,
  spreadVertically,
} from '../styles/Styles';

export function TwoTextForm(props) {

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  return (
    <SafeAreaView style={{ ...paddedScreen, ...backgroundColor }}>
      <View style={{ ...fillHalf, ...spreadVertically }}>
        <TextInput
          label={props.label1}
          text={props.value1}
          setText={props.setValue1}
        />
        <TextInput
          label={props.label2}
          text={props.value2}
          setText={props.setValue2}
        />
        <View style={alignSelfEnd} >
          <Button
            icon={props.buttonIcon}
            onPress={props.onButtonPress}
            label={props.buttonLabel}
            singlePress
          />
        </View>
      </View>
    </SafeAreaView>
  );

}
