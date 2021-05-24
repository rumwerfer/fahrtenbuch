import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import { scanFrame } from '../atoms/scanFrame';
import { MileageInput } from '../atoms/Inputs';
import Button from '../atoms/Button';
import Strings from '../res/Strings';
import { formRow, centerXY } from '../styles/Styles';

export default JourneyForm = (props) => {
  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const navigation = useNavigation();
  const backgroundColor = useTheme().colors.screenBackground;
  const screenBackground = { backgroundColor: backgroundColor };
  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='never'>
    {/* wrapping TextInput in ScrollView for correct keyboard behavior */}
      <View style={{...formRow, flex: scanFrame.relHeight}}>
        <View style={{...screenBackground, flex: scanFrame.relOffsetX }} />
        <View style={{ flex: scanFrame.relWidth }}>
          <MileageInput mileage={props.mileage} setMileage={props.setMileage}/>
        </View>
        <View style={{...screenBackground, ...centerXY, flex: remainsX }}>
          <Button
            icon='check'
            onPress={() => {
              if (props.mileage) {
                const payload = {time: Date.now(), mileage: props.mileage};
                if (!props.isEndMileage) {
                  props.startJourney(payload);
                  navigation.navigate('Home');
                } else {
                  props.finishJourney(payload);
                  navigation.navigate('Details');
                }

              } else { // mileage is undefined
                Toast.show(Strings.enterMileageMessage);
              }
            }}
            label={Strings.confirm}
          />
        </View>
      </View>
      <ImagePreview imageUri={props.imageUri} />
    </ScrollView>
  );
}

// for debugging only
function ImagePreview ({imageUri}) {
  if (!imageUri) {
    return <View />;
  }
  return (
    <Image
      source={{ uri: imageUri }}
      style={{height: 200, resizeMode: 'contain', marginTop: 30}}
    />
  );
}
