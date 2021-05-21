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

import Button from '../atoms/Button';
import Strings from '../res/Strings';
import Colors from '../res/Colors';

const Journey = ({date, mileage}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.listContainer}>
      <View style={{ flex: 2, }}>
        <Text
          style={[
            styles.date,
            { color : isDarkMode ? Colors.white : Colors.black, }
          ]}>
          {date}
        </Text>
      </View>
      <View style={{ flex: 1, }}>
        <Text
          style={[
            styles.mileage,
            { color : isDarkMode ? Colors.white : Colors.black, }
          ]}>
          {mileage + ' km'}
        </Text>
      </View>
    </View>
  );
}

const JourneyList = (props) => {
  return (
    <View>
      {props.journeys.saved.map(journey => <Journey date='21. Mai 2021' mileage={journey.endMileage - journey.startMileage} key={journey} />)}
      <Journey date='5. Dezember 2020' mileage='123' />
      <Journey date='24. Mai 2021' mileage='84' />
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
            onPress={() => props.navigation.navigate(
              'Camera',
              {isEndMileage: props.route.params?.enRoute}
            )}
            icon={props.route.params?.enRoute ? 'flag-checkered' : 'car'}
            label={
              props.route.params?.enRoute
              ? Strings.finishJourney
              : Strings.startJourney
            }
          />
        </View>
        <Text style={[styles.mileage, {color : Colors.white}]}>
          {/* {props.journeys.finished.length} Fahrten, */}
          {props.journeys.ongoing ? 'unterwegs (' : 'daheim ('}
          {props.journeys.saved.length}
          ), 207 km
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
  date: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'center',
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
