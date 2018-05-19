import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class RegistrationForm extends Component {
  render () {
    return (
      <View style={styles.loginFormWrapper}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.labels}>
            E-mail address:
          </Text>
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={50}
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
  input: {
    width: 350,
    fontSize: 20,
    textAlign: 'center'
  }
});
