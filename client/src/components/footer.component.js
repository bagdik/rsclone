import React, { Component } from 'react';
import Logo from '../image/logo.png'

export default class Footer extends Component {

    render() {
        return (
            <div className="d-flex container justify-content-between">
                <img src={Logo} alt="rs scool" height="50px"/>
                <div>
                    <p>Bobrov Sergey</p>
                    <a href="https://github.com/bobrovsi1988/rs-clone">GitHub</a>
                </div>
                
            </div>
        )
    }
}