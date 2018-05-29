import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import EditProfileScreen from './editProfile'

export default class ProfileScreen extends Component {
  constructor (props) {
    super(props);
    /* These field values should be queried from the database */
    this.state = {
      firstName: 'Jane',
      lastName: 'Shepard',
      nickname: 'Commander',
      email: 'shepard@normandy.com',
      password: undefined,
      confirmPassword: undefined,
      gender: 0,
      dob: '1990-04-11',
      xp: 3468436844
    };
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.names}>{this.state.firstName} {this.state.lastName}</Text>
            <Text stlye={styles.nickname}>{this.state.nickname}</Text>
            <Text>Current XP: {this.state.xp}</Text>
            <Text>E-mail Address: {this.state.email}</Text>
            <Text>Date of Birth: {this.state.dateOfBirth}</Text>
          </View>
        </View>
        <View>
          <EditProfileScreen
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            nickname={this.state.nickname}
            email={this.state.email}
            gender={this.state.gender}
            dateOfBirth={this.state.dateOfBirth}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    margin: 20
  },
  names: {
    fontSize: 50,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'left',
  },
  nickname: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'left',
  }
});
