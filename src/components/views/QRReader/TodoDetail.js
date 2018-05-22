import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TodoDetail = ({ todo }) => {

  const {
    userId,
    id,
    title,
    completed
  } = todo;

  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
      <Text>Completed: {completed}</Text>
    </View>
  );
};

export default TodoDetail;
