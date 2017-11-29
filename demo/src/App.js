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
      ],
      page:'simple', // geodata simple
      isLoading:true
    };
    this.addNewTodoItem = this.addNewTodoItem.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.todoClicked = this.todoClicked.bind(this);
    this.loadTodoData = this.loadTodoData.bind(this);
    this.loadData = this.loadData.bind(this);
    this.todoToogleList = this.todoToogleList.bind(this);
  }

  componentDidMount(){
    this.loadTodoData(this.state.page);
  }

  loadTodoData(page){
    var _this = this;
    var _fetchUri = 'http://localhost:3001/todos';
    if(page !=="simple"){
        _fetchUri = 'http://localhost:3001/geotodos';
        geoGetData((pos)=>{
          if(pos){
                _fetchUri += '/' + pos.coordinates[0] + '/' + pos.coordinates[1];
                _this.loadData(_fetchUri, page);
          }else{
                _fetchUri = 'http://localhost:3001/todos';
                _this.loadData(_fetchUri, "simple");
          }
        }); //emd geodata
      }else{
        _this.loadData(_fetchUri, page);
      }
  }

  loadData(_fetchUri, page){
    var _this = this;
    fetch(_fetchUri)
        .then(function(response){
             return response.json();
        }).then(function(jsonData){
          _this.setState({todos:jsonData,page:page,isLoading:false});
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
  todoToogleList(){
    this.setState({isLoading:true})
    if(this.state.page==="simple"){
      this.loadTodoData("geodata");
    }else{
      this.loadTodoData("simple");
    }

  }

  render() {
    var loadPageBtn = (this.state.isLoading)?
                          (<div className="loading">Cargando</div>):
                          (<div className="toogleBtn">
                            <a onClick={this.todoToogleList}>Mostrar {(this.state.page==="simple")?"Mas Cercano":"Todos"}</a>
                          </div>)
    return (
      <div className="App">
        <div className="AppH">
          <TodoHeader title={this.state.title}/>
          <AddTodoItem  addHandler={this.addNewTodoItem}/>
          {loadPageBtn}
        </div>
        <TodoList todos={this.state.todos} todoClicked={this.todoClicked}/>
      </div>
    );
  }
}

export default App;
