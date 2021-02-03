import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context'

export default class LogOutUser extends Component {

    state = {
        redirect: false
    }

    LogOut = () => {
        this.context.logout();
        this.setState({ redirect: true })
    }

    render() {

        return (
            <Link to='/' className="button" onClick={this.LogOut}>Logout</Link>

        )
    }
}
LogOutUser.contextType = AuthContext;