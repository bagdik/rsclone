import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      type: 'Video',
      description:'',
      link:'',
      redirect: false,
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeLink(e) {
    this.setState({
      link: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    
    const product = {
      username: this.state.username,
        type: this.state.type,
        description: this.state.description,
        link: this.state.link
    }

    console.log(product);

    axios.post('http://localhost:5000/product/add', product)
      // .then(res => console.log(res.data))
      .then(() => this.setState({ redirect: "/productlist" }));
    
    

  }
  

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (      
      <div>
        
        <h3>Create Material</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            <label>Type: </label>
            <select 
                className="form-control"
                defaultValue='Video'
                onChange={this.onChangeType}
                required            
                >
                  <option  value='Video'>Video</option>
                  <option value='Link'>Link</option>
                  <option value='Book'>Book</option>

                </select>
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
            <label>Link: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.link}
                onChange={this.onChangeLink}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}