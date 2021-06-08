import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import JourneyDate from '../atoms/Date';
import Distance from '../atoms/Distance';
import { journeyListItem, centerX, fillColumn, centerXY} from '../styles/Styles';
import Fonts from '../styles/Fonts';
import Strings from '../res/Strings';
import Constants from '../res/Constants';
import { mapStateToProps } from '../redux/Mappers';
import weather from '../res/weather';

const Journey = (props) => {
  const textColor = useTheme().colors.text;

  const vehicle = props.vehicles.vehicles.find(
    (vehicle) => vehicle.id === props.journey.vehicleID
  );

  const tutor = props.tutors.tutors.find(
    (tutor) => tutor.id === props.journey.tutorID
  );

  const shortenedRoute =
    props.journey.route.length < Constants.routeDisplayMaxLength + 1
    ? props.journey.route
    : props.journey.route.substring(0,Constants.routeDisplayMaxLength) + '…';

  const weatherIcon = weather[props.journey.weather].icon;

  return (
    <View style={journeyListItem}>
      <View style={{ flex: .1}}>
        <View style={{...fillColumn, ...centerXY}}>
          <IconButton size={24} icon={weatherIcon} />
        </View>
      </View>
      <View style={{ flex: .6 }}>
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
      <Distance journey={props.journey} flex={.3} />
    </View>
  );
}

export default connect(mapStateToProps)(Journey);
