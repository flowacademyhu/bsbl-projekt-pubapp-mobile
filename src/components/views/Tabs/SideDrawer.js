import React, { Component } from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import axios from 'axios';

export default class SideDrawer extends Component {
  
  async onLogout () {
    const userID = await AsyncStorage.getItem('@userID:key');
    const token = await AsyncStorage.getItem('@token:key');

    let config = {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    // 192.168.1.3, 192.168.0.102, 192.168.5.182
    await axios.delete('http://192.168.1.3:8080/sessions/' + userID, { headers: config })
      .then(response => {
        if (response.status === 200) {
          this.openLoginScreen();
        } else {
          alert('Something went wrong.')
        }
      })
      .catch(error => console.log(error.response));
  }

  openLoginScreen = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'PubApp.Login',
        title: 'Login',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }

  render () {
    return (
      <View>
        <Button
          title='Log out'
          color='#009999'
          onPress={this.onLogout.bind(this)} />
      </View>
    );
  }
}
