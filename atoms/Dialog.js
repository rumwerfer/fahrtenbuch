import React from 'react';
import {
  Portal,
  Dialog as PaperDialog,
  Paragraph,
  Button as PaperButton
} from 'react-native-paper';

import Strings from '../res/Strings';
import { largeWidth } from '../styles/Styles';

function Dialog(props) {
  return (
    <Portal>
      <PaperDialog visible={props.dialogOpen} onDismiss={props.hideDialog}>
        <PaperDialog.Title>{props.title}</PaperDialog.Title>
        <PaperDialog.Content>
          <Paragraph>{props.message}</Paragraph>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <PaperButton onPress={props.hideDialog}>{Strings.cancel}</PaperButton>
          <PaperButton onPress={props.onConfirm} style={largeWidth}>
            {Strings.ok}
          </PaperButton>
        </PaperDialog.Actions>
      </PaperDialog>
    </Portal>
  );
}

export default Dialog;
