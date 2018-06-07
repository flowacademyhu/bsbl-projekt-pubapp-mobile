import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, AsyncStorage } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import DatePicker from 'react-native-datepicker';

import LoadTabs from '../../Tabs';

import axios from '../../../utils/loggingOut';

const IP = require('../../../utils/ip');

export default class EditProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrors: false,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      gender: undefined,
      dob: undefined,

      newPassword: '',
      conNewPassword: undefined,

      warning: undefined
    };
  }

  async componentDidMount () {
    const userID = await AsyncStorage.getItem('@userID:key');
    const token = await AsyncStorage.getItem('@token:key');

    let config = {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    await axios.get('http://' + IP.ip + ':8080/users/' + userID, { headers: config })
      .then(response => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          nickname: response.data.nickName,
          email: response.data.email,
          dob: response.data.dob,
          gender: response.data.gender
        });
      })
      .catch(error => console.log(error.response));
  }

  async onSubmit () {
    const userID = await AsyncStorage.getItem('@userID:key');
    const token = await AsyncStorage.getItem('@token:key');

    let config = {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    if (this.state.password !== undefined) {
      await axios.put('http://' + IP.ip + ':8080/users/' + userID,
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          nickName: this.state.nickname,
          oldPassword: this.state.password,
          email: this.state.email,
          dob: this.state.dob,
          gender: this.state.gender,
          newPassword: this.state.newPassword
        },
        { headers: config })
        .then(response => {
          console.log(response.data);
          LoadTabs(1);
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.data === 'Incorrect password.') {
            this.setState({ warning: 'Incorrect password.' });
          } else {
            this.setState({ warning: 'Something went wrong.' });
          }
        });
    } else {
      this.setState({ warning: 'You must enter your password to modify your data.' });
    }
  }

  onCancel () {
    LoadTabs(1);
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
    this.setState({ newPassword: value });
  }

  onChangeConfirmPassword (value) {
    this.setState({ conNewPassword: value });
  }

  onFillInOldPassword (value) {
    this.setState({ password: value });
  }

  onSelect (index, value) {
    if (value === 'male') {
      this.setState({ gender: 1 });
    } else {
      this.setState({ gender: 0 });
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.title}>EDIT YOUR PROFILE</Text>
          <Text style={styles.labels}>First Name:</Text>
          <TextInput
            style={styles.input}
            defaultValue={this.state.firstName}
            onChangeText={this.onChangeFirstName.bind(this)} />

          <Text style={styles.labels}>Last Name:</Text>
          <TextInput
            style={styles.input}
            defaultValue={this.state.lastName}
            onChangeText={this.onChangeLastName.bind(this)} />

          <Text style={styles.labels}>Nickname:</Text>
          <TextInput
            style={styles.input}
            defaultValue={this.state.nickname}
            onChangeText={this.onChangeNickname.bind(this)} />

          <Text style={styles.labels}>E-mail Address:</Text>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            defaultValue={this.state.email}
            onChangeText={this.onChangeEmail.bind(this)} />

          <Text style={styles.labels}>Gender:</Text>
          <RadioGroup
            color='#009999'
            style={styles.radios}
            selectedIndex={this.state.gender}
            onSelect={(index, value) => this.onSelect(index, value)} >
            <RadioButton value='female'>
              <Text style={{
                color: '#009999',
                fontFamily: 'RobotoCondensed-Bold'
              }}>Female</Text>
            </RadioButton>
            <RadioButton value='male'>
              <Text style={{
                color: '#009999',
                fontFamily: 'RobotoCondensed-Bold'
              }}>Male</Text>
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

          <Text style={styles.labels}>New Password (Optional):</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            defaultValue={this.state.newPassword}
            onChangeText={this.onChangePassword.bind(this)} />

          <Text style={styles.labels}>Confirm New Password (Optional):</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            defaultValue={this.state.conNewPassword}
            onChangeText={this.onChangeConfirmPassword.bind(this)} />

          <Text style={styles.labels}>Password (Required to change any data):</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            defaultValue={this.state.password}
            onChangeText={this.onFillInOldPassword.bind(this)} />

          <Text style={styles.errorLabel}>{this.state.warning}</Text>

        </View>
        <View style={styles.buttons}>
          <Button
            title='Submit'
            onPress={this.onSubmit.bind(this)}
            color='#009999'
          />
          <Text />
          <Button
            title='Cancel'
            onPress={this.onCancel.bind(this)}
            color='#009999'
          />
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
  title: {
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 25,
    color: '#009999',
    marginBottom: 10
  },
  labels: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Bold',
    textAlign: 'left',
    marginBottom: 5,
    color: '#009999'
  },
  input: {
    width: '100%',
    fontSize: 25,
    padding: 5,
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'RobotoCondensed-Regular',
    borderBottomWidth: 2,
    borderBottomColor: '#009999',
    color: '#009999'
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
  errorLabel: {
    color: 'red',
    fontFamily: 'Roboto-Black',
    fontSize: 15,
    marginBottom: 20
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
});
