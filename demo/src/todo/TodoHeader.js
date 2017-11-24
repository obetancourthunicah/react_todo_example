import React, { Component } from 'react';

export default class TodoHeader extends Component {
  render() {
    return (
          <h1>{this.props.title}</h1>
    );
  }
}
