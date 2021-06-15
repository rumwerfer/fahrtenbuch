import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, Text, IconButton } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

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
  fillRow,
  centerXY,
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

  const dateFormat = {day: 'numeric', month: 'long', year: 'numeric'};

  const [startDateOpen, setStartDateOpen] = React.useState(false);
  const [startTimeOpen, setStartTimeOpen] = React.useState(false);

  const startDate = new Date(props.startTime);

  return ( // TODO manage tap handling behavior for scroll view
    <ScrollView style={{ ...mediumPaddedScreen, ...backgroundColor }}>

      {/* distance */}
      <Text style={{ ...Fonts.large, alignSelf: 'center', marginBottom: 24 }}>
        {props.endMileage - props.startMileage + Strings.km}
      </Text>

      {/* journey start */}
      <View style={{ ...row, marginBottom: 24 }}>
        {/* date */}
        <View style={{ ...row, flex: .45, paddingRight: 12, ...centerXY }}>
          <View style={{flex: .6}}>
            <Text style={Fonts.center}>
              {startDate.toLocaleDateString(undefined, dateFormat)}
            </Text>
          </View>
          <View style={{flex: .4}}>
            <IconButton
              onPress={() => setStartDateOpen(true)}
              icon={Icons.calendar}
              color={Colors.green}
            />
          </View>
          <DatePickerModal
            mode='single'
            visible={startDateOpen}
            onDismiss={() => setStartDateOpen(false)}
            date={startDate}
            onConfirm={React.useCallback(params => {
              setStartDateOpen(false);
              props.setStartTime(
                dateToMs(params.date) + getDayTime(props.startTime)
              );
            })}
          />
        </View>
        {/* time */}
        <View style={{ ...row, flex: .15, paddingHorizontal: 12, ...centerXY }}>
            <Text style={Fonts.center}>
              {getTimeString(startDate)}
            </Text>
          <IconButton
            onPress={() => setStartTimeOpen(true)}
            icon={Icons.clock}
            color={Colors.green}
          />
          <TimePickerModal
            visible={startTimeOpen}
            onDismiss={() => setStartTimeOpen(false)}
            onConfirm={({hours, minutes}) => {
              setStartTimeOpen(false);
              props.setStartTime(
                dateToMs(startDate) + timeToMs(hours, minutes)
              );
            }}
            hours={startDate.getHours()}
            minutes={startDate.getMinutes()}
            label={'Fahrtbeginn'}
            cancelLabel={Strings.cancel}
            confirmLabel={Strings.ok}
          />
        </View>
        {/* mileage */}
        <View style={{ ...fillRow, flex: .4, marginLeft: 12 }}>
          {/* TODO do not alter width */}
          <MileageInput
            mileage={props.startMileage}
            setMileage={props.setStartMileage}
            label={'km Start'}
          />
        </View>
      </View>

      {/* journey end */}
      <View style={{ ...row, marginBottom: 24 }}>
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
        />
      </View>

    </ScrollView>
  );
}

function dateToMs(date) {
  return Math.ceil(date.getTime() / 86400000) * 86400000; // 24*60*60*1000
}

function getDayTime(time) {
  return time % 86400000; // 24*60*60*1000
}

function getTimeString(date) {
  const minutes = date.getMinutes();
  return date.getHours() + ':' + (minutes < 10 ? '0' : '') + minutes;
}

function timeToMs(hours, minutes) { // negative value to keep date unchanged
  return (hours * 60 + minutes) * 60000 - 86400000 - 7200000;
} // dirty hack for now: -7200000 for CEST, -3600000 for CET
// TODO make it work properly for winter and summer time
