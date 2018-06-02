import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import QRReader from './QRReaderComponent/QRReader';
import axios from 'axios';

export default class QRHome extends Component {
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
      <QRReader />
    );
  }

}
