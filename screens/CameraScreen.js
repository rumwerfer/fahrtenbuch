import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import PhotoManipulator from 'react-native-photo-manipulator';
import MlkitOcr from 'react-native-mlkit-ocr';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import * as JourneyActions from '../redux/JourneyActions';
import { MileageInput } from '../atoms/Inputs'
import Button from '../atoms/Button';
import Strings from '../res/Strings.js';
import Colors from '../res/Colors.js';

// TODO maybe outsource into own file instead of pass via props
const scanFrame = {
  relHeight: 0.1,
  relWidth: 0.55,
  relOffsetX: 0.08,
  relOffsetY: 0.06,
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

function JourneyForm(props) {
  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const navigation = useNavigation();
  const backgroundColor = useTheme().colors.screenBackground;
  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='never'>
    {/* wrapping TextInput in ScrollView for correct keyboard behavior */}
      <View style={{marginTop: 30, flexDirection: 'row', flex: scanFrame.relHeight}}>
        <View style={{flex: scanFrame.relOffsetX, backgroundColor: backgroundColor}} />
        <View style={{flex: scanFrame.relWidth}}>
          <MileageInput mileage={props.mileage} setMileage={props.setMileage}/>
        </View>
        <View style={{flex: remainsX, backgroundColor: backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            icon='check'
            onPress={() => {
              if (props.mileage) {
                const payload = {time: Date.now(), mileage: props.mileage};
                if (!props.isEndMileage) {
                  props.startJourney(payload);
                  navigation.navigate('Home', {enRoute: true}); // TODO enRoute not needed anymore, use redux ongoing instead!
                } else {
                  props.finishJourney(payload);
                  navigation.navigate('Details');
                }

              } else { // mileage is undefined
                Toast.show(Strings.enterMileageMessage);
              }
            }}
            label={Strings.confirm}
          />
        </View>
      </View>
      <ImagePreview imageUri={props.imageUri} />
    </ScrollView>
  );
}

function CameraOverlay(props) {
  const scanFrame = props.scanFrame;
  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const remainsY = 1 - (scanFrame.relOffsetY + scanFrame.relHeight);
  const backgroundColor = useTheme().colors.screenBackground;

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{width: '100%', flex: scanFrame.relOffsetY, backgroundColor: backgroundColor}}/>
      <View style={{flexDirection: 'row', flex: scanFrame.relHeight}}>
        <View style={{flex: scanFrame.relOffsetX, backgroundColor: backgroundColor}} />
        <View style={{flex: scanFrame.relWidth, borderWidth: 2, borderColor: Colors.green, }} />
        <View style={{flex: remainsX, backgroundColor: backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            icon={props.cameraIsActive ? 'camera' : 'reload'}
            onPress={props.cameraIsActive
              ? props.scanMileage
              : props.resetCamera
            }
            label={Strings.scanMileage}
            loading={props.scanning}
          />
        </View>
      </View>
      <View style={{flex: remainsY, backgroundColor: backgroundColor}}>
        <JourneyForm
          imageUri={props.imageUri}
          mileage={props.mileage}
          setMileage={props.setMileage}
          isEndMileage={props.isEndMileage}
          startJourney={props.startJourney}
          finishJourney={props.finishJourney}
        />
      </View>
    </View>
  );
}

class CameraScreen extends Component {

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
          <CameraOverlay
            style={{flex: 1}}
            scanMileage={this.scanMileage}
            imageUri={this.state.imageUri}
            scanFrame={scanFrame}
            mileage={this.state.mileage}
            cameraIsActive={this.state.cameraIsActive}
            resetCamera={this.resetCamera}
            setMileage={this.setMileage}
            scanning={this.state.scanning}
            isEndMileage={this.props.journeys.ongoing !== null}
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

const mapStateToProps = (state) => {
  const { journeys } = state;
  return { journeys };
};

const mapDispatchToProps = dispatch => ({
  startJourney: (payload) => dispatch(JourneyActions.startJourney(payload)),
  finishJourney: (payload) => dispatch(JourneyActions.finishJourney(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
