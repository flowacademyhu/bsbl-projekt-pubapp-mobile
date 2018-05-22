import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import EditProfileScreen from './editProfile'

export default class ProfileScreen extends Component {

  state = {
    firstName: 'Jane',
    lastName: 'Shepard',
    nickname: 'Commander',
    xp: 3468436844,
    email: 'shepard@normandy.com',
    gender: 1,
    dateOfBirth: '2154-04-11'
  }

  render() {
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
    width: '100%'
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
})