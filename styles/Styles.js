import { StyleSheet } from 'react-native';

import Fonts from './Fonts';

export const distanceStyle = {
  ...Fonts.large,
  alignSelf: 'flex-end',
};

export const distanceWhite = {
  ...distanceStyle,
  ...Fonts.white,
};

export const journeyStyle = {
  flex: 1,
  paddingHorizontal: 48,
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
