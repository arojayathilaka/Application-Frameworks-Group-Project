import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Navbar extends Component{
    render() {
        return (
            <nav style={{backgroundColor: "#8E44AD"}} className="navbar navbar-dark navbar-expand-lg">
                <Link to="/nav" className="navbar-brand">Admin / Store Manager Login</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/adminLogin" className="nav-link">Admin Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/smLogin" className="nav-link">Store Managers Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/cartItems" className="nav-link">Shopping Cart</Link>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}
export default Navbar;