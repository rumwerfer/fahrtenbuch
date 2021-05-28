import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView, View, Image, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';

import { scanFrame } from '../atoms/scanFrame';
import { MileageInput } from '../atoms/Inputs';
import Button from '../atoms/Button';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { formRow, mileageButtonContainer, formPadding } from '../styles/Styles';
import VehicleDropdown from '../atoms/VehicleDropdown';

export default JourneyForm = (props) => {
  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const navigation = useNavigation();
  const backgroundColor = useTheme().colors.screenBackground;
  const screenBackground = { backgroundColor: backgroundColor };
  const [vehicleID, setVehicleID] = useState();

  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='never'>
    {/* wrapping TextInput in ScrollView for correct keyboard behavior */}
      <View style={{...formRow, flex: scanFrame.relHeight}}>

        {/* left padding */}
        <View style={{...screenBackground, flex: scanFrame.relOffsetX }} />

        {/* input fields */}
        <View style={{ flex: scanFrame.relWidth }}>
          <View style={formPadding}>
            <MileageInput mileage={props.mileage} setMileage={props.setMileage}/>
          </View>
          <VehicleDropdown
            vehicleID={vehicleID}
            setVehicleID={setVehicleID}
            ongoingJourney={props.ongoingJourney}
            containerStyle={formPadding}
          />
        </View>

        {/* button */}
        <View style={{
          ...screenBackground,
          ...mileageButtonContainer,
          flex: remainsX,
          marginBottom: props.ongoingJourney ? 6 : 10,
          // dirty hack: center button relative to mileage or vehicle input
        }}>
          <Button
            icon={Icons.confirm}
            onPress={() => {
              if (validateInput(props.mileage, props.ongoingJourney)) {
                let payload = {time: Date.now(), mileage: props.mileage};
                if (!props.ongoingJourney) {
                  payload = { ...payload, vehicleID: vehicleID };
                  props.startJourney(payload);
                  navigation.navigate('home');
                } else {
                  props.finishJourney(payload);
                  navigation.navigate('details');
                }
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

function validateInput(mileage, ongoingJourney) {

  // verify mileage
  if (!mileage) {
    Toast.show(Strings.enterMileageMessage);
    return false;
  }

  // verify distance
  if (ongoingJourney) {
    const distance = mileage - ongoingJourney.startMileage;
    if (distance <= 0) {
      Toast.show(Strings.negativeDistanceMessage);
      return false;
    }
    if (distance > 9999) {
      Toast.show(Strings.highDistanceMessage);
      return false;
    }
  }

  return true;
}
