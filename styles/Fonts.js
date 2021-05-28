import { StyleSheet } from 'react-native';

import Colors from '../res/Colors';

export default StyleSheet.create({
  small: {
    fontSize: 18,
    fontWeight: '400',
  },
  large: {
    fontSize: 24,
    fontWeight: '600',
  },
  xlarge: {
    fontSize: 30,
    fontWeight: '800',
  },
  white: {
    color: Colors.white,
  },
  rightAlign: {
    textAlign: 'right',
  }
});
