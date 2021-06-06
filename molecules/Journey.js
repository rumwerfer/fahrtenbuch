import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { connect } from 'react-redux';

import JourneyDate from '../atoms/Date';
import Distance from '../atoms/Distance';
import { journeyListItem, centerX } from '../styles/Styles';
import Fonts from '../styles/Fonts';
import Strings from '../res/Strings';
import { mapStateToProps } from '../redux/Mappers';

const Journey = (props) => {
  const textColor = useTheme().colors.text;

  const vehicle = props.vehicles.vehicles.find(
    (vehicle) => vehicle.id === props.journey.vehicleID
  );

  const tutor = props.tutors.tutors.find(
    (tutor) => tutor.id === props.journey.tutorID
  );

  const shortenedRoute =
    props.journey.route.length < 20
    ? props.journey.route
    : props.journey.route.substring(0,21) + '…';

  return (
    <View style={journeyListItem}>
      <View style={{ flex: .65 }}>
        <View style={{ justifyContent: 'space-between'}}>
          <JourneyDate time={props.journey.startTime}/>
          <View style={centerX}>
            <Text style={Fonts.tiny}>{shortenedRoute}</Text>
            <Text style={Fonts.tiny}>
              {vehicle.name + Strings.delimiter + tutor.nickName}
            </Text>
          </View>
        </View>
      </View>
      <Distance journey={props.journey} flex={.35} />
    </View>
  );
}

export default connect(mapStateToProps)(Journey);
