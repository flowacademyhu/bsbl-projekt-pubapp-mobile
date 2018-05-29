import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import axios from 'axios';

import AchievementDetail from './Achievements/AchievementDetail';
import AchievementTabs from './AchievementTabs';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.navigatorEvent);
  }

  state = {
    achievements: []
  }

  componentDidMount() {
    axios.get('apiURL')
      .then(response => this.setState({ achievements: response.data }))
      .catch(error => {
        console.log(error)
      });
  }

  renderAchievements() {
    return this.state.achievements.map(achievement =>
      <AchievementDetail key={achievement.id} achievement={achievement} />);
  }

navigatorEvent = (event) => {
  if (event.type === 'NavBarButtonPress' && event.id === 'MenuButton') {
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true
    });
  }
}

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <AchievementTabs>
            <View title='ACTIVE ACHIEVEMENTS' style={styles.content}>
              <Text style={styles.header}>
              ACTIVE ACHIEVEMENTS
              </Text>
              <ScrollView>
                {this.renderAchievements()}
              </ScrollView>
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
