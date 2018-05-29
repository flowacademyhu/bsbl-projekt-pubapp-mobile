import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, ScrollView } from 'react-native';

import EditPofileForm from './EditProfileForm'

export default class EditProfileScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  handleModal = () => {
    this.setState({
      modal: !this.state.modal ? true : false
    });
  }

  render () {
    return (
      <ScrollView style={styles.wrapper}>
        <View>
          <Button
            title='Edit Profile'
            onPress={this.handleModal}
            color='#009999'
          />
          <Modal
            visible={this.state.modal}
            onRequestClose={this.handleModal}
            animationType={'slide'}

          >
            <View>
              <EditPofileForm {...this.props}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title='Cancel'
                onPress={this.handleModal}
                color='#009999'
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '25%',
    flexDirection: 'column',
    margin: 10
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
});
