import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

import {AuthContext} from '../context/auth.context'


export default class LogOutUser extends Component {
    constructor(props) {
        super(props);

        this.LogOut = this.LogOut.bind(this);
        this.state = {         
          redirect: false,
        }
      }
    LogOut = () =>{
        this.context.logout();
      
     // this.setState({redirect: '/'})
        
        
    }
  render() {
     
      if(!this.props.show){
          return null;
      }
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
    return (  
        <div>
            <button className = "btn" onClick ={this.LogOut}>Logout</button>
      </div>
    )
  }
}
LogOutUser.contextType = AuthContext;