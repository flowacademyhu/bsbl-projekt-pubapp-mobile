import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import CompletedAchievementDetail from './Achievements/CompletedAchievementDetail';

export default class AchievementTabs extends Component {
  state = {
    activeTab: 0
  }

  render({ children } = this.props) {
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {children.map(({ props: { title } }, index) =>
            <TouchableOpacity
              style={[
                styles.tabContainer,
                index === this.state.activeTab ? styles.tabContainerActive : []
              ]}
              onPress={() => this.setState({ activeTab: index })}
              key={index}
            >
              <Text style={styles.tabText}>
                {title}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  tabContainer: {
    flex: 1,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabContainerActive: {
    borderBottomColor: '#009999',
  },
  tabText: {
    color: '#009999',
    fontFamily: 'RobotoCondensed-Light',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1
  }
});

