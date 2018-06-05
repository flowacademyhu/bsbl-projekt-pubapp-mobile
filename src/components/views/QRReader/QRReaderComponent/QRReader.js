import React, { Component } from 'react';
import { StyleSheet, Text, AsyncStorage } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';

export default class QRReader extends Component {
  async onSuccess(e) {
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

    await axios.post('http://192.168.5.182:8080/users/' + userID, QRdata, { headers: config })
      .then(response => console.log(response.data))
      .catch(error => console.log(error.response));

    alert('Your order has been registered!');
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
