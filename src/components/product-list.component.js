import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../context/auth.context';
import SortMaterials from './sort-materials-list.component';

const Exercise = props => {
  let actionsEditDelite = null;
  if(props.isAdmin){
    actionsEditDelite =  <td>
    <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#"  onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
  </td>
  } 
  return (
  <tr>
    <td>{props.product.username}</td>
    <td>{props.product.theme}</td>
    <td>{props.product.type}</td>
    <td>{props.product.description}</td>
    <td><a  target="_blank" href={props.product.link}>{props.product.link}</a></td>
    {/* <td>{props.product.date.substring(0,10)}</td> */}
    {actionsEditDelite}
    {/* <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#"  onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td> */}
    
    <td> <button className="button" onClick={() => { props.addLike(props.product._id) }}>like</button> <span id="numLike">{props.product.likes}</span></td>
    <td><button className="button" onClick = {() => {props.addDislike(props.product._id)}}>dislike</button> <span id="numDislike">{props.product.dislikes}</span></td>
  </tr>
)}

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)
    this.addLike = this.addLike.bind(this)
    this.addDislike = this.addDislike.bind(this)

    this.state = {product:[]};
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
  
  

  deleteProduct(id) {
    axios.delete('http://localhost:5000/product/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      product: this.state.product.filter(el => el._id !== id)
    })
  }

  addLike(id) {
    axios.post('http://localhost:5000/product/update/likes/'+id)
    .then(response => {    
      this.setState({ product: this.state.product.map((el) => {if(el._id === id){ el.likes++ } return el;}) })
      
    })
      
  }

  addDislike(id) {
    axios.post('http://localhost:5000/product/update/dislikes/'+id)
      .then(response => {
        this.setState({ product: this.state.product.map((el) => {if(el._id === id){ el.dislikes++ } return el;}) })
      });
     
      
 
  }
  SortList =(materials) => {
    axios.get('http://localhost:5000/product/')
      .then(response => {
        if(materials.theme !== 'All'){
        
          response.data = response.data.filter(el => el.theme === materials.theme);
        }
         
         if(materials.type !== 'All'){
         
          response.data = response.data.filter(el => el.type === materials.type);
          }
        this.setState({ product: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      });            
  }
  
  sortByLikes = () =>{
    this.setState({product: this.state.product.sort((a, b) => b.likes - a.likes)});
  }
  sortByPopular = () =>{
    this.setState({product: this.state.product.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))});
  }
  

  exerciseList() {
    return this.state.product.map(currentproduct => {
      return <Exercise product={currentproduct} deleteProduct={this.deleteProduct} addLike={this.addLike} addDislike = {this.addDislike} key={currentproduct._id} isAdmin = {this.isAdmin()}/>;
    })
  }
  isAdmin(){
    
    if(this.context.userId ===  '600b34dbe842de806057ac6c') {
      return true;
    }
  }

  render() {
    let tableAction = this.isAdmin() ?  <th>Action</th> : null;
 console.log(this.isAdmin());
    return (
      <div>
        <h3>Materials</h3>
        <SortMaterials action = {this.SortList} sortLikes = {this.sortByLikes} sortPopular = {this.sortByPopular}/>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Theme</th>
              <th>Type</th>
              <th>Description</th>
              <th>Link</th>
              {tableAction}
              {/* <th>Action</th> */}
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

ProductList.contextType = AuthContext;