import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  IconButton,
  Portal,
  Dialog,
  Paragraph,
  Button,
  useTheme
} from 'react-native-paper';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { TextInput } from '../atoms/Inputs';
import Strings from '../res/Strings';
import Icons from '../res/Icons';
import Colors from '../res/Colors';
import { fillSpace, largeWidth } from '../styles/Styles';
import { paddedScreen, form } from '../styles/Styles';
import { TwoTextForm } from '../molecules/Forms';
import { mapStateToProps } from '../redux/Mappers';
import * as TutorActions from '../redux/TutorActions';
import * as JourneyActions from '../redux/JourneyActions';

function TutorScreen(props) {
  const navigation = useNavigation();

  const themeColors = useTheme().colors;
  const backgroundColor = { backgroundColor: themeColors.screenBackground };

  const [nickName, setNickName] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  // remove tutor dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);

  // edit tutor if id given, otherwise add tutor
  const editTutorID = props.route.params?.id;
  const editMode = editTutorID !== undefined;
  if (editMode) {
    const tutor = props.tutors.tutors.find((tutor) => tutor.id === editTutorID);
    useEffect(() => {
      setNickName(tutor.nickName);
      setFullName(tutor.fullName);
      navigation.setOptions({
        headerRight: () =>
          <IconButton
            onPress={showDialog}
            icon={Icons.trash}
            color={Colors.white}
          />
      });
    }, []);
  }

  return (
    <View style={fillSpace}>
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
            const payload = { nickName: nickName, fullName: fullName };
            if (editMode) {
              props.editTutor({ ...payload, id: editTutorID });
            } else {
              props.addTutor({ ...payload, id: Date.now() });
            }
            navigation.goBack();
          }
        }}
        buttonLabel={Strings.saveTutor}
      />
      <Portal>
        <Dialog visible={dialogOpen} onDismiss={hideDialog} >
          <Dialog.Title>{Strings.removeTutor + '?'}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{Strings.removeTutorMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{Strings.cancel}</Button>
            <Button
              onPress={() => {
                props.removeTutorJourneys({ tutorID: editTutorID });
                props.removeTutor({ id: editTutorID });
                navigation.goBack();
              }}
              style={largeWidth}
            >
              {Strings.ok}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
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
  editTutor: (payload) => dispatch(TutorActions.editTutor(payload)),
  removeTutorJourneys: (payload) =>
    dispatch(JourneyActions.removeTutorJourneys(payload)),
  removeTutor: (payload) => dispatch(TutorActions.removeTutor(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorScreen);
