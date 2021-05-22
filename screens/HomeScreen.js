import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import JourneyDate from '../atoms/Date';
import Button from '../atoms/Button';
import Strings from '../res/Strings';
import Colors from '../res/Colors';

const Journey = ({journey}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{flex: 1, paddingHorizontal: 48, height: 60, flexDirection: 'row'}}>
      <JourneyDate time={journey.startTime} flex={.65} />
      <View style={{flex: .35, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={[
            styles.mileage,
            { color : isDarkMode ? Colors.white : Colors.black, }
          ]}>
          {journey.endMileage - journey.startMileage + ' km'}
        </Text>
      </View>
    </View>
  );
}

const JourneyList = (props) => {
  return (
    <View>
      {props.journeys.saved.map(journey =>
        <Journey journey={journey} key={journey.startTime} />
      )}
    </View>
  );
}

const HomeScreen = (props) => {
  console.log(props.journeys);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.gray : Colors.white,
  };

  return (
    <SafeAreaView style={styles.mainScreen}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.green}
      />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.gray : Colors.white,
          }}>
          <JourneyList journeys={props.journeys} />
        </View>
      </ScrollView>
      <View style={styles.summary}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => props.navigation.navigate('Camera')}
            icon={props.journeys.ongoing ? 'flag-checkered' : 'car'}
            label={
              props.journeys.ongoing
              ? Strings.finishJourney
              : Strings.startJourney
            }
          />
        </View>
        <Text style={[styles.mileage, {color : Colors.white}]}>
          {props.journeys.saved.reduce((mileageSum, journey) =>
            mileageSum + (journey.endMileage - journey.startMileage), 0)
            + ' km'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
  listContainer: {
    marginTop: 32,
    paddingLeft: 24,
    paddingRight: 48,
    flexDirection: 'row',
  },
  summary: {
    paddingVertical: 32,
    backgroundColor: Colors.black,
    paddingHorizontal: 48,
  },
  mileage: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    marginTop: -50,
    marginRight: -10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  highlight: {
    fontWeight: '700',
  },
});

const mapStateToProps = (state) => {
  const { journeys } = state;
  return { journeys };
}

export default connect(mapStateToProps)(HomeScreen);
