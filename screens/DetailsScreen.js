import React, { Component } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../atoms/Button';
import Strings from '../res/Strings';

function DetailsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button
        icon='check'
        onPress={() => navigation.navigate('Home', {enRoute: false})}
        label={Strings.saveJourney}
      />
    </SafeAreaView>
  );
}

export default DetailsScreen;
