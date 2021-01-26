import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/auth.context'


export default class LogOutUser extends Component {
    // constructor(props) {
    //     super(props);

    //     this.LogOut = this.LogOut.bind(this);
    //     this.state = {         
    //       redirect: false,
    //     }
    //   }
    state = {
        redirect: false
      }
    LogOut = () =>{
        this.context.logout();      
      this.setState({redirect: true})
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
   
  render() {
   
    //    if(!this.props.show){
          
    //         return null ;
    //     }
    return (         
            <Link to = '/' className = "button" onClick ={this.LogOut}>Logout</Link>
      
    )
  }
}
LogOutUser.contextType = AuthContext;