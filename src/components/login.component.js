import React, { Component, useContext} from 'react';
import ErrorMessage from './error-message.component';
import axios from 'axios';
import {AuthContext} from '../context/auth.context'


export default class LoginUser extends Component {
  constructor(props) {
    super(props);
    
    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {     
      email: '',
      password: '',
      errorMessage : '',
    }
  }

  
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {     
      email: this.state.email,
      password: this.state.password
    }
    const auth = this.context;
    console.log(auth);
    

    axios.post('http://localhost:5000/users/login/auth', user)
      .then((res, req) => {
          console.log(res.message);
          console.log(req);
        if(res.status === 200){
            //localStorage.setItem('token' , res.data.token);
            console.log(this.context);
            console.log(auth.login(res.data.token, res.data.userId));
            console.log(res.data.userId);
            auth.login(res.data.token, res.data.userId);
        }})
        .catch(
            (error) => {            
            console.log(error.response.data.message)
            this.setState({
                errorMessage: error.response.data.message
            });
            setTimeout(() => {
                this.setState({errorMessage : "" })
              }, 3000);
          });    
  }

  render() {
      console.log(this.context)
      //console.log(AuthContext._currentValue)
    return (
         
      <div>
        <h3>Login</h3>
        <ErrorMessage message = {this.state.errorMessage} />
        <form onSubmit={this.onSubmit}>          
          <div>
            <label>Email: </label>
            <input  type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div>
            <label>password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
LoginUser.contextType = AuthContext;