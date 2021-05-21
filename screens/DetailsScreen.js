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
  return (
    <SafeAreaView style={{
      backgroundColor: themeColors.screenBackground,
      flex: 1,
      padding: 40
    }}>
      <View style={styles.detailsForm}>
        <TextInput label={Strings.route} />
        <TextInput label={Strings.weather}/>
        <View style={{alignSelf: 'flex-end'}}>
          <Button
            icon='content-save'
            onPress={() => {
              props.saveJourney();
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
  saveJourney: () => dispatch(JourneyActions.saveJourney()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
