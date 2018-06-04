import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import RegistrationForm from './RegistrationForm';

export default class RegistrationPage extends Component {
  render () {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <RegistrationForm />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 15
  }
});
