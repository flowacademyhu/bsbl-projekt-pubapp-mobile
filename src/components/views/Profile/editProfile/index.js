import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import EditProfileForm from './EditProfileForm';

export default class EditProfilePage extends Component {
  render () {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <EditProfileForm />
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
