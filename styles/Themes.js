import { DefaultTheme } from 'react-native-paper';
import Colors from '../res/Colors';

export const DarkTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.green,
    background: Colors.gray,
    screenBackground: Colors.black,
    text: Colors.white,
    placeholder: Colors.lightgreen,
    summary: Colors.darkblack,
  }
};

export const LightTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.green,
    background: Colors.white,
    text: Colors.black,
    placeholder: Colors.lightgreen,
    screenBackground: Colors.white,
    summary: Colors.black,
  }
};
