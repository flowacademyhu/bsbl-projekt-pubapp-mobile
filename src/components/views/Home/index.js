import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import AchievementTabs from './AchievementTabs';
import QRReader from '../QRReader';

export default class Home extends Component {
  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <AchievementTabs>
            <View title='ACTIVE ACHIEVEMENTS' style={styles.content}>
              <Text style={styles.header}>
              ACTIVE ACHIEVEMENTS
              </Text>
              <QRReader />
            </View>
            <View title='COMPLETED ACHIEVEMENTS' style={styles.content}>
              <Text style={styles.header}>
              COMPLETED ACHIEVEMENTS
              </Text>
            </View>
          </AchievementTabs>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  header: {
    margin: 10,
    color: '#009999',
    fontFamily: 'RobotoCondensed-Light',
    fontSize: 26
  },
  text: {
    marginHorizontal: 20,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Light',
    fontSize: 18
  }
});
