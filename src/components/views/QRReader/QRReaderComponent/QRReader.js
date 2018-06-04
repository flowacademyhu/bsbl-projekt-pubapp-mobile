import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRReader extends Component {
  onSuccess (e) {
    console.log(e.data);
    /*
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
      */
    alert('QR Code Scanned!');
  }

  render () {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>Read the QR Code from the tablet.</Text>
        }
        fadeIn
        reactivat
        showMarker

      /*
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
      */
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
