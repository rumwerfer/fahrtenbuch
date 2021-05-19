/**
 * @format
 */

import * as React from 'react';
import { AppRegistry, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import { DarkTheme, LightTheme } from './styles/Themes';

export default function Main() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <PaperProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
