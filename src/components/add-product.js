import React, {Component} from 'react';
import axios from 'axios'

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prodId: 0,
            name: '',
            price: 0,
            discount: 0,
            comments: '',
            ratings: 0,
        }
    }

    onChangeProdId = event => {
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

    onSubmit = event => {
        event.preventDefault();

        const product = {
            prodId: this.state.prodId,
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            comments: this.state.comments,
            ratings: this.state.ratings
        };

        console.log(product);

        axios.post('http://localhost:5000/products/add', product)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/';
    };

    render() {
        return(

            <div>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product ID: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.prodId}
                            onChange={this.onChangeProdId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary" />
                    </div>
                </form>

                <form action="http://localhost:5000/images/add" method="POST" encType="multipart/form-data"  >
                    <div className="custom-file mb-3">
                        <input type="file" name="file" id="file" className="custom-file-input"/>
                        <label htmlFor="file" className="custom-file-label">Choose Image File</label>
                    </div>
                    <input type="submit" value="submit" className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}

export default AddProduct