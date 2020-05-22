import React, { Component } from 'react';
import axios from 'axios';
const Swal = require('sweetalert2');

export default class cashOnDelivery extends Component{
    constructor(props) {
        super(props);

        this.onChangeDeliveryAddress = this.onChangeDeliveryAddress.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            deliveryAddress: "",
            contactNumber: 0,
        }
    }

    onChangeDeliveryAddress(e){
        this.setState({
            deliveryAddress: e.target.value
        })
    }

    onChangeContactNumber(e){
        this.setState({
            contactNumber: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/cartItems/' )
            .then(res => {
                this.setState({
                    FinaltotPrice: res.data.FinaltotPrice
                })
                console.log(this.state.FinaltotPrice)
            })
            .catch(err => console.log(err));
    }

    onSubmit(e){
        e.preventDefault();

        const cashOnDelivery = {
            deliveryAddress: this.state.deliveryAddress,
            contactNumber: this.state.contactNumber
        }

        console.log(cashOnDelivery);
        axios.post('http://localhost:5000/cashOnDelivery/add', cashOnDelivery)
            .then(res => console.log(res.data),
                Swal.fire({
                    position: 'center',
                    title: "Are you sure you want to continue?",
                    text: "",
                    icon: 'warning',
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: 'Go back',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Confirm Delivery Details",
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Your order successfully added!',
                            'Thank You For Using Our Services',
                            'success',
                        )}
                })
            );
    }

    render() {
        return (
            <div>
                <h3><u>Cash On Delivery</u></h3>
                <h4>Total Price : {this.state.FinaltotPrice}</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Delivery Address: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.deliveryAddress}
                               onChange={this.onChangeDeliveryAddress}/>
                    </div>
                    <div className="form-group">
                        <label> Contact Number: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.contactNumber}
                               onChange={this.onChangeContactNumber}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" style={{backgroundColor: "#AF7AC5"}}/>
                    </div>
                </form>
            </div>
        )
    }
}