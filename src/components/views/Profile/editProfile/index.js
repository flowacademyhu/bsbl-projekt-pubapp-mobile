import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, ScrollView } from 'react-native';

import EditPofileForm from './EditProfileForm'

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    modal: false
  }

  handleModal = () => {
    this.setState({
      modal: !this.state.modal ? true : false
    })
  }

  render() {
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
              <EditPofileForm 
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              nickname={this.props.nickname}
              email={this.props.email}
              gender={this.props.gender}
              dateOfBirth={this.props.dateOfBirth}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title='Submit'
                color='#009999'
              />
              <Text />
              <Button
                title='Cancel'
                onPress={this.handleModal}
                color='#009999'
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    )
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
    justifyContent: 'flex-end',
    margin: 10
  }
});