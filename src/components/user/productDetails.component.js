import React, {Component} from "react";
import axios from 'axios'

class Product extends Component{

    constructor(props) {
        super(props);
        // this.onChangeComments = this.onChangeComments.bind(this);
        // this.onChangeRatings = this.onChangeRatings.bind(this);
        // this.onChangeName = this.onChangeName.bind(this);
        // this.onChangePrice = this.onChangePrice.bind(this);
        // this.onChangeDiscount = this.onChangeDiscount.bind(this);

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

    // onChangeName(e){
    //     this.setState({
    //         name: e.target.value
    //     })
    // }
    //
    // onChangePrice(e){
    //     this.setState({
    //         price: e.target.value
    //     })
    // }
    //
    // onChangeDiscount(e){
    //     this.setState({
    //         discount: e.target.value
    //     })
    // }

    onChangeComments = event => {
        this.setState({
            comments: event.target.value
        });
        console.log(this.state.comments)
    };

    // onChangeComments(e){
    //     this.setState({
    //         comments: e.target.value
    //     })
    // }

    onChangeRatings = event => {
        this.setState({
            ratings: event.target.value
        });
        console.log(this.state.ratings)
    };

    // onChangeRatings(e){
    //     this.setState({
    //         ratings: e.target.value
    //     })
    // }

    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    category: res.data.category,
                    prodId: res.data.prodId,
                    name: res.data.name,
                    price: res.data.price,
                    discount: res.data.discount,
                    comments: res.data.comments,
                    ratings: res.data.ratings
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
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.ratings}
                               onChange={this.onChangeRatings}/>
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