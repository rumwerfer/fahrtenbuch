import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { IconButton } from 'react-native-paper';

import configureStore from './redux/Store';
import Colors from './res/Colors';
import Strings from './res/Strings';
import HomeScreen from './screens/HomeScreen';
import MileageScreen from './screens/MileageScreen';
import DetailsScreen from './screens/DetailsScreen';
import LoadingScreen from './screens/LoadingScreen';
import FleetScreen from './screens/FleetScreen';
import VehicleScreen from './screens/VehicleScreen';

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
                  <IconButton
                    onPress={() => navigation.navigate('fleet')}
                    icon='car-multiple'
                    color={Colors.white}
                  />
              })}
            />
            <Stack.Screen
              name='mileage'
              component={MileageScreen}
              options={({route}) => ({
                title: route.params?.start
                ? Strings.startJourney
                : Strings.finishJourney
              })}
            />
            <Stack.Screen
              name='details'
              component={DetailsScreen}
              options={{title: Strings.enterDetails}}
            />
            <Stack.Screen
              name='fleet'
              component={FleetScreen}
              options={{title: Strings.editVehicles}}
            />
            <Stack.Screen
              name='vehicle'
              component={VehicleScreen}
              options={{title: Strings.addVehicle}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
