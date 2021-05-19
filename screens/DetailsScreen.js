import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Button from '../atoms/Button';
import TextInput from '../atoms/TextInput';
import Strings from '../res/Strings';
import Colors from '../res/Colors';

function DetailsScreen() {
  const navigation = useNavigation();
  const themeColors = useTheme().colors;
  return (
    <SafeAreaView style={{
      backgroundColor: themeColors.screenBackground,
      flex: 1,
      padding: 40
    }}>
      <View style={styles.detailsForm}>
        <TextInput label={Strings.route} />
        <TextInput label={Strings.weather}/>
        <View style={{alignSelf: 'flex-end'}}>
          <Button
            icon='content-save'
            onPress={() => navigation.navigate('Home', {enRoute: false})}
            label={Strings.saveJourney}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  detailsForm: {
    flex: 0.5,
    justifyContent: 'space-between'
  },
});

export default DetailsScreen;
