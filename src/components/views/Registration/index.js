import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import RegistrationForm from './RegistrationForm';

export default class RegistrationPage extends Component {
  render () {
    return (
      <ScrollView>
        <View>
          <RegistrationForm />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
