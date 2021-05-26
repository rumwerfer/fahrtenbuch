import React from 'react';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';

import JourneyForm from '../molecules/JourneyForm';
import Button from '../atoms/Button';
import Colors from '../res/Colors';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { scanFrame } from '../atoms/scanFrame';
import {
  fillColumn,
  centerXY,
  fullWidth,
  greenBorder
} from '../styles/Styles';

export default (props) => {

  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const remainsY = 1 - (scanFrame.relOffsetY + scanFrame.relHeight);

  const backgroundColor = useTheme().colors.screenBackground;
  const screenBackground = { backgroundColor: backgroundColor };

  return (
    <View style={fillColumn}>

      {/* row above scanframe */}
      <View
        style={{
          ...screenBackground,
          ...fullWidth,
          flex: scanFrame.relOffsetY }}
      />

      {/* row with scanframe */}
      <View style={{ flexDirection: 'row', flex: scanFrame.relHeight }}>
        <View style={{ ...screenBackground, flex: scanFrame.relOffsetX }} />
        <View style={{ ...greenBorder, flex: scanFrame.relWidth }} />
        <View style={{ ...screenBackground, ...centerXY, flex: remainsX }}>
          <Button
            icon={props.cameraIsActive ? Icons.scan : Icons.retry}
            onPress={props.cameraIsActive
              ? props.scanMileage
              : props.resetCamera
            }
            label={Strings.scanMileage}
            loading={props.scanning}
          />
        </View>
      </View>

      {/* row below scanframe */}
      <View style={{ ...screenBackground, flex: remainsY }}>
        <JourneyForm
          imageUri={props.imageUri}
          mileage={props.mileage}
          setMileage={props.setMileage}
          ongoingJourney={props.ongoingJourney}
          startJourney={props.startJourney}
          finishJourney={props.finishJourney}
        />
      </View>

    </View>
  );
}
