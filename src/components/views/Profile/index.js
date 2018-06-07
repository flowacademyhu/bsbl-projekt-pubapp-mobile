import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';

import axios from '../../utils/loggingOut';

import ProfileScreen from './ProfileScreen';

export default class Profile extends Component {

  constructor (props) {
    super(props);
    this.props.navigator.addOnNavigatorEvent(this.navigatorEvent);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      nickName: undefined,
      email: undefined,
      dob: undefined,
      xp: undefined
    };
  }

  openLoginPage = () => {
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

  async getUserInfo () {
    const userID = await AsyncStorage.getItem('@userID:key');
    const token = await AsyncStorage.getItem('@token:key');

    let config = {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    // 192.168.1.3, 192.168.0.102, 192.168.5.182
    await axios.get('http://192.168.5.182:8080/users/' + userID, { headers: config })
      .then(response => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          nickName: response.data.nickName,
          email: response.data.email,
          dob: response.data.dob,
          xp: response.data.xp
        });
      })
      .catch(error => console.log(error.response));
  }

navigatorEvent = (event) => {
  if (event.type === 'NavBarButtonPress' && event.id === 'LogoutButton') {
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true
    });
  }

  if (event.id === 'bottomTabSelected') {
    this.getUserInfo();
  }
}
  
  render () {
    return (
      <View style={styles.container}>
        <ProfileScreen
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        nickName={this.state.nickName}
        email={this.state.email}
        dob={this.state.dob}
        xp={this.state.xp}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
});