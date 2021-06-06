import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView, View, Image, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import * as VehicleActions from '../redux/VehicleActions';
import { scanFrame } from '../atoms/scanFrame';
import { MileageInput, TextInput } from '../atoms/Inputs';
import Button from '../atoms/Button';
import Strings from '../res/Strings';
import Constants from '../res/Constants';
import Icons from '../res/Icons';
import { formRow, mileageButtonContainer, formPadding } from '../styles/Styles';
import Dropdown from '../atoms/Dropdown';
import { mapStateToProps } from '../redux/Mappers';

function JourneyForm(props) {
  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const navigation = useNavigation();
  const backgroundColor = useTheme().colors.screenBackground;
  const screenBackground = { backgroundColor: backgroundColor };

  const vehicleDropdown = (
    <Dropdown type={'vehicle'} id={props.vehicleID} setID={props.setVehicleID}/>
  );

  const tutorDropdown = (
    <Dropdown type={'tutor'} id={props.tutorID} setID={props.setTutorID} />
  );

  const weatherDropdown = (
    <Dropdown type={'weather'} id={props.weather} setID={props.setWeather} />
  );

  const routeInput = (
    <View style={formPadding}>
      <TextInput
        label={Strings.route}
        text={props.route}
        setText={props.setRoute}
      />
    </View>
  );

  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='never'>
    {/* wrapping TextInput in ScrollView for correct keyboard behavior */}
      <View style={{...formRow, flex: scanFrame.relHeight}}>

        {/* left padding */}
        <View style={{...screenBackground, flex: scanFrame.relOffsetX }} />

        {/* input fields */}
        <View style={{ flex: scanFrame.relWidth }}>
          <View style={formPadding}>
            <MileageInput
              mileage={props.mileage}
              setMileage={props.setMileage}
              preselectVehicle={props.preselectVehicle}
            />
          </View>
          {props.ongoingJourney ? null : vehicleDropdown}
          {props.ongoingJourney ? null : tutorDropdown}
          {props.ongoingJourney ? routeInput : null}
          {props.ongoingJourney ? weatherDropdown : null}
        </View>

        {/* button */}
        <View style={{
          ...screenBackground,
          ...mileageButtonContainer,
          flex: remainsX,
          marginBottom: 10,
        }}>
          <Button
            icon={Icons.confirm}
            onPress={() => {
              if (
                validateInput(
                  props.mileage,
                  props.ongoingJourney,
                  props.vehicleID,
                  props.vehicles.vehicles,
                  props.route
              )) {
                let payload = {
                  time: Date.now(),
                  mileage: parseInt(props.mileage),
                };

                if (!props.ongoingJourney) {
                  payload = {
                    ...payload,
                    vehicleID: props.vehicleID,
                    tutorID: props.tutorID,
                  };
                  props.startJourney(payload);

                } else {
                  payload = {
                    ...payload,
                    weather: props.weather,
                    route: props.route,
                  };
                  props.finishJourney(payload);
                  props.updateVehicle({
                    id: props.ongoingJourney.vehicleID,
                    newMileage: parseInt(props.mileage),
                  });
                }

                navigation.goBack();
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
  if (!Constants.debug || !imageUri) {
    return null;
  }
  return (
    <Image
      source={{ uri: imageUri }}
      style={{height: 200, resizeMode: 'contain', marginTop: 30}}
    />
  );
}


function validateInput(mileage, ongoingJourney, vehicleID, vehicles, route) {

  // validate mileage
  if (!mileage) {
    Toast.show(Strings.enterMileageMessage);
    return false;
  }
  if (!ongoingJourney) {
    const selectedVehicle = vehicles.find(vehicle => vehicleID === vehicle.id);
    if (selectedVehicle.mileage > mileage) {
      Toast.show(
        Strings.lowMileageMessage + selectedVehicle.name
        + ' (' + selectedVehicle.mileage + ')'
      );
      return false;
    }
  } else {

    // validate distance
    const distance = mileage - ongoingJourney.startMileage;
    if (distance <= 0) {
      Toast.show(Strings.negativeDistanceMessage);
      return false;
    }
    if (distance > 9999) {
      Toast.show(Strings.highDistanceMessage);
      return false;
    }

    // validate route
    if (isBlank(route)) {
      Toast.show(Strings.enterRouteMessage);
      return false;
    }
  }

  return true;
}

function isBlank(string) {
  return (!string || string.trim().length === 0)
}

const mapDispatchToProps = dispatch => ({
  updateVehicle: (payload) => dispatch(VehicleActions.updateVehicle(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JourneyForm);
