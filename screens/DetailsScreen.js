import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import * as JourneyActions from '../redux/JourneyActions';
import Button from '../atoms/Button';
import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Colors from '../res/Colors';
import Icons from '../res/Icons';
import { fillSpace, paddedScreen, button, form } from '../styles/Styles';
import { mapJourneysToProps } from '../redux/Mappers';
import { TwoTextForm } from '../molecules/Forms';

function DetailsScreen(props) {

  const navigation = useNavigation();

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const [route, setRoute] = React.useState('');
  const [weather, setWeather] = React.useState('');

  return (
    <TwoTextForm
      label1={Strings.route}
      value1={route}
      setValue1={setRoute}
      label2={Strings.weather}
      value2={weather}
      setValue2={setWeather}
      buttonIcon={Icons.save}
      onButtonPress={() => {
        props.saveJourney({route: route, weather: weather});
        navigation.navigate('home');
      }}
      buttonLabel={Strings.saveJourney}
    />
  );

}

const mapDispatchToProps = dispatch => ({
  saveJourney: (payload) => dispatch(JourneyActions.saveJourney(payload)),
});

export default connect(mapJourneysToProps, mapDispatchToProps)(DetailsScreen);
