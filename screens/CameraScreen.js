import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import PhotoManipulator from 'react-native-photo-manipulator';
import MlkitOcr from 'react-native-mlkit-ocr';
import Toast from 'react-native-simple-toast';
import Button from '../atoms/Button';
import Strings from '../res/Strings.js';
import Colors from '../res/Colors.js';

// TODO maybe outsource into own file instead of pass via props
const scanFrame = {
  relHeight: 0.1,
  relWidth: 0.6,
  relOffsetX: 0.08,
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

function JourneyForm(props) {
  const remainsX = 1 - (scanFrame.relOffsetX + scanFrame.relWidth);
  const navigation = useNavigation();
  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='never'>
    {/* wrapping TextInput in ScrollView for correct keyboard behavior */}
      <View style={{marginTop: 30, flexDirection: 'row', flex: scanFrame.relHeight}}>
        <View style={{flex: scanFrame.relOffsetX, backgroundColor: Colors.black}} />
        <TextInput
          placeholder={Strings.mileage}
          keyboardType='numeric'
          textAlign='right'
          autoCompleteType='off'
          autoCorrect={false}
          value={props.mileage}
          onChangeText={props.setMileage}
          style={{color: Colors.white, flex: scanFrame.relWidth, fontSize: 30}}
          placeholderTextColor={Colors.gray}
        />
        <View style={{flex: remainsX, backgroundColor: Colors.black, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            icon='check'
            onPress={() => navigation.navigate('Home', {enRoute: true})}
            label={Strings.confirm}
          />
        </View>
      </View>
      <ImagePreview imageUri={props.imageUri} />
    </ScrollView>
  );
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
            <Button
              icon={this.props.cameraIsActive ? 'camera' : 'reload'}
              onPress={this.props.cameraIsActive
                ? this.props.scanMileage
                : this.props.resetCamera
              }
              label={Strings.scanMileage}
              loading={this.props.scanning}
            />
          </View>
        </View>
        <View style={{flex: remainsY, backgroundColor: Colors.black, }}>
          <JourneyForm
            imageUri={this.props.imageUri}
            mileage={this.props.mileage}
            setMileage={this.props.setMileage}
          />
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

export default CameraScreen;
