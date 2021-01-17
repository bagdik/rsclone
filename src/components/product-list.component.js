import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.product.username}</td>
    <td>{props.product.description}</td>
    <td><iframe src={props.product.link} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen></iframe></td>
    {/* <td>{props.product.date.substring(0,10)}</td> */}
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.product._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

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

  exerciseList() {
    return this.state.product.map(currentproduct => {
      return <Exercise product={currentproduct} deleteExercise={this.deleteExercise} key={currentproduct._id}/>;
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
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
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