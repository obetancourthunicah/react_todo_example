import React, { Component } from 'react';

export default class AddTodoItem extends Component {
  constructor(){
    super();
    this.state={
      newTodo:""
    }
    this.onbuttonClick = this.onbuttonClick.bind(this);
    this.onChanged = this.onChanged.bind(this);
  }
  onChanged(input){
    let isNumber = /^[A-Za-z\s]*$/;
    if(isNumber.test(input.target.value)){

        this.setState({newTodo:input.target.value.toLowerCase()});
    }
  }
  onbuttonClick(e){
    //let newTodo = this._todo.value;
    //this.props.addHandler(newTodo);
    this.props.addHandler(this.state.newTodo);
  }
  render() {
    return (
      <div>
        <input type="text"
                placeholder="New TODO ITEM"
                onChange={this.onChanged}
                value={this.state.newTodo}
        />
        <button onClick={this.onbuttonClick}>+</button>
      </div>
    );
    /* // Formato No Controlado
    return (
      <div>
        <input type="text"
                placeholder="New TODO ITEM"
                ref={(input)=>{this._todo = input}}
        />
        <button onClick={this.onbuttonClick}>+</button>
      </div>
    );
    */
  }
}
