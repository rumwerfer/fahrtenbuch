import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux/Store';
import Colors from './res/Colors';
import Strings from './res/Strings';
import HomeScreen from './screens/HomeScreen';
import MileageScreen from './screens/MileageScreen';
import DetailsScreen from './screens/DetailsScreen';
import LoadingScreen from './screens/LoadingScreen';

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
            <Stack.Screen name='home' component={HomeScreen} />
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
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
