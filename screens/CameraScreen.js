import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Strings from '../res/Strings.js';
import Colors from '../res/Colors.js';

class ImagePreview extends Component {
  render() {
    if (!this.props.imageUri) {
      return <View />;
    }
    return (
      <Image source={{ uri: this.props.imageUri }} style={{height: 200, resizeMode: 'contain', marginTop: 30}}/>
    );
  }
}

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
        <View style={{height: '100%', backgroundColor: Colors.black, }}>
          <ImagePreview imageUri={this.props.imageUri} />
        </View>
      </View>
    );
  }
}

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
    }
  }

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
          <CameraOverlay style={{flex: 1}} takePicture={this.takePicture} imageUri={this.state.imageUri}/>
        </RNCamera>
      </SafeAreaView>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { pauseAfterCapture: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({imageUri: data.uri});
    }
  }
}

export default CameraScreen;
