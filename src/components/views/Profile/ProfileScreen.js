import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, Text, View, ScrollView, Button, AsyncStorage } from 'react-native';

import axios from 'axios';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  /*
  async componentWillMount() {

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
          nickname: response.data.nickName,
          email: response.data.email,
          dob: response.data.dob,
          xp: response.data.xp
        });
      })
      .catch(error => console.log(error.response));
  }
*/
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
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.names}>{this.props.firstName} {this.props.lastName}</Text>
            <Text stlye={styles.nickname}>{this.props.nickName}</Text>
            <Text>Current XP: {this.props.xp}</Text>
            <Text>E-mail Address: {this.props.email}</Text>
            <Text>Date of Birth: {this.props.dob}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            title='Edit Profile'
            color='#009999'
            onPress={this.openEditProfilePage.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '90%',
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
    textAlign: 'left'
  },
  nickname: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'left'
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
});