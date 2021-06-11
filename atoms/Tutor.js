import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Fonts from '../styles/Fonts';
import { vehicleListItem } from '../styles/Styles';

export default Tutor = ({tutor}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('tutor', { id: tutor.id })}
    >
      <View style={vehicleListItem}>
        <Text style={Fonts.large}>
          {tutor.nickName}
        </Text>
        <Text style={Fonts.small}>
          {tutor.fullName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
