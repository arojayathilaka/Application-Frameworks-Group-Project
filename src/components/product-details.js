import React, {Component} from "react";
import axios from 'axios'

class Product extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            discount: 0,
            comments: '',
            ratings: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(res =>
                this.setState({
                    name: res.data.name,
                    price: res.data.price,
                    discount: res.data.discount,
                    comments: res.data.comments,
                    ratings: res.data.ratings
                }))
            .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <h2>{this.state.name}</h2>
                <h2>{this.state.price}</h2>
            </div>

        )
    }
}

export default Product