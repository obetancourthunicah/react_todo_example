import React, { Component } from 'react';

export default class TodoListItem extends Component {
  render() {
    var style = (this.props.done)?{"textDecoration":"line-through","cursor":"pointer"}:{"cursor":"pointer"};
    return (
      <li style={style} onClick={this.props.onTodoClicked}>{this.props.message}</li>
    );
  }
}
