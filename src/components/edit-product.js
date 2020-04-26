import React, {Component} from "react";
import axios from 'axios'

class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prodId: 0,
            name: '',
            price: 0,
            discount: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(res =>
                this.setState({
                    prodId: res.data.prodId,
                    name: res.data.name,
                    price: res.data.price,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                }))
            .catch(err => console.log(err));
    }

    onChangeId = event => {
        this.setState({
            prodId: event.target.value
        })
    };

    onChangeName = event => {
        this.setState({
            name: event.target.value
        })
    };

    onChangePrice = event => {
        this.setState({
            price: event.target.value
        })
    };

    onChangeDiscount = event => {
        this.setState({
            discount: event.target.value
        })
    };


    onSubmit = event => {
        event.preventDefault();

        const product = {
            prodId: this.state.prodId,
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount
        };

        console.log(product);

        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, product)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        //window.location = '/';
    };

    render() {
        return(
            <div>
                <h3>Edit Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product ID: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.prodId}
                                onChange={this.onChangeId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.discount}
                            onChange={this.onChangeDiscount}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditProduct