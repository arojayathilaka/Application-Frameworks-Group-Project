import React, {Component} from 'react';

import axios from 'axios';


 class CartItemList extends Component {




    constructor(props) {
        super(props);
        this.state = {
            itemId: 0,
            itemName: '',
            price: 0,
            discount: 0,
            quantity: 0,
            totalPrice: 0,
            cartItems: [],


        }
    }



    componentDidMount() {
        axios.get('http://localhost:5000/cartItems/')
            .then(res => {
                this.setState({cartItems: res.data})
            })
            .catch(error => {

                console.log(error);
            })

    }

    deleteCartItem = id => {
        axios.delete('http://localhost:5000/cartItems/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

        this.setState({
            cartItems: this.state.cartItems.filter(cartItem => cartItem._id !== id)
        })

    };


    render() {
        return (
            <div>

                    <h2>Shopping Cart</h2>
                    <table className="table table-dark table-hover">
                        <thead>
                        <tr>


                           <th scope="col">Product ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Actions</th>

                        </tr>


                      </thead>
                        <tbody>


                        {this.state.cartItems.map(cartItem => (
                            <tr key={cartItem._id}>
                                <td>{cartItem.itemId}</td>
                                <td>{cartItem.itemName}</td>
                                <td>{cartItem.price}</td>
                                <td>{cartItem.discount}</td>
                                <td>{cartItem.quantity}</td>
                                <td>{cartItem.totalPrice}</td>



                                <td>
                                    {/*<Link to={'/edit/'+ product._id}>Edit</Link>*/}
                                    <a
                                        href={'/cartItems/'+ cartItem._id}
                                        className="btn btn-secondary"
                                    >
                                        Edit
                                    </a> | <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteCartItem(cartItem._id)}
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}



                        </tbody>
                    </table>


                <p>TOTAL PAYMENT = </p>
                <div className="form-group">
                    <input type="submit" value="CHECKOUT" className="btn btn-primary" />
                </div>


                </div>


        );
    }



}
export default CartItemList

