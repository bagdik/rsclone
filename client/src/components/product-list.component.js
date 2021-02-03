import React, { Component } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import SortMaterials from './sort-materials-list.component';
import Like from '../image/like.png';
import Dislike from '../image/dislike.png';
import '../styles/style.css';

const Material = props => {
  let actionsEditDelite = null;
  let likes = null;
  let dislikes = null;

  if (props.isAdmin) {
    actionsEditDelite = <td>
      <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td>
  }
  if (props.isAuthenticated) {
    likes = <td className="cursor-pointer justify-content-center d-flex flex-column align-items-center">
      <img src={Like} height='30px' alt='Like' onClick={() => { props.addLike(props.product._id) }} />
      <span id="numDislike">{props.product.likes}</span>
    </td>
    dislikes = <td className="cursor-pointer ">
      <img src={Dislike} height='30px' alt='Disike' onClick={() => { props.addDislike(props.product._id) }} />
      <span id="numDislike">{props.product.dislikes}</span>
    </td>
  }
  return (
    <tr>
      <td>{props.product.username}</td>
      <td>{props.product.theme}</td>
      <td>{props.product.type}</td>
      <td>{props.product.description}</td>
      <td><a target="_blank" href={props.product.link}>{props.product.link}</a></td>
      {actionsEditDelite}
      {likes}
      {dislikes}

    </tr>
  )
}

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)
    this.addLike = this.addLike.bind(this)
    this.addDislike = this.addDislike.bind(this)

    this.state = { product: [] };
  }

  componentDidMount() {
    axios.get('/product')
      .then(response => {
        this.setState({ product: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  deleteProduct(id) {
    axios.delete('/product/' + id)
     
    this.setState({
      product: this.state.product.filter(el => el._id !== id)
    })
  }

  addLike(id) {
    axios.post('/product/update/likes/' + id)
      .then(response => {
        this.setState({ product: this.state.product.map((el) => { if (el._id === id) { el.likes++ } return el; }) })

      })

  }

  addDislike(id) {
    axios.post('/product/update/dislikes/' + id)
      .then(response => {
        this.setState({ product: this.state.product.map((el) => { if (el._id === id) { el.dislikes++ } return el; }) })
      });
  }
  SortList = (materials) => {
    axios.get('/product/')
      .then(response => {
        if (materials.theme !== 'All') {
          response.data = response.data.filter(el => el.theme === materials.theme);
        }
        if (materials.type !== 'All') {
          response.data = response.data.filter(el => el.type === materials.type);
        }
        this.setState({ product: response.data })

      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByLikes = () => {
    this.setState({ product: this.state.product.sort((a, b) => b.likes - a.likes) });
  }
  sortByPopular = () => {
    this.setState({ product: this.state.product.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes)) });
  }

  materialList() {
    return this.state.product.map(currentproduct => {
      return <Material product={currentproduct} deleteProduct={this.deleteProduct} addLike={this.addLike} addDislike={this.addDislike} key={currentproduct._id} isAdmin={this.context.isAdmin} isAuthenticated={this.context.isAuthenticated} />;
    })
  }

  render() {
    let tableAction = this.context.isAdmin ? <th scope="col">Action</th> : null;

    return (
      <div>
        <h3>Materials</h3>
        <SortMaterials action={this.SortList} sortLikes={this.sortByLikes} sortPopular={this.sortByPopular} />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Username</th>
              <th scope="col" className='col-sm-0'>Theme</th>
              <th scope="col">Type</th>
              <th scope="col-3">Description</th>
              <th scope="col-3">Link</th>
              {tableAction}
              <th scope="col-2" colSpan={2}>Popular</th>
            </tr>
          </thead>
          <tbody>
            {this.materialList()}
          </tbody>
        </table>
      </div>
    )
  }
}

ProductList.contextType = AuthContext;