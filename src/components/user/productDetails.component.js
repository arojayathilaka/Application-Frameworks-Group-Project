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
            prodId: 0,
            nickname: "",
            comments: "",
            ratings: 0
        }
    }

    onChangeNickname = event => {
        this.setState({
            nickname: event.target.value
        });
        console.log(this.state.comments)
    };

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
                    discount: res.data.discount,
                    // comments: res.data.comments,
                    // ratings: res.data.ratings
                })
            })

        axios.get('http://localhost:5000/productDetails/')
            .then(res => {
                this.setState({
                    nicknameget: res.data.nickname,
                    commentsget: res.data.comments,
                    ratingsget: res.data.ratings
                })
            })

        console.log(this.state.prodId)
        console.log(this.state.category)
        console.log(this.state.comments)
        console.log(this.state.ratings)
    }


    onSubmit = e => {
        e.preventDefault();
        console.log(this);
        console.log(this.state.prodId);
        console.log(this.state.comments);
        console.log(this.state.ratings);
        const commentRating = {
            prodId: this.state.prodId,
            nickname: this.state.nickname,
            comments: this.state.comments,
            ratings: this.state.ratings
        };

        console.log(commentRating);
        axios.post('http://localhost:5000/productDetails/add', commentRating)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <h2 align="center">Product Name : {this.state.name}</h2>
                <hr/><br/><br/>
                <h3><u>Product Details</u></h3><br/>
                <h4 align="left">Product Price : {this.state.price} Rps.</h4>
                <h4 align="left">Product Category : {this.state.category}</h4>
                <h4 align="left">Product Discount : {this.state.discount} Rps.</h4>
                <h4 align="left">Average User Rating : __</h4>
                <br/><br/><hr/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Nickname * </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.nickname}
                               onChange={this.onChangeNickname}/>
                    </div>
                    <div className="form-group">
                        <label> Comment * </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.comments}
                               onChange={this.onChangeComments}/>
                    </div>
                    <div className="form-group">
                        <label> Ratings * </label>
                        <br/>
                        <select id="lang" onChange={this.onChangeRatings} value={this.state.value}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit Review & Ratings" className="btn btn-primary"/>
                    </div>
                    <hr/>
                    <br/>
                    <h3><u>User Ratings and Comments</u></h3>
                    <br/>
                    <h4 align="left">Nickname : {this.state.nickname}</h4>
                    <h4 align="left">Comment : {this.state.comments}</h4>
                    <h4 align="left">Rating : {this.state.ratings}</h4>
                    <br/>
                    <hr/>
                </form>
            </div>
        )
    }
}

export default Product