import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import configureStore from './redux/Store';
import Colors from './res/Colors';
import Strings from './res/Strings';
import HomeScreen from './screens/HomeScreen';
import JourneyScreen from './screens/JourneyScreen';
import LoadingScreen from './screens/LoadingScreen';
import FleetScreen from './screens/FleetScreen';
import VehicleScreen from './screens/VehicleScreen';
import PeopleScreen from './screens/PeopleScreen';
import TutorScreen from './screens/TutorScreen';
import Icons from './res/Icons';
import { row } from './styles/Styles';
import ReportButton from './atoms/ReportButton';

const Stack = createStackNavigator();
const { store, persistor } = configureStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.green,
              },
              headerTintColor: Colors.white,
              title: Strings.appName,
            }}
          >
            <Stack.Screen name='home' component={HomeScreen}
              options={ ({navigation}) => ({
                headerRight: () =>
                  <View style={row}>
                    <ReportButton />
                    <IconButton
                      onPress={() => navigation.navigate('people')}
                      icon={Icons.people}
                      color={Colors.white}
                    />
                    <IconButton
                      onPress={() => navigation.navigate('fleet')}
                      icon={Icons.fleet}
                      color={Colors.white}
                    />
                  </View>
              })}
            />
            <Stack.Screen
              name='journey'
              component={JourneyScreen}
              options={({route}) => ({
                title: route.params?.start
                ? Strings.startJourney
                : Strings.finishJourney
              })}
            />
            <Stack.Screen
              name='fleet'
              component={FleetScreen}
              options={{title: Strings.manageVehicles}}
            />
            <Stack.Screen
              name='vehicle'
              component={VehicleScreen}
              options={{title: Strings.addVehicle}}
            />
            <Stack.Screen
              name='people'
              component={PeopleScreen}
              options={{title: Strings.manageTutors}}
            />
            <Stack.Screen
              name='tutor'
              component={TutorScreen}
              options={({route}) => ({
                title: route.params?.id !== undefined
                        ? Strings.editTutor
                        : Strings.addTutor
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
