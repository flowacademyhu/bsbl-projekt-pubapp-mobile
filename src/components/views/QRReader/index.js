import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import TodoDetail from './TodoDetail';

class QRReader extends Component {

  state = {
    todos: []
  }

  componentWillMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => this.setState({ todos: response.data }))
      .catch(error => {
        console.log(error)
      });
  }

  renderTodos() {
    return this.state.todos.map(todo =>
      <TodoDetail key={todo.id} todo={todo} />);
  }

  render() {
    return (
      <ScrollView>
        {this.renderTodos()}
      </ScrollView>
    );
  }
}

export default QRReader;
