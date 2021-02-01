import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/auth.context';
import LogOutUser from './logout.component';

export default class Navbar extends Component {

  render() {
    let userList = null;
    if(this.context.isAdmin){
      userList = <li className="navbar-item">
      <Link to="/userslist" className="nav-link">Users</Link>
      </li>;  
    } 
    
    if(this.context.isAuthenticated){
      return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Materials</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">  
             {userList}
          <li className="navbar-item">
          <Link to="/product" className="nav-link">Create Product</Link>
          </li>
          <li className="navbar-item">
          <Link to="/productlist" className="nav-link">ProductList</Link>
          </li>
          
          <li className="navbar-item">
          <LogOutUser />
          </li>
        </ul>
        </div>
      </nav>
      )
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Materials</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">          
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Sigin in</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/productlist" className="nav-link">ProductList</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
Navbar.contextType = AuthContext;