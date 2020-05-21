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
           // payment:0

        }
    }



    componentDidMount() {
        axios.get('http://localhost:5000/cartItems/')
            .then(res => {

                this.setState({cartItems: res.data})

                console.log(res.data);

            })
            .catch(error => {

                console.log(error);
            })


             axios.get('http://localhost:5000/cartItems/')
            // .then((cartItems) => {
            //       let payment = 0;
            //     for (var i = 0; i < this.cartItems.length; i++) {
            //         payment = payment += (this.state.totalPrice);
            //     }
            //
            //
            //
            //     this.setState({  payment });
            // })
                 .then( res => {
                     console.log(res.data);
                     let FinaltotPrice = 0;
                     res.data.forEach(cartItem => {
                         FinaltotPrice = FinaltotPrice + cartItem.totalPrice;
                     });
                     this.setState({
                         totalPrice: FinaltotPrice
                     });
                     console.log(this.state.totalPrice);
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
            <div >

                    <h2>Shopping Cart</h2>
                    <table className="table table-dark table-hover" >
                        <thead >
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
                        <tbody style={{backgroundColor:"#AF7AC5"}}>


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


                <h3 style={{float:"right"}}>Total Price = {this.state.totalPrice} </h3>

                <br/>
                    <br/>

                <div className="form-group">
                    <input type="submit" value="CHECKOUT" className="btn btn-primary " style={{backgroundColor: "#AF7AC5",float:"right"}} />
                </div>


                </div>


        );
    }



}
export default CartItemList

