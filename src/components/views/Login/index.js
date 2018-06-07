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

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <View style={styles.container}>
          <View style={{marginTop: 20}}>
            <Text style={styles.welcomeText}>
              Welcome to Our Pub Application!
          </Text>
            <Text style={styles.toRegistration}>
              If you don't have an account, click here:
          </Text>
          <View style={styles.button}>
          <Button
              title='Sign Up'
              color='#009999'
              onPress={this.openRegistrationPage.bind(this)}
            />
          </View>
            <Text style={styles.toLogIn}>
              or Log in:
          </Text>
          </View>
          <View>
            <LoginForm />
          </View>
        </View>
      </ScrollView>
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
  welcomeText: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    color: '#009999',
    margin: 20
  },
  toRegistration: {
    fontSize: 30,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    color: '#009999',
    margin: 20
  },
  button: {
    marginHorizontal: 30
  },
  toLogIn: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    padding: 10,
    color: '#009999',
    marginTop: 35
  }
});
