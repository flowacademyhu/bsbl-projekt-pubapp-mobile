import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import DatePicker from 'react-native-datepicker';

export default class RegistrationForm extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.labels}>First Name:</Text>
          <TextInput
            style={styles.input} />
          <Text style={styles.labels}>Last Name:</Text>
          <TextInput
            style={styles.input} />
          <Text style={styles.labels}>Nickname:</Text>
          <TextInput
            style={styles.input} />
          <Text style={styles.labels}>E-mail Address:</Text>
          <TextInput
            style={styles.input} />
          <Text style={styles.labels}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true} />
          <Text style={styles.labels}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true} />
          <Text style={styles.labels}>Gender:</Text>
          <RadioGroup color='#009999' style={styles.radios}>
            <RadioButton>
              <Text>Male</Text>
            </RadioButton>
            <RadioButton>
              <Text>Female</Text>
            </RadioButton>
          </RadioGroup>
          <Text style={styles.labels}>Date of Birth:</Text>
          <DatePicker
            style={styles.datepicker}
            mode='date'
            placeholder='select date'
            format='YYYY-MM-DD'
            minDate='1900-01-01'
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
  labels: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'left',
    marginHorizontal: 15
  },
  input: {
    fontSize: 15,
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
    marginHorizontal: 40
  }
});
