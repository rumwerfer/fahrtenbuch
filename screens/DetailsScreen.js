import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import * as JourneyActions from '../redux/JourneyActions';
import Button from '../atoms/Button';
import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Colors from '../res/Colors';

function DetailsScreen(props) {
  const navigation = useNavigation();
  const themeColors = useTheme().colors;
  const [route, setRoute] = React.useState('');
  const [weather, setWeather] = React.useState('');
  return (
    <SafeAreaView style={{
      backgroundColor: themeColors.screenBackground,
      flex: 1,
      padding: 40
    }}>
      <View style={styles.detailsForm}>
        <TextInput label={Strings.route} text={route} setText={setRoute} />
        <TextInput label={Strings.weather} text={weather} setText={setWeather} />
        <View style={{alignSelf: 'flex-end'}}>
          <Button
            icon='content-save'
            onPress={() => {
              props.saveJourney({route: route, weather: weather});
              navigation.navigate('Home', {enRoute: false});
            }}
            label={Strings.saveJourney}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  detailsForm: {
    flex: 0.5,
    justifyContent: 'space-between'
  },
});

const mapStateToProps = (state) => {
  const { journeys } = state;
  return { journeys };
};

const mapDispatchToProps = dispatch => ({
  saveJourney: (payload) => dispatch(JourneyActions.saveJourney(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
