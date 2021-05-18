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

const JourneyList = () => {
  return (
    <View>
      <Journey date='5. Dezember 2020' mileage='123' />
      <Journey date='24. Mai 2021' mileage='84' />
    </View>
  );
}

const HomeScreen = ({navigation}) => {
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
          <JourneyList />
        </View>
      </ScrollView>
      <View style={styles.summary}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('Camera')}
            icon='car'
            label={Strings.startJourney}
          />
        </View>
        <Text style={[styles.mileage, {color : Colors.white}]}>
          207 km
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

export default HomeScreen;
