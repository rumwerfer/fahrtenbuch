import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';

import Button from '../atoms/Button';
import Icons from '../res/Icons';
import Strings from '../res/Strings';
import Constants from '../res/Constants';
import { fillSpace, vehicleButtonContainer } from '../styles/Styles';

export default function ReportScreen(props) {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const fillWindow = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  };

  const url = props.route.params.url;
  const sumDistance = props.route.params.sumDistance;

  const shareReport = () => {
    Share.open({
      url: url,
      title: Strings.sendTo,
      subject: Strings.appName,
      message: sumDistance >= Constants.distanceGoal
               ? Strings.madeItMessage
               : Strings.kmToGoMessage(Constants.distanceGoal - sumDistance),
    })
    .catch(err => console.log(err)); // error if user did not share
  }

  return (
    <SafeAreaView style={{ ...backgroundColor, ...fillSpace }}>
      <Pdf
        source={{ uri: url, cache: false }}
        style={{ ...fillSpace, ...fillWindow, ...backgroundColor }}
      />
      <View style={vehicleButtonContainer}>
        <Button icon={Icons.share} onPress={shareReport} label={Strings.share}/>
      </View>
    </SafeAreaView>
  );
}


//
