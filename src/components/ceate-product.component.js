import React, { Component } from 'react';
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
      type: '',
      description:'',
      link:'',
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
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
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
            <input  type="text"
                required
                className="form-control"
                value={this.state.type}
                onChange={this.onChangeType}
                />
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