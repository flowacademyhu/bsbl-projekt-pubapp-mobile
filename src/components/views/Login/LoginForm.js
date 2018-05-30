import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

import axios from 'axios';

import LoadTabs from '../Tabs';

export default class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      statusCode: undefined,
      token: undefined,
      loginWarning: ''
    };
  }

  onChangeEmail (value) {
    this.setState({ email: value });
  }

  onChangePassword (value) {
    this.setState({ password: value });
  }

  async onButtonTouch () {
    await axios.post('http://192.168.5.182:8080/sessions', { email: this.state.email, password: this.state.password })
      .then(response => this.setState({ token: response.data, statusCode: response.status }))
      .catch(error => console.log(error));

    if (this.state.statusCode === 200) {
      LoadTabs();
    } else {
      this.setState({ loginWarning: 'Unsuccessful login attempt' });
    }
  }

  render () {
    return (
      <View style={styles.loginFormWrapper}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.loginWarning}>{this.state.loginWarning}</Text>
          <Text style={styles.labels}>
            E-mail address:
          </Text>
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={50}
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={this.onChangeEmail.bind(this)}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.labels}>
            Password:
          </Text>
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={50}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.onChangePassword.bind(this)}
          />
          <Button
            title='Log in'
            color='#009999'
            onPress={this.onButtonTouch.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginFormWrapper: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30
  },
  labels: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center'
  },
  loginWarning: {
    fontSize: 15,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    color: '#cc0000'
  },
  input: {
    width: 350,
    fontSize: 20,
    textAlign: 'center'
  }
});
