import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class SideDrawer extends Component {
  render () {
    return (
      <View>
        <Button
          title='Log out'
          color='#009999'
          onPress={() => alert('Signed out')} />
      </View>
    );
  }
}
