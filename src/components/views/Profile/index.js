import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProfileScreen from './ProfileScreen';

export default class Profile extends Component {

  constructor (props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.navigatorEvent);
  }

navigatorEvent = (event) => {
  if (event.type === 'NavBarButtonPress' && event.id === 'LogoutButton') {
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true
    });
  }
}
  
  render () {
    return (
      <View>
        <ProfileScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});