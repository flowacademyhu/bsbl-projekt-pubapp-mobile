import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const input = (props) => {
  let template = null;
  switch (props.type) {
    case 'textinput':
      template =
        <TextInput
          underlineColorAndroid='transparent'
          {...props}
          style={styles.input}
        />;
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 25,
    padding: 5,
    marginTop: 5,
    marginBottom: 25,
    fontFamily: 'RobotoCondensed-Regular',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea'
  }
});

export default input;
