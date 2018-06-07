import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';

import axios from '../../utils/loggingOut';

import Input from '../../utils/inputs';
import ValidationRules from '../../utils/validationRules';

import LoadTabs from '../Tabs';

const IP = require('../../utils/ip')

export default class LoginForm extends Component {
  state = {
    hasErrors: false,
    form: {
      email: {
        title: 'E-mail address',
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        title: 'Password',
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

  formHasErrors = (fieldname) => (
    this.state.hasErrors ?
      !this.state.form[fieldname].valid ?
        this.switchError(fieldname)
        : null
      : null
  )

  switchError = (fieldType) => {
    switch (fieldType) {
      case 'email':
        return <Text style={styles.errorLabel}>{this.state.form[fieldType].title} is invalid. Valid format: something@provider.sg or something@provider.stg.</Text>
        break;
      case 'password':
        return <Text style={styles.errorLabel}>{this.state.form[fieldType].title} is invalid. Must be at least 5 characters and must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character.</Text>
        break;
    }
  }
  
  async submitLogin() {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      formToSubmit[key] = formCopy[key].value;
    }

    if (isFormValid) {
      await axios.post('http://' + IP.ip + ':8080/sessions', formToSubmit,
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
        {this.formHasErrors('email')}

        <Input
          placeholder='Your Password'
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput('password', value)}
          secureTextEntry
        />
        {this.formHasErrors('password')}

        <Text style={styles.errorLabel}>{this.state.loginWarning}</Text>

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
