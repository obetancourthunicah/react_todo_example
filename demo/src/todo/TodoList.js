import React, { Component } from 'react';
import TodoListItem from './TodoListItem.js';

export default class TodoList extends Component {
  render() {
    let Lists = this.props.todos.map((item, i)=>{
      return (<TodoListItem key={i} message={item.message} done={item.done} onTodoClicked={this.props.todoClicked.bind(this,item._id)} />);
    });
    //let Lists = this.props.todos.map(function(item, i){});
    return (
      <ul className="todoList">
        {Lists}
      </ul>
    );
  }
}
