import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.product.username}</td>
    <td>{props.product.type}</td>
    <td>{props.product.description}</td>
    <td><a  target="_blank" href={props.product.link}>{props.product.link}</a></td>
    {/* <td>{props.product.date.substring(0,10)}</td> */}
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#"  onClick={() => { props.deleteExercise(props.product._id) }}>delete</a>
    </td>
    
    <td> <button className="button" onClick={() => { props.addLike(props.product._id) }}>like</button> {props.product.likes}</td>
    <td><button className="button" onClick = {() => {props.addDislike(props.product._id)}}>dislike</button> {props.product.dislikes}</td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)
    this.addLike = this.addLike.bind(this)
    this.addDislike = this.addDislike.bind(this)

    this.state = {exercises: [],
    product:[]};
  }

  componentDidMount() {
    
      axios.get('http://localhost:5000/product/')
      .then(response => {
        this.setState({ product: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      });

  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/product/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      product: this.state.product.filter(el => el._id !== id)
    })
  }

  addLike(id) {
    axios.post('http://localhost:5000/product/update/likes/'+id)
      .then(response => { console.log(response.data)});
      let arr = this.state.product.filter(el => el._id === id)
      console.log(arr[0]);
      
  }

  addDislike(id) {
    axios.post('http://localhost:5000/product/update/dislikes/'+id)
      .then(response => { console.log(response.data)});
      let arr = this.state.product.filter(el => el._id === id)
      console.log(arr[0]);
 
  }

  exerciseList() {
    return this.state.product.map(currentproduct => {
      return <Exercise product={currentproduct} deleteExercise={this.deleteExercise} addLike={this.addLike} addDislike = {this.addDislike} key={currentproduct._id}/>;
    })
  }

  render() {
    console.log(this.state.product);
    return (
      <div>
        <h3>Materials</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Type</th>
              <th>Description</th>
              <th>Link</th>
              <th>Action</th>
              <th colSpan={2}>Popular</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}