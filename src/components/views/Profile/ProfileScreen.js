import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, Text, View, ScrollView, Button, AsyncStorage } from 'react-native';

import axios from 'axios';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  openEditProfilePage = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'PubApp.EditProfile',
        title: 'Edit Profile',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
          <View>
            <Text style={styles.name}>{this.props.firstName} {this.props.lastName}</Text>
            <Text>{this.props.nickName}</Text>
            <Text>Current XP: {this.props.xp}</Text>
            <Text>E-mail Address: {this.props.email}</Text>
            <Text>Date of Birth: {this.props.dob}</Text>
          </View>
        <View style={styles.buttons}>
          <Button
            title='Edit Profile'
            color='#009999'
            onPress={this.openEditProfilePage.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    fontSize: 50,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#009999'
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
});