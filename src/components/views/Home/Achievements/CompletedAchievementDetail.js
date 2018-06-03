import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CompletedAchievementDetail = ({ achievement }) => {
  const {
    id,
    name,
    description,
    xpValue,
    expiration
  } = achievement;

  return (
    <View>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{xpValue}</Text>
      <Text>{expiration}</Text>
    </View>
  );
};
