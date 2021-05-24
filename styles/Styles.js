import { StyleSheet } from 'react-native';

import Fonts from './Fonts';
import Colors from '../res/Colors';

const pad = 48;

const horizontalPadding = {
  paddingHorizontal: pad,
};

const padding = {
  padding: pad,
}

export const fillSpace = {
  flex: 1,
};

export const fillHalf = {
  flex: .5,
};


export const paddedScreen = {
  ...fillSpace,
  ...padding,
}

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

export const button = {
  alignSelf: 'flex-end',
};

export const journeyButton = {
  ...button,
  marginTop: -50,
  marginRight: -10,
  marginBottom: 10,
};

export const formRow = {
  marginTop: 30,
  flexDirection: 'row',
};

export const fullWidth = {
  width: '100%',
};

export const greenBorder = {
  borderWidth: 2,
  borderColor: Colors.green,
}

export const spreadVertically = {
  justifyContent: 'space-between',
};

export const detailsForm = {
  ...fillHalf,
  ...spreadVertically,
}
