import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Strings from '../res/Strings.js';
import Colors from '../res/Colors.js';

class CameraOverlay extends Component {
  render() {
    return (
      <View>
        <View style={{width: '100%', height: 100, backgroundColor: Colors.black, }}/>
        <View style={{flexDirection: 'row', height: 100}}>
          <View style={{flex: .07, backgroundColor: Colors.black}} />
          <View style={{flex: .7, borderWidth: 2, borderColor: Colors.green, }} />
          <View style={{flex: .23, backgroundColor: Colors.black, alignItems: 'center', justifyContent: 'center'}}>
            <Button title='ok' color={Colors.green} onPress={this.props.takePicture} />
          </View>
        </View>
        <View style={{height: '100%', backgroundColor: Colors.black, }}/>
      </View>
    );
  }
}

class CameraScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RNCamera
          ref={cameraRef => {
            this.camera = cameraRef;
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
        >
          <CameraOverlay style={{flex: 1}} takePicture={this.takePicture} />
        </RNCamera>
      </SafeAreaView>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: .5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }
}

export default CameraScreen;
