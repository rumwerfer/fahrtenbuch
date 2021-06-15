import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import { TextInput, MileageInput } from '../atoms/Inputs';
import { row, fillRow, centerXY } from '../styles/Styles';
import Fonts from '../styles/Fonts';
import Icons from '../res/Icons';
import Colors from '../res/Colors';
import Strings from '../res/Strings';

export default function DateMileageRow(props) {

  const dateFormat = { day: 'numeric', month: 'long', year: 'numeric' };

  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [timePickerOpen, setTimePickerOpen] = React.useState(false);

  const date = new Date(props.time);

  return (
    <View style={{ ...row, marginBottom: 12 }}>

      {/* date */}
      <View style={{ ...row, flex: .43, paddingRight: 12, ...centerXY }}>
        <View style={{flex: .6}}>
          <Text style={{ ...Fonts.center, ...Fonts.smaller }}>
            {date.toLocaleDateString(undefined, dateFormat)}
          </Text>
        </View>
        <View style={{flex: .4}}>
          <IconButton
            onPress={() => setDatePickerOpen(true)}
            icon={Icons.calendar}
            color={Colors.green}
          />
        </View>
        <DatePickerModal
          mode='single'
          visible={datePickerOpen}
          onDismiss={() => setDatePickerOpen(false)}
          date={date}
          onConfirm={React.useCallback(params => {
            setDatePickerOpen(false);
            props.setTime(
              dateToMs(params.date) + getDayTime(props.time)
            );
          })}
          validRange={{ endDate: new Date() }}
        />
      </View>

      {/* time */}
      <View style={{ ...row, flex: .17, paddingHorizontal: 12, ...centerXY }}>
          <Text style={{ ...Fonts.center, ...Fonts.smaller }}>
            {getTimeString(date)}
          </Text>
        <IconButton
          onPress={() => setTimePickerOpen(true)}
          icon={Icons.clock}
          color={Colors.green}
        />
        <TimePickerModal
          visible={timePickerOpen}
          onDismiss={() => setTimePickerOpen(false)}
          onConfirm={({hours, minutes}) => {
            setTimePickerOpen(false);
            props.setTime(
              dateToMs(date) + timeToMs(hours, minutes)
            );
          }}
          hours={date.getHours()}
          minutes={date.getMinutes()}
          label={'Fahrtbeginn'}
          cancelLabel={Strings.cancel}
          confirmLabel={Strings.ok}
        />
      </View>

      {/* mileage */}
      <View style={{ ...fillRow, flex: .4, marginLeft: 12 }}>
        {/* TODO do not alter width */}
        <MileageInput
          mileage={props.mileage}
          setMileage={props.setMileage}
          label={Strings.mileageAbbr}
        />
      </View>

    </View>
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
