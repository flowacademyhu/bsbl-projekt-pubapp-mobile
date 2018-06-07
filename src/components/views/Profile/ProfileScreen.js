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
            <Text style={styles.nickname}>{this.props.nickName}</Text>
            <Text style={styles.xp}>Current XP: {this.props.xp}</Text>
            <Text style={styles.emailLabel}>E-mail: <Text style={styles.email}>{this.props.email}</Text></Text>
            <Text style={styles.dob}>Date of Birth: {this.props.dob}</Text>
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
    color: '#009999',
    marginTop: 30,
    marginHorizontal: 20,
  },
  nickname: {
    fontSize: 30,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#009999',
    marginHorizontal: 20
  },
  xp: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Bold',
    color: '#009999',
    marginHorizontal: 20,
    marginBottom: 30
  },
  emailLabel: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#009999',
    marginHorizontal: 20
  },
  email: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Italic',
    color: '#009999'
  },
  dob: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#009999',
    marginHorizontal: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20
  }
});