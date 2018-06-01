import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import DatePicker from 'react-native-datepicker';

import axios from 'axios';

export default class RegistrationForm extends Component {
  
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

  constructor (props) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      gender: undefined,
      dob: '1980-01-01'
    };
  }

  onChangeFirstName (value) {
    this.setState({ firstName: value });
  }

  onChangeLastName (value) {
    this.setState({ lastName: value });
  }

  onChangeNickname (value) {
    this.setState({ nickname: value });
  }

  onChangeEmail (value) {
    this.setState({ email: value });
  }

  onChangePassword (value) {
    this.setState({ password: value });
  }

  onChangeConfirmPassword (value) {
    this.setState({ confirmPassword: value });
  }

  onSelect (index, value) {
    if (value === 'male') {
      this.setState({ gender: true });
    } else {
      this.setState({ gender: false });
    }
  }

  async onButtonTouch () {
    await axios.post('http://192.168.5.182:8080/users',
      {
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        nickName: this.state.nickname,
        email: this.state.email,
        dob: this.state.dob,
        gender: this.state.gender,
        role: 'USER'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => this.setState({ statusCode: response.status }))
      .catch(error => console.log(error));

    if (this.state.statusCode === 200) {
      this.openLoginPage();
    } else {
      alert('Ooops, something went wrong.')
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.wrapper}>

          <Text style={styles.labels}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={this.state.firstName}
            onChangeText={this.onChangeFirstName.bind(this)} />

          <Text style={styles.labels}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={this.state.lastName}
            onChangeText={this.onChangeLastName.bind(this)} />

          <Text style={styles.labels}>Nickname:</Text>
          <TextInput
            style={styles.input}
            value={this.state.nickname}
            onChangeText={this.onChangeNickname.bind(this)} />

          <Text style={styles.labels}>E-mail Address:</Text>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={this.onChangeEmail.bind(this)} />

          <Text style={styles.labels}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.onChangePassword.bind(this)} />

          <Text style={styles.labels}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={this.onChangeConfirmPassword.bind(this)} />

          <Text style={styles.labels}>Gender:</Text>
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

          <Text style={styles.labels}>Date of Birth:</Text>
          <DatePicker
            style={styles.datepicker}
            mode='date'
            placeholder='select date'
            format='YYYY-MM-DD'
            minDate='1900-01-01'
            date={this.state.dob}
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
            onDateChange={(date) => this.setState({ dob: date })}
          />
          <View style={styles.buttons}>
            <Button
              title='Submit'
              color='#009999'
              onPress={this.onButtonTouch.bind(this)}
            />
            <Text />
            <Button
              title='Cancel'
              color='#009999'
              onPress={this.openLoginPage.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginTop: 15
  },
  labels: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'left',
    marginHorizontal: 15
  },
  input: {
    fontSize: 20,
    textAlign: 'left',
    marginHorizontal: 15,
    marginBottom: 5
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
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
});
