/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type {Node} from 'react';
import Colors from './Colors';
import HomeScreen from './screens/HomeScreen.js';
import CameraScreen from './screens/CameraScreen.js';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Fahrtenbuch',
            headerStyle: {
              backgroundColor: Colors.green,
            },
            headerTintColor: Colors.white,
          }}
        />
        <Stack.Screen
          name='Camera'
          component={CameraScreen}
          options={{
            title: 'Fahrt beginnen',
            headerStyle: {
              backgroundColor: Colors.green,
            },
            headerTintColor: Colors.white,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
