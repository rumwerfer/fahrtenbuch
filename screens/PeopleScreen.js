import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import Button from '../atoms/Button';
import Icons from '../res/Icons';
import Strings from '../res/Strings';
import { mapStateToProps } from '../redux/Mappers';
import { fillSpace, vehicleButtonContainer, vehicleListPadding } from '../styles/Styles';
import Tutor from '../atoms/Tutor';

function PeopleScreen(props) {
  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ ...fillSpace, ...backgroundColor }}>
      <TutorList tutors={props.tutors} />
      <View style={vehicleButtonContainer} >
        <Button
          onPress={() => navigation.navigate('tutor')}
          icon={Icons.addItem}
          label={Strings.addTutor}
        />
      </View>
    </SafeAreaView>
  );
};

function TutorList({tutors}) {
  return (
    <ScrollView
      contentContainerStyle={vehicleListPadding}
      contentInsetAdjustmentBehavior='automatic' // iOS 11+
    >
      {tutors.tutors.map((tutor) =>
        <Tutor tutor={tutor} key={tutor.id} />
      )}
    </ScrollView>
  );
}

export default connect(mapStateToProps)(PeopleScreen);
