import { StyleSheet } from 'react-native';

import Colors from '../res/Colors';

export default StyleSheet.create({
  tiny: {
    fontSize: 12,
    fontWeight: '200',
  },
  smaller: {
    fontSize: 16,
    fontWeight: '300',
  },
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
  green: {
    color: Colors.green,
  },
  lightgreen: {
    color: Colors.lightgreen,
  },
  center: {
    textAlign: 'center',
  },
  rightAlign: {
    textAlign: 'right',
  },
  tinyCenterWhite: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14,
    fontWeight: '200',
  }
});
