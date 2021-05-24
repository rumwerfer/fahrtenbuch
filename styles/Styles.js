import { StyleSheet } from 'react-native';

import Fonts from './Fonts';
import Colors from '../res/Colors';

const horizontalPadding = {
  paddingHorizontal: 48,
};

export const fillSpace = {
  flex: 1,
};

export const fillColumn = {
  ...fillSpace,
  flexDirection: 'column',
}

export const distanceStyle = {
  ...Fonts.large,
  alignSelf: 'flex-end',
};

export const distanceWhite = {
  ...distanceStyle,
  ...Fonts.white,
};

export const journeyStyle = {
  ...horizontalPadding,
  flex: 1,
  height: 60,
  flexDirection: 'row',
};

export const dateStyle = {
  ...Fonts.small,
  marginTop: (Fonts.large.fontSize - Fonts.small.fontSize) / 2,
  // to align different font sizes to their center
};

export const centerXY = {
  alignItems: 'center',
  justifyContent: 'center'
};

export const summaryStyle = {
  ...horizontalPadding,
  paddingVertical: 32,
};

export const journeyButton = {
  marginTop: -50,
  marginRight: -10,
  marginBottom: 10,
  alignSelf: 'flex-end',
};

export const formRow = {
  marginTop: 30,
  flexDirection: 'row',
};
