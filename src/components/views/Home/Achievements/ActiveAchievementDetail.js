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
    <View>
      <Text>{name} ({id})</Text>
      <Text>{description}</Text>
      <Text>XP: {xpValue}</Text>
      <Text>Expiration: {expiration}</Text>
    </View>
  );
};

const styles = {};
export default ActiveAchievementDetail;
