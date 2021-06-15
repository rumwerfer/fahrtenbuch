import { StyleSheet } from 'react-native';

import Fonts from './Fonts';
import Colors from '../res/Colors';

const pad = 48;
const height = 56;

export const horizontalPadding = {
  paddingHorizontal: pad,
};

const padding = {
  padding: pad,
};

export const smallVerticalPadding = {
  paddingVertical: pad / 4,
};

export const smallPadding = {
  padding: pad / 4,
}

export const absolutePosition = {
  position: 'absolute',
};

export const fillSpace = {
  flex: 1,
};

export const fillHalf = {
  flex: .5,
};

export const paddedScreen = {
  ...fillSpace,
  ...padding,
};

export const distanceStyle = {
  ...Fonts.large,
  alignSelf: 'flex-end',
};

export const sumDistance = {
  ...Fonts.white,
  ...Fonts.large,
  alignSelf: 'center',
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
  ...row,
  height: 54,
  marginVertical: 12,
};

export const journeyListPadding = {
  paddingBottom: 12,
}

export const vehicleListItem = {
  ...listItem,
  ...column,
  height: 80,
};

export const centerY = {
  justifyContent: 'center',
}

export const centerX = {
  alignItems: 'center',
}

export const centerXY = {
  ...centerX,
  ...centerY,
};

export const mediumHorizontalPadding = {
  paddingHorizontal: pad / 2,
};

export const mediumVerticalPadding = {
  paddingVertical: pad / 2,
};

export const mediumPadding = {
  ...mediumHorizontalPadding,
  ...mediumVerticalPadding,
};

export const mediumPaddedScreen = {
  ...fillSpace,
  ...mediumPadding,
};

export const alignSelfEnd = {
  alignSelf: 'flex-end',
};

export const rightPosition = {
  right: pad/4,
};

export const absoluteRight = {
  ...alignSelfEnd,
  ...absolutePosition,
  ...rightPosition,
};

export const vehicleButtonContainer = {
  ...alignSelfEnd,
  ...absolutePosition,
  ...rightPosition,
  bottom: pad,
  right: pad,
};

export const journeyButtonContainer = {
  ...alignSelfEnd,
  ...absolutePosition,
  ...rightPosition,
  bottom: 80,
  right: pad,
};

export const mileageButtonContainer = {
  ...alignSelfEnd,
  ...centerX,
};

export const formRow = {
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

export const vehicleListPadding = {
  paddingTop: 20,
  paddingBottom: 40,
};

export const inputHeight = {
  height: height,
}

export const formPadding = {
  paddingTop: pad / 2,
}

export const smallFormPadding = {
  paddingTop: pad / 4,
}

export const largeWidth = {
  width: 100,
}

export const spreadHorizontally = {
  alignContent: 'stretch',
}
