import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AchievementDetail = ({ achievement }) => {
  const {
    id,
    name,
    description,
    xp_value,
    expiration
  } = achievement;

  return (
    <View>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{xp_value}</Text>
      <Text>{expiration}</Text>
    </View>
  );
};

export default AchievementDetail;
