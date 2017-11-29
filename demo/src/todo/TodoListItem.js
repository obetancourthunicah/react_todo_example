import React, { Component } from 'react';

export default class TodoListItem extends Component {
  constructor(){
    super();
    this.state = {
      showGeo:false
    }
  }
  render() {

    var style = {"cursor":"pointer","position":"relative"};
    if (this.props.done)style.textDecoration="line-through";

    var geoRender = null;
    var geoToggle= null;
    if(this.props.geodata){
      geoToggle = (<a style={{position:"absolute",right:"16px",width:"32px"}}
                    onClick={((e)=>{ e.preventDefault();e.stopPropagation();
                      this.setState({showGeo:!this.state.showGeo});
                    })}>{(this.state.showGeo)?"X":">"}</a>);
    }
    if(this.props.geodata && this.state.showGeo){
      let uri = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBOd_cgTpvATNaeGV3RvjYL5K3jxHrNZdU&q=";
      uri += this.props.geodata.coordinates[1]; //latitud
      uri += "," + this.props.geodata.coordinates[0]; //longitud
      geoRender =
        (<div style={{marginTop:"16px"}}><iframe
              title="Map position"
              width="100%" height="240"
              frameBorder="0" style={{border:0}}
              src={uri} allowFullScreen
          >
        </iframe></div>);
    }
    return (
      <li style={style} onClick={this.props.onTodoClicked}>
          {this.props.message||"Vacio"}
          {geoToggle}
          {geoRender}
        </li>
    );
  }
}


//AIzaSyBOd_cgTpvATNaeGV3RvjYL5K3jxHrNZdU
