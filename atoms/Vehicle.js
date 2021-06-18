import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Fonts from '../styles/Fonts';
import { vehicleListItem } from '../styles/Styles';

export default Vehicle = ({vehicle}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('vehicle', { id: vehicle.id })}
    >
      <View style={vehicleListItem}>
        <Text style={Fonts.small}>
          {vehicle.name}
        </Text>
        <Text style={Fonts.tiny}>
          {vehicle.numberPlate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
