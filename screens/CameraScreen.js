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
import MlkitOcr from 'react-native-mlkit-ocr';
import Toast from 'react-native-simple-toast';
import Strings from '../res/Strings.js';
import Colors from '../res/Colors.js';

// TODO maybe outsource into own file instead of pass via props
const scanFrame = {
  relHeight: 0.1,
  relWidth: 0.6,
  relOffsetX: 0.1,
  relOffsetY: 0.15,
};

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

class JourneyForm extends Component {
  render() {
    return (
      <ImagePreview imageUri={this.props.imageUri} />
    );
  }
}

class CameraOverlay extends Component {
  render() {
    const scanFrame = this.props.scanFrame;
    const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
    const remainsY = 1 - (scanFrame.relOffsetY + scanFrame.relHeight);

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{width: '100%', flex: scanFrame.relOffsetY, backgroundColor: Colors.black, }}/>
        <View style={{flexDirection: 'row', flex: scanFrame.relHeight}}>
          <View style={{flex: scanFrame.relOffsetX, backgroundColor: Colors.black}} />
          <View style={{flex: scanFrame.relWidth, borderWidth: 2, borderColor: Colors.green, }} />
          <View style={{flex: remainsX, backgroundColor: Colors.black, alignItems: 'center', justifyContent: 'center'}}>
            <Button title='ok' color={Colors.green} onPress={this.props.takePicture} />
          </View>
        </View>
        <View style={{flex: remainsY, backgroundColor: Colors.black, }}>
          <JourneyForm imageUri={this.props.imageUri} />
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
          ratio='16:9'
          androidCameraPermissionOptions={{
            title: Strings.cameraPermission,
            message: Strings.cameraPermissionMessage,
            buttonPositive: Strings.agree,
            buttonNegative: Strings.deny,
          }}
          captureAudio={false}
          style={{flex: 1}}
          // TODO autoFocusPointOfInterest
        >
          <CameraOverlay
            style={{flex: 1}}
            takePicture={this.takePicture}
            imageUri={this.state.imageUri}
            scanFrame={scanFrame}
          />
        </RNCamera>
      </SafeAreaView>
    );
  }

  // TODO delete images again
  takePicture = async () => {
    if (this.camera) {

      // take picture
      const options = {
        pauseAfterCapture: true,
        forceUpOrientation: true, // ios only
        fixOrientation: true, // slow, but necessary for android
      }; // this only turns upright pictures correct, TODO rotate landscape pictures
      const image = await this.camera.takePictureAsync(options);

      // crop
      const cropRegion = {
        x: scanFrame.relOffsetX * image.width,
        y: scanFrame.relOffsetY * image.height,
        height: scanFrame.relHeight * image.height,
        width: scanFrame.relWidth * image.width,
      };
      const croppedUri = await PhotoManipulator.crop(image.uri, cropRegion);
      this.setState({imageUri: croppedUri}); // debug only

      // ocr
      try {
        const scanResult = await MlkitOcr.detectFromUri(croppedUri);
        const mileage = this.findMileage(scanResult);
        console.log(scanResult);
        console.log(mileage);
      } catch(err) {
        console.log(err);
        if (err.message.includes('to be downloaded')) {
          Toast.show(Strings.modelDownloadMessage);
        }
      }
    }
  }

  findMileage = (scanResult) => {
    let largestNumber = 0;
    for (const block of scanResult) {
      for (const line of block.lines) {
        const largestNumberOfLine = Math.max.apply(
          null, // scope
          line.text
            .replace(' ', '') // remove whitespace
            .match(/\d+/g) // create array only of numbers
        );
        if (largestNumberOfLine > largestNumber) {
          largestNumber = largestNumberOfLine;
        }
      }
    }
    return largestNumber > 0 ? largestNumber : null;
  }

}

export default CameraScreen;
