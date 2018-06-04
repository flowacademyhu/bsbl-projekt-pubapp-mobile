import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';

import axios from 'axios';

import Input from '../../utils/inputs';
import ValidationRules from '../../utils/validationRules';

import LoadTabs from '../Tabs';

export default class LoginForm extends Component {
  state = {
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 5
        }
      }
    },
    loginWarning: ''
  };

  updateInput = (name, value) => {
    this.setState({ hasErrors: false });

    let formCopy = this.state.form;
    formCopy[name].value = value; // updates the value inside the formCopy

    let rules = formCopy[name].rules
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({ form: formCopy })
  }

  formHasErrors = () => (
    this.state.hasErrors ?
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Invalid e-mail or password. Please check your info.</Text>
      </View>
    :null
  )

  // 192.168.1.3, 192.168.0.102, 192.168.5.182
  async submitLogin() {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      formToSubmit[key] = formCopy[key].value;
    }

    if (isFormValid) {
      await axios.post('http://192.168.5.182:8080/sessions', formToSubmit,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(async (response) => {
        this.setState({ statusCode: response.status });
        let responseData = response.data;
        let responseArray = responseData.split('.');
        await AsyncStorage.multiSet([['@token:key', responseArray[0]], ['@userID:key', responseArray[1]]]).catch(error => console.log(error));
        if (response.status === 200) {
          LoadTabs(0);
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.data === 'E-mail and password do not match.') {
          this.setState({ loginWarning: 'E-mail address and password do not match.' });
        } else {
          this.setState({ loginWarning: 'Something went wrong. (Please check if you correctly entered your address.)' });
        }
      });
    } else {
      this.setState({ hasErrors: true })
    }
  }

  render() {
    return (
      <View style={styles.formInputContainer}>
        <Input
          placeholder='Your E-mail Address'
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput('email', value)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />

        <Input
          placeholder='Your Password'
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput('password', value)}
          secureTextEntry
        />
        
        <Text style={styles.errorLabel}>{this.state.loginWarning}</Text>
        {this.formHasErrors()}

        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <Button
            title='Log In'
            color='#009999'
            onPress={this.submitLogin.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400,
    marginHorizontal: 20
  },
  errorContainer: {
    marginBottom: 10,
    marginTop: 10
  },
  errorLabel: {
    color: 'red',
    fontFamily: 'Roboto-Black',
    fontSize: 15
  }
});
