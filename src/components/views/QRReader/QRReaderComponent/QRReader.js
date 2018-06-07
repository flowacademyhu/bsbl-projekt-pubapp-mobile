import React, { Component } from 'react';
import { StyleSheet, Text, AsyncStorage, Alert, View } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from '../../../utils/loggingOut';

const IP = require('../../../utils/ip');

export default class QRReader extends Component {
  async onSuccess (e) {
    console.log(e.data);
    let QRdata = { qrCodePath: e.data };

    const userID = await AsyncStorage.getItem('@userID:key');
    const token = await AsyncStorage.getItem('@token:key');

    let config = {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    await axios.post('http://' + IP.ip + ':8080/users/' + userID, QRdata, { headers: config })
      .then(response => {
        if (response.status === 200) {
          Alert.alert(
            'Order Registered',
            'Your order has been registered.',
            [
              { text: 'OK', onPress: () => {
                console.log('Pressed.');
                this.scanner.reactivate();
              } }
            ],
            { cancelable: false }
          );
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.data === 'This QR Code has already been read.') {
          Alert.alert(
            'QR Code Already Read',
            'This QR Code has already been read.',
            [
              { text: 'OK', onPress: () => {
                console.log('Pressed.');
                this.scanner.reactivate();
              } }
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Something Went Wrong',
            'Something went wrong. Please try again.',
            [
              { text: 'OK', onPress: () => {
                console.log('Pressed.');
                this.scanner.reactivate();
              } }
            ],
            { cancelable: false }
          );
        }
      });
  }

  render () {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        ref={(node) => { this.scanner = node; }}
        topContent={
          <Text style={styles.centerText}>Read the QR Code from the tablet at the counter.</Text>
        }
        fadeIn
        showMarker
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    fontSize: 20,
    padding: 10,
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: '500',
    color: '#ffffff'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
