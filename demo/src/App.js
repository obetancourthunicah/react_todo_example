import React, { Component } from 'react';
import './App.css';

//import LandingPage from './lp/LandingPage.js';
import TodoHeader from './todo/TodoHeader.js';
import TodoList from './todo/TodoList.js';
import AddTodoItem from './todo/AddTodoItem.js';
import geoGetData from './todo/GeoData.js';
class App extends Component {
  constructor(){
    super();
    this.state= {
      title:"Todo List V0.1",
      todos:[
      ]
    };
    this.addNewTodoItem = this.addNewTodoItem.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.todoClicked = this.todoClicked.bind(this);
  }

  componentDidMount(){
    var _this = this;
    fetch('http://localhost:3001/todos')
        .then(function(response){
             return response.json();
        }).then(function(jsonData){
          _this.setState({todos:jsonData});
        })
  }

  addNewTodoItem(text){
    var _this = this;
    geoGetData((geoPosition)=>{
      var newTodoObject = {
        text : text
      }
      if(geoPosition){
        newTodoObject.geodata = geoPosition;
      }
      var fetchParam = {
        method:"post",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newTodoObject)
      }
      fetch('http://localhost:3001/newtodo', fetchParam)
        .then(function(response){
          return response.json();
        })
        .then(function(jsonObj){
            _this.setState({"todos":jsonObj});
        });
    });

  }
  todoClicked(id){
    var _this = this;
    var fetchParam = {
      method:"post",
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({"id":id})
    }
    fetch('http://localhost:3001/todo/done', fetchParam)
      .then(function(response){
        return response.json();
      })
      .then(function(jsonObj){
          _this.setState({"todos":jsonObj});
      });
  }

  render() {
    return (
      <div className="App">
        <div className="AppH">
          <TodoHeader title={this.state.title}/>
          <AddTodoItem  addHandler={this.addNewTodoItem}/>
        </div>
        <TodoList todos={this.state.todos} todoClicked={this.todoClicked}/>
      </div>
    );
  }
}

export default App;
