import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';

import LoginForm from './LoginForm';

export default class Login extends Component {
  
  openRegistrationPage = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'PubApp.Registration',
        title: 'Registration',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }
  
  render () {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Our Pub Application!
          </Text>
          <Text style={styles.textStyle}>
            If you don't have an account, click here:
          </Text>
          <Button 
          title='Sign Up'
          color='#009999'
          onPress={this.openRegistrationPage.bind(this)}
          />
          <Text style={styles.textStyle}>
            or Log in:
          </Text>
        </View>
        <View style={styles.login}>
          <LoginForm />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  login: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  welcome: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    marginBottom: 15
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 25
  }
});
