import React, {Component} from 'react';
import axios from 'axios';

class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            discount: 0,
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(res => {
                this.setState({products: res.data})
            })
            .catch(err => {
                console.error(err)
            })
    }

    deleteProduct = id => {
        axios.delete('http://localhost:5000/products/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

        this.setState({
            products: this.state.products.filter(product => product._id !== id)
        })

    };

    render() {
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
                    {this.state.products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td>
                                {/*<Link to={'/edit/'+ product._id}>Edit</Link>*/}
                                <a
                                    href={'/edit/'+ product._id}
                                    className="btn btn-secondary"
                                >
                                    Edit
                                </a> | <button
                                className="btn btn-danger"
                                onClick={() => this.deleteProduct(product._id)}
                            >
                                Delete
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