import React, { Component } from 'react';

class LandingPage extends Component {
  render(){
    return (
        <p>
          {this.props.message}
        </p>
    );
  }
} //end class

export default LandingPage;
