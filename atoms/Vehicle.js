import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Fonts from '../styles/Fonts';
import { vehicleListItem } from '../styles/Styles';

export default Vehicle = ({vehicle}) => {
  return (
    <View style={vehicleListItem}>
      <Text style={Fonts.large}>
        {vehicle.name}
      </Text>
      <Text style={Fonts.small}>
        {vehicle.numberPlate}
      </Text>
    </View>
  );
};
