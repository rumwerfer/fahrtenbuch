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

export const absolutePosition = {
  position: 'absolute',
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

export const distanceStyle = {
  ...Fonts.large,
  alignSelf: 'flex-end',
};

export const distanceWhite = {
  ...distanceStyle,
  ...Fonts.white,
};

export const row = {
  flexDirection: 'row',
};

export const column = {
  flexDirection: 'column',
};

export const fillColumn = {
  ...fillSpace,
  ...column,
};

export const listItem = {
  ...horizontalPadding,
  ...fillSpace,
};

export const journeyListItem = {
  ...listItem,
  ...row,
  height: 60,
};

export const vehicleListItem = {
  ...listItem,
  ...column,
  height: 80,
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

export const buttonContainer = {
  alignSelf: 'flex-end',
};

export const journeyButtonContainer = {
  ...buttonContainer,
  marginTop: -50,
  marginRight: -10,
  marginBottom: 10,
};

export const vehicleButtonContainer = {
  ...buttonContainer,
  ...absolutePosition,
  bottom: pad,
  right: pad,
}

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

export const form = {
  ...fillHalf,
  ...spreadVertically,
};

export const buttonStyle = {
  borderRadius: 25,
  width: 70,
  height: 45
};

export const journeyListPadding = {
  paddingTop: 10,
  paddingBottom: 20,
};

export const vehicleListPadding = {
  paddingTop: 20,
  paddingBottom: 40,
};
