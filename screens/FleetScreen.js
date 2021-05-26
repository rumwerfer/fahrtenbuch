import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import Button from '../atoms/Button';
import Icons from '../res/Icons';
import Strings from '../res/Strings';
import { mapVehiclesToProps } from '../redux/Mappers';
import { fillSpace, vehicleButtonContainer, vehicleListPadding } from '../styles/Styles';
import Vehicle from '../atoms/Vehicle';

function FleetScreen(props) {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ ...fillSpace, ...backgroundColor }}>
      <VehicleList vehicles={props.vehicles} />
      <View style={vehicleButtonContainer} >
        <Button
          onPress={() => navigation.navigate('vehicle')}
          icon={Icons.addVehicle}
          label={Strings.addVehicle}
        />
      </View>
    </SafeAreaView>
  );
};

function VehicleList({vehicles}) {
  return (
    <ScrollView
      contentContainerStyle={vehicleListPadding}
      contentInsetAdjustmentBehavior='automatic' // iOS 11+
    >
      {vehicles.vehicles.map((vehicle) => <Vehicle vehicle={vehicle} />)}
    </ScrollView>
  );
}

export default connect(mapVehiclesToProps)(FleetScreen);
