import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Fonts from '../styles/Fonts';
import { vehicleListItem } from '../styles/Styles';

export default Tutor = ({tutor}) => {
  return (
    <View style={vehicleListItem}>
      <Text style={Fonts.large}>
        {tutor.name}
      </Text>
    </View>
  );
};
