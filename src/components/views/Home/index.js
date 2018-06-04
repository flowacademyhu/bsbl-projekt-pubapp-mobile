import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';

import AchievementTabs from './AchievementTabs';
import CompletedAchievementDetail from './Achievements/CompletedAchievementDetail';
import ActiveAchievementDetail from './Achievements/ActiveAchievementDetail';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.navigatorEvent);
    this.state = {
      completedAchievements: [],
      activeAchievements: []
    }
  }

  async componentWillMount() {
    const userID = await AsyncStorage.getItem('@userID:key');
    const token = await AsyncStorage.getItem('@token:key');

    let config = {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    
    await axios.get('http://192.168.1.3:8080/users/' + userID + '/user_achievements', { headers: config })
      .then(response => this.setState({ completedAchievements: response.data } ))
      .catch(error => console.log(error.response));

      
      await axios.get('http://192.168.1.3:8080/achievements/active', { headers: config })
      .then(response => this.setState({ activeAchievements: response.data } ))
      .catch(error => console.log(error.response));
    
  }

  renderCompletedAchievements() {
    return this.state.completedAchievements.map(completedAchievement =>
      <CompletedAchievementDetail key={completedAchievement.id} completedAchievement={completedAchievement} />);
  }

  renderActiveAchievements() {
    return this.state.activeAchievements.map(activeAchievement =>
      <ActiveAchievementDetail key={activeAchievement.id} activeAchievement={activeAchievement} />);
  }

  navigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress' && event.id === 'LogoutButton') {
      this.props.navigator.toggleDrawer({
        side: 'right',
        animated: true
      });
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <AchievementTabs>
            <View title='ACTIVE ACHIEVEMENTS' style={styles.content}>
              <Text style={styles.header}>
                ACTIVE ACHIEVEMENTS
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.renderActiveAchievements()}
              </ScrollView>
            </View>
            <View title='COMPLETED ACHIEVEMENTS' style={styles.content}>
              <Text style={styles.header}>
                COMPLETED ACHIEVEMENTS
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.renderCompletedAchievements()}
              </ScrollView>
            </View>
          </AchievementTabs>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 26
  }
});
