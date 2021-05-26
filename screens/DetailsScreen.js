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
import { fillSpace, paddedScreen, button, detailsForm } from '../styles/Styles';
import { mapJourneysToProps } from '../redux/Mappers';

function DetailsScreen(props) {

  const navigation = useNavigation();

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const [route, setRoute] = React.useState('');
  const [weather, setWeather] = React.useState('');

  return (
    <SafeAreaView style={{ ...backgroundColor, ...paddedScreen }}>
      <View style={ detailsForm } >
        <TextInput label={Strings.route} text={route} setText={setRoute} />
        <TextInput label={Strings.weather} text={weather} setText={setWeather} />
        <View style={ button } >
          <Button
            icon={Icons.saveJourney}
            onPress={() => {
              props.saveJourney({route: route, weather: weather});
              navigation.navigate('home');
            }}
            label={Strings.saveJourney}
          />
        </View>
      </View>
    </SafeAreaView>
  );

}

const mapDispatchToProps = dispatch => ({
  saveJourney: (payload) => dispatch(JourneyActions.saveJourney(payload)),
});

export default connect(mapJourneysToProps, mapDispatchToProps)(DetailsScreen);
