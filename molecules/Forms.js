import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import * as JourneyActions from '../redux/JourneyActions';
import Button from '../atoms/Button';
import { TextInput } from '../atoms/Inputs';
import { paddedScreen, buttonContainer, form } from '../styles/Styles';

export function TwoTextForm(props) {

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  return (
    <SafeAreaView style={{ ...paddedScreen, ...backgroundColor }}>
      <View style={ form } >
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
        <View style={ buttonContainer } >
          <Button
            icon={props.buttonIcon}
            onPress={props.onButtonPress}
            label={props.buttonLabel}
          />
        </View>
      </View>
    </SafeAreaView>
  );

}
