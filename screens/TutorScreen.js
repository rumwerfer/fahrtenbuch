import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import { paddedScreen, form } from '../styles/Styles';
import { TwoTextForm } from '../molecules/Forms';
import { mapStateToProps } from '../redux/Mappers';
import * as TutorActions from '../redux/TutorActions';

function TutorScreen(props) {

  const navigation = useNavigation();

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const [nickName, setNickName] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  return (
    <TwoTextForm
      label1={Strings.nickName}
      value1={nickName}
      setValue1={setNickName}
      label2={Strings.fullName}
      value2={fullName}
      setValue2={setFullName}
      buttonIcon={Icons.save}
      onButtonPress={() => {
        if (validateInput(nickName, fullName)) {
          const payload = {
            id: Date.now(),
            nickName: nickName,
            fullName: fullName,
          };
          props.addTutor(payload);
          navigation.goBack();
        }
      }}
      buttonLabel={Strings.saveTutor}
    />
  );
};

function validateInput(nickName, fullName) {
  if (isBlank(nickName)) {
    Toast.show(Strings.enterNickNameMessage);
    return false;
  }
  if (isBlank(fullName)) {
    Toast.show(Strings.enterFullNameMessage);
    return false;
  }
  return true;
}

function isBlank(string) {
  return (!string || string.trim().length === 0)
}

const mapDispatchToProps = dispatch => ({
  addTutor: (payload) => dispatch(TutorActions.addTutor(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorScreen);