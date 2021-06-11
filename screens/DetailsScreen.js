import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

import Dialog from '../atoms/Dialog';
import { mapStateToProps } from '../redux/Mappers';
import { fillSpace } from '../styles/Styles';
import Icons from '../res/Icons';
import Colors from '../res/Colors';
import Strings from '../res/Strings';
import * as JourneyActions from '../redux/JourneyActions';

function DetailsScreen(props) {
  const navigation = useNavigation();

  const journey = props.journeys.saved.find(
    journey => journey.id === props.route.params?.id
  );

  // remove journey dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        <IconButton
          onPress={showDialog}
          icon={Icons.trash}
          color={Colors.white}
        />
    });
  }, []);

  return (
    <View style={fillSpace}>
      <Dialog
        onConfirm={() => {
          props.removeJourney({ startTime: journey.startTime });
          navigation.goBack();
        }}
        dialogOpen={dialogOpen}
        hideDialog={hideDialog}
        title={Strings.removeJourney + '?'}
        message={Strings.removeJourneyMessage}
      />
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  removeJourney: (payload) => dispatch(JourneyActions.removeJourney(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
