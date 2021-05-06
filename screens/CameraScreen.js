import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import PhotoManipulator from 'react-native-photo-manipulator';
import Strings from '../res/Strings.js';
import Colors from '../res/Colors.js';

// for debugging only
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
      const options = {
        pauseAfterCapture: true,
        forceUpOrientation: true, // ios only
        fixOrientation: true, // slow, but necessary for android
      };
      const data = await this.camera.takePictureAsync(options);
      console.log(
        'original image: ' + data.uri +
        ' height: ' + data.height +
        ' width: ' + data.width
      );

      console.log(
        'window height: ' + Dimensions.get('window').height +
        ' width: ' + Dimensions.get('window').width +
        ' screen height: '+ Dimensions.get('screen').height +
        ' width: ' + Dimensions.get('screen').width
      );


      const cropRegion = {x: 530, y: 600, height: 570, width: 1600};
      PhotoManipulator.crop(data.uri, cropRegion)
        .then(path => {
          console.log('cropped image: ' + path);
          this.setState({imageUri: path});
        })
        .catch((error) => {console.log(error)});

    }
  }
}

export default CameraScreen;
