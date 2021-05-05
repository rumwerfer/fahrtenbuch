import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Strings from '../res/Strings.js';

class CameraScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: Strings.cameraPermission,
            message: Strings.cameraPermissionMessage,
            buttonPositive: Strings.agree,
            buttonNegative: Strings.deny,
          }}
          captureAudio={false}
          style={{flex: 1}}
        />
      </SafeAreaView>
    );
  }
}

export default CameraScreen;
