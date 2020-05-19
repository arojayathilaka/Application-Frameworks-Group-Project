import React, {Component} from 'react';
import axios from 'axios';

class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            discount: 0,
            allProducts: [],
            imageIDs: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(res => {
                this.setState({allProducts: res.data})
            })
            .catch(err => {
                console.error(err)
            });

        axios.get('http://localhost:5000/images')
            .then(res => {
                console.log(res.data);
                const imageIDs = [];
                res.data.forEach(image => {
                    imageIDs.push(image._id);
                });
                this.setState({
                    imageIDs: imageIDs
                })
            });
    }

    deleteProduct = id => {
        axios.delete('http://localhost:5000/products/delete/' + id)
            .then(res => {
                console.log(res.data);
                alert('Product Image Deleted!')
            })
            .catch(err => console.error(err));

        this.setState({
            allProducts: this.state.allProducts.filter(product => product._id !== id)
        })
    };

    deleteProductImage = id => {
        axios.delete('http://localhost:5000/images/delete/' + id)
            .then(res => {
                console.log(res.data);
                alert('Product Image Deleted!')
            })
            .catch(err => console.error(err));
    };

    render() {
        const products = this.state.allProducts.filter(product => (product.category === this.props.match.params.category));
        return(
            <div>
                <h2>Products List</h2>
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td>
                                <a
                                    href={'/edit/'+ product._id}
                                    className="btn btn-secondary"
                                >
                                    Edit
                                </a> | <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteProductImage(this.state.imageIDs[product.prodId-1])}
                                >
                                    Delete Product Image
                                </button> | <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteProduct(product._id)}
                                >
                                    Delete Product
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default ProductsList