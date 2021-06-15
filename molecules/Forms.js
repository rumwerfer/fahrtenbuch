import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme, Text, IconButton } from 'react-native-paper';

import * as JourneyActions from '../redux/JourneyActions';
import Button from '../atoms/Button';
import DateMileageRow from '../atoms/DateMileageRow';
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
  distanceStyle,
  fillRow,
  centerXY,
  centerY,
  column,
  fillSpace,
} from '../styles/Styles';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import Fonts from '../styles/Fonts';
import Colors from '../res/Colors';

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
          />
        </View>
      </View>
    </View>
  );
}

export function DetailsForm(props) {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };
  const placeholderColor = { color: themeColors.placeholder };

  return ( // TODO manage tap handling behavior for scroll view
    <ScrollView style={{ ...mediumPaddedScreen, ...backgroundColor }}>

      {/* journey start */}
      <Text style={{ ...Fonts.tiny, ...placeholderColor}}>
        {'Fahrtbeginn'}
      </Text>
      <DateMileageRow
        time={props.startTime}
        setTime={props.setStartTime}
        mileage={props.startMileage}
        setMileage={props.setStartMileage}
      />

      {/* journey end */}
      <Text style={{ ...Fonts.tiny, ...placeholderColor}}>
        {'Fahrtende'}
      </Text>
      <DateMileageRow
        time={props.endTime}
        setTime={props.setEndTime}
        mileage={props.endMileage}
        setMileage={props.setEndMileage}
      />

      {/* TODO: validate start time < end time */}

      {/* route */}
      <TextInput
        label={Strings.route}
        text={props.route}
        setText={props.setRoute}
      />

      <View style={row}>
        <View style={{ marginRight: 6, flexGrow: 1 }}>
          <Dropdown type={'vehicle'} id={props.vehicleID} setID={props.setVehicleID}/>
        </View>
        <View style={{ marginLeft: 6, flexGrow: 1 }}>
          <Dropdown type={'tutor'} id={props.tutorID} setID={props.setTutorID} />
        </View>
      </View>

      <View style={{...row, height: 80 }}>
        <View style={{ width: 110 }}>
          <Dropdown type={'weather'} id={props.weather} setID={props.setWeather} />
        </View>

        {/* distance */}
        <View style={{ ...column, ...centerY, paddingLeft: 24, paddingTop: 30 }}>
          <Text style={{ ...Fonts.tiny, ...placeholderColor }}>
            {Strings.distance}
          </Text>
          <Text style={{ ...Fonts.smaller, alignSelf: 'center', marginBottom: 24 }}>
            {props.endMileage - props.startMileage + Strings.km}
          </Text>
        </View>

        <View style={{ paddingTop: 22, marginLeft: 'auto' }} >
          <Button
            icon={Icons.save}
            onPress={props.onButtonPress}
            label={Strings.saveJourney}
          />
        </View>
      </View>

    </ScrollView>
  );
}
