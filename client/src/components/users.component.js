import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import SortMaterials from './sort-materials-list.component';

import '../styles/style.css';

const User = props =>
    <tr>
        <td>{props.user.username}</td>
        <td>{props.user.email}</td>
        <td>{props.user._id}</td>
        <td><a href="#" onClick={() => { props.deleteProduct(props.user._id) }}>delete</a></td>
    </tr>


export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this)


        this.state = { user: [] };
    }

    componentDidMount() {
        axios.get('/users/')
            .then(response => {
                this.setState({ user: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    deleteProduct(id) {
        axios.delete('/users/' + id)
            

        this.setState({
            product: this.state.user.filter(el => el._id !== id)
        })
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

    userList() {
        return this.state.user.map(currentproduct => {
            return <User user={currentproduct} deleteProduct={this.deleteProduct} addLike={this.addLike} addDislike={this.addDislike} key={currentproduct._id} isAdmin={this.context.isAdmin} isAuthenticated={this.context.isAuthenticated} />;
        })
    }
    render() {

        return (
            <div>
                <h3>Materials</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>id</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

UsersList.contextType = AuthContext;