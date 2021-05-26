import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Button from '../atoms/Button';
import Icons from '../res/Icons';
import Strings from '../res/Strings';
import { paddedScreen, buttonContainer } from '../styles/Styles';

const FleetScreen = () => {
  const themeColors = useTheme().colors;
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{...paddedScreen, backgroundColor: themeColors.screenBackground}}
    >
      <View style={buttonContainer} >
        <Button
          onPress={() => navigation.navigate('vehicle')}
          icon={Icons.addVehicle}
          label={Strings.addVehicle}
        />
      </View>
    </SafeAreaView>
  );
};

export default FleetScreen;
