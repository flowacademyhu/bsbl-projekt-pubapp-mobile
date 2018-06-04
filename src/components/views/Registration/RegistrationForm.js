import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import DatePicker from 'react-native-datepicker';

import Input from '../../utils/inputs';
import ValidationRules from '../../utils/validationRules';

import axios from 'axios';

export default class RegistrationForm extends Component {

  state = {
    hasErrors: false,
    form: {
      firstName: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isValidFirstName: true
        }
      },
      lastName: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isValidLastName: true
        }
      },
      nickName: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isValidNickName: true
        }
      },
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
          minLength: 5,
          isPswFormatValid: true
        }
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          confirmPass: 'password'
        }
      },
      gender: {
        value: '',
        valid: false,
        rules: {
          isRequired: true
        }
      },
      dob: {
        value: '',
        valid: false,
        rules: {
          isRequired: true
        }
      },
      role: {
        value: 'USER',
        valid: true
      }
    },
  };

  updateInput = (name, value) => {
    this.setState({ hasErrors: false });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({ form: formCopy });
  }

  onSelect(index, value) {
    let formCopy = this.state.form;
    if (value === 'male') {
      formCopy['gender'].value = true;
      formCopy['gender'].valid = true;
    } else if (value === 'female') {
      formCopy['gender'].value = false
      formCopy['gender'].valid = true;
    }
    this.setState({form: formCopy});
  }

  openLoginPage = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'PubApp.Login',
        title: 'Login',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }

  formHasErrors = () => (
    this.state.hasErrors ?
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Invalid field(s). Please check your info.</Text>
      </View>
    :null
  )

  // 192.168.1.3, 192.168.0.102, 192.168.5.182
  async onSubmitForm() {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      formToSubmit[key] = formCopy[key].value;
    }

    console.log(formCopy);

    if (isFormValid) {
      await axios.post('http://192.168.5.182:8080/users',
        formToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.openLoginPage();
          }
        })
        .catch(error => {
          console.log(error)
          alert('Ooops, something went wrong. Please try again.')
        });
    } else {
      this.setState({ hasErrors: true })
    }
  }

  render() {
    return (
      <View>
        <Text>First Name:</Text>
        <Input
          placeholder='Your First Name'
          type={this.state.form.firstName.type}
          value={this.state.form.firstName.value}
          onChangeText={value => this.updateInput('firstName', value)}
          autoCapitalize={'words'}
          maxLength={15}
        />

        <Text>Last Name:</Text>
        <Input
          placeholder='Your Last Name'
          type={this.state.form.lastName.type}
          value={this.state.form.lastName.value}
          onChangeText={value => this.updateInput('lastName', value)}
          autoCapitalize={'words'}
          maxLength={15}
        />

        <Text>Nickname:</Text>
        <Input
          placeholder='Choose a Nickname'
          type={this.state.form.nickName.type}
          value={this.state.form.nickName.value}
          onChangeText={value => this.updateInput('nickName', value)}
          autoCapitalize={'words'}
          maxLength={15}
        />

        <Text>E-mail Address:</Text>
        <Input
          placeholder='Your E-mail Address'
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput('email', value)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />

        <Text>Password:</Text>
        <Input
          placeholder='Enter Password'
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput('password', value)}
          secureTextEntry
        />

        <Text>Confirm Password:</Text>
        <Input
          placeholder='Re-enter Password'
          type={this.state.form.confirmPassword.type}
          value={this.state.form.confirmPassword.value}
          onChangeText={value => this.updateInput('confirmPassword', value)}
          secureTextEntry
        />

        <Text>Gender:</Text>
        <RadioGroup
          color='#009999'
          style={styles.radios}
          onSelect={(index, value) => this.onSelect(index, value)} >
          <RadioButton value='female'>
            <Text>Female</Text>
          </RadioButton>
          <RadioButton value='male'>
            <Text>Male</Text>
          </RadioButton>
        </RadioGroup>

        <Text>Date of Birth:</Text>
        <DatePicker
          style={styles.datepicker}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          minDate='1980-01-01'
          date={this.state.form.dob.value}
          androidMode='spinner'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {
            let formCopy = this.state.form;
            formCopy['dob'].value = date;
            formCopy['dob'].valid = true;
            this.setState({ form: formCopy });
          }}
        />
        {this.formHasErrors()}
        <View>
          <Button
            title='Submit'
            color='#009999'
            onPress={this.onSubmitForm.bind(this)}
          />
          <Text />
          <Button
            title='Cancel'
            color='#009999'
            onPress={this.openLoginPage.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    marginTop: 10
  },
  errorLabel: {
    color: 'red',
    fontFamily: 'Roboto-Black',
    fontSize: 15
  },
  radios: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 25,
    marginBottom: 5
  },
  datepicker: {
    width: '75%',
    marginTop: 10,
    marginHorizontal: 40,
    marginBottom: 10
  }
});