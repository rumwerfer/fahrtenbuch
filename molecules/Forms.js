import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import * as JourneyActions from '../redux/JourneyActions';
import Button from '../atoms/Button';
import { TextInput, MileageInput } from '../atoms/Inputs';
import Dropdown from '../atoms/Dropdown';
import {
  paddedScreen,
  mediumPaddedScreen,
  alignSelfEnd,
  fillHalf,
  spreadVertically,
  spreadHorizontally,
  row,
  formPadding,
  distanceStyle,
} from '../styles/Styles';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import Fonts from '../styles/Fonts';

export function TwoTextForm(props) {

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  return (
    <View style={{ ...paddedScreen, ...backgroundColor }}>
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
    </View>
  );
}

export function DetailsForm(props) {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  return ( // TODO manage tap handling behavior for scroll view
    <ScrollView style={{ ...mediumPaddedScreen, ...backgroundColor }}>
      <Text style={{ ...Fonts.large, alignSelf: 'center', marginBottom: 24 }}>
        {props.endMileage - props.startMileage + Strings.km}
      </Text>
      <View style={{ ...row, marginBottom: 24 }}>
        <View style={{ marginRight: 12, flexGrow: 1 }}>
          {/* TODO do not alter width */}
          <MileageInput
            mileage={props.startMileage}
            setMileage={props.setStartMileage}
            label={'km Start'}
          />
        </View>
        <View style={{ marginLeft: 12, flexGrow: 1 }}>
          <MileageInput
            mileage={props.endMileage}
            setMileage={props.setEndMileage}
            label={'km Ende'}
          />
        </View>
      </View>
      <TextInput
        label={Strings.route}
        text={props.route}
        setText={props.setRoute}
      />
      <View style={row}>
        <View style={{ marginRight: 12, flexGrow: 1 }}>
          <Dropdown type={'vehicle'} id={props.vehicleID} setID={props.setVehicleID}/>
        </View>
        <View style={{ marginLeft: 12, flexGrow: 1 }}>
          <Dropdown type={'tutor'} id={props.tutorID} setID={props.setTutorID} />
        </View>
      </View>
      <Dropdown type={'weather'} id={props.weather} setID={props.setWeather} />
      <View style={{ ...alignSelfEnd, marginTop: 24}}>
        <Button
          icon={Icons.save}
          onPress={props.onButtonPress}
          label={Strings.saveJourney}
          singlePress
        />
      </View>
    </ScrollView>
  );
}
