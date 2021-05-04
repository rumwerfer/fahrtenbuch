import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from './res/Colors';
import Strings from './res/Strings';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
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
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen
          name='Camera'
          component={CameraScreen}
          options={{title: Strings.startJourney}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
