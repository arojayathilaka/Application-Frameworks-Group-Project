import React, {Component} from "react";
import axios from 'axios'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);

class Product extends Component{

    constructor(props) {
        super(props);

        this.state = {
            category: '',
            prodId: 0,
            name: '',
            price: 0,
            discount: 0,
            comments: "",
            ratings: 0
        }
    }

    onChangeComments = event => {
        this.setState({
            comments: event.target.value
        });
        console.log(this.state.comments)
    };

    onChangeRatings = event => {
        this.setState({
            ratings: event.target.value
        });
        console.log(this.state.ratings)
    };

    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    category: res.data.category,
                    prodId: res.data.prodId,
                    name: res.data.name,
                    price: res.data.price,
                    discount: res.data.discount
                })
                console.log(this.state.prodId)
                console.log(this.state.category)
                console.log(this.state.comments)
                console.log(this.state.ratings)
    })
            .catch(err => console.log(err));
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this);
        console.log(this.state.comments)
        console.log(this.state.ratings)
        const commentRating = {
            category: this.state.category,
            prodId: this.state.prodId,
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            comments: this.state.comments,
            ratings: this.state.ratings
        };

        console.log(commentRating);
        axios.put('http://localhost:5000/products/update/' + this.props.match.params.id, commentRating)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <h2 align="center">{this.state.name}</h2>
                <h2 align="center">{this.state.price}</h2>
                <h2 align="center">{this.state.category}</h2>
                <h2 align="center">{this.state.prodId}</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Comments: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.comments}
                               onChange={this.onChangeComments}/>
                    </div>
                    <div className="form-group">
                        <label> Ratings 1-5 : </label>
                        <select id="lang" onChange={this.onChangeRatings} value={this.state.value}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*       required*/}
                        {/*       className="form-control"*/}
                        {/*       value={this.state.ratings}*/}
                        {/*       onChange={this.onChangeRatings}/>*/}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit Comments & Ratings" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        )
    }
}

export default Product