import React, { Component } from 'react';

export default class ErrorMessage extends Component { 
    
  render() {
    return (
      <div>
       <p>{this.props.message}</p>
      </div>
    )
  }
}