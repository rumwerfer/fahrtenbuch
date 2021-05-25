import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PhotoManipulator from 'react-native-photo-manipulator';
import MlkitOcr from 'react-native-mlkit-ocr';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import * as JourneyActions from '../redux/JourneyActions';
import Strings from '../res/Strings';
import CamOverlay from '../molecules/CamOverlay';
import { scanFrame } from '../atoms/scanFrame';
import { mapJourneysToProps } from '../redux/Mappers';

class MileageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
      mileage: '',
      cameraIsActive: true,
      scanning: false,
    };
  }

  setMileage = (text) => {
    if (/^\d*$/.test(text)) // discard everything except digits
    this.setState({mileage: text?.toString()})
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
          <CamOverlay
            style={{flex: 1}}
            scanMileage={this.scanMileage}
            imageUri={this.state.imageUri}
            mileage={this.state.mileage}
            cameraIsActive={this.state.cameraIsActive}
            resetCamera={this.resetCamera}
            setMileage={this.setMileage}
            scanning={this.state.scanning}
            ongoingJourney={this.props.journeys.ongoing}
            startJourney={this.props.startJourney}
            finishJourney={this.props.finishJourney}
          />
        </RNCamera>
      </SafeAreaView>
    );
  }

  // TODO delete images again
  scanMileage = async () => {
    if (this.camera) {
      this.setState({cameraIsActive: false, scanning: true});
      const image = await this.takePicture();
      const croppedImage = await this.crop(image);
      const ocrResult = await this.ocr(croppedImage);
      if (ocrResult) {
        const mileage = this.findMileage(ocrResult);
        if (mileage > 0) {
          this.setMileage(mileage);
        }
      }
      this.setState({scanning: false});
    }
  }

  resetCamera = () => {
    this.setState({cameraIsActive: true});
    this.camera.resumePreview();
  };

  takePicture = async () => {
    const options = {
      pauseAfterCapture: true,
      forceUpOrientation: true, // ios only
      fixOrientation: true, // slow, but necessary for android
    }; // this only turns upright pictures correct, TODO rotate landscape pictures
    const image = await this.camera.takePictureAsync(options);
    console.log('takePicture: ' + image.uri);
    return image;
  }

  crop = async (image) => {
    const cropRegion = {
      x: scanFrame.relOffsetX * image.width,
      y: scanFrame.relOffsetY * image.height,
      height: scanFrame.relHeight * image.height + 130, // dirty hack to fix cropRegion on some models
      width: scanFrame.relWidth * image.width,
    };
    const croppedImage = await PhotoManipulator.crop(image.uri, cropRegion);
    this.setState({imageUri: croppedImage}); // debug only
    console.log('crop: ' + croppedImage);
    return croppedImage;
  }

  ocr = async (image) => {
    try {
      const ocrResult = await MlkitOcr.detectFromUri(image);
      console.log('ocr: ' + JSON.stringify(ocrResult));
      return ocrResult;

    } catch(err) {
      console.log(err);
      if (err.message.includes('to be downloaded')) {
        Toast.show(Strings.modelDownloadMessage);
      }
      return null;
    }
  }

  findMileage = (scannedText) => {
    let largestNumber = 0;
    for (const block of scannedText) {
      for (const line of block.lines) {
        const largestNumberOfLine = Math.max.apply(
          null,
          line.text
            .replace(' ', '') // remove whitespace
            .replace(/\d{8,}/g, '') // remove numbers with 8 digits and more
            .match(/\d{4,}/g) // create array only of numbers with 4-7 digits
        );
        if (largestNumberOfLine > largestNumber) {
          largestNumber = largestNumberOfLine;
        }
      }
    }
    console.log('findMileage: ' + largestNumber);
    return largestNumber > 0 ? largestNumber : null;
  }

}

const mapDispatchToProps = dispatch => ({
  startJourney: (payload) => dispatch(JourneyActions.startJourney(payload)),
  finishJourney: (payload) => dispatch(JourneyActions.finishJourney(payload)),
});

export default connect(mapJourneysToProps, mapDispatchToProps)(MileageScreen);
