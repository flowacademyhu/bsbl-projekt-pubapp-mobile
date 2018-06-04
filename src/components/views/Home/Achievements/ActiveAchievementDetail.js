import React from 'react';
import { Text, View } from 'react-native';

const ActiveAchievementDetail = ({ activeAchievement }) => {
  const {
    id,
    created,
    updated,
    name,
    description,
    xpValue,
    expiration
  } = activeAchievement;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.nameText}>{name} ({id})</Text>
      <Text style={styles.descText}>Description {description}</Text>
      <Text style={styles.xpText}>XP: {xpValue} XP</Text>
      <Text style={styles.expText}>Expiration: {expiration}</Text>
    </View>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 35
  },
  nameText: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 30,
    color: '#009999'
  },
  descText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 25,
    color: '#009999'
  },
  xpText: {
    fontFamily: 'RobotoCondensed-Italic',
    fontSize: 20,
    color: '#009999'
  },
  expText: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 15,
    color: '#009999'
  }
};
export default ActiveAchievementDetail;
