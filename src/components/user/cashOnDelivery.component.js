import React, { Component } from 'react';
import axios from 'axios';

export default class cashOnDelivery extends Component{
    constructor(props) {
        super(props);

        this.onChangeDeliveryAddress = this.onChangeDeliveryAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            deliveryAddress: "",
        }
    }

    onChangeDeliveryAddress(e){
        this.setState({
            deliveryAddress: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/cartItems/' )
            .then(res => {
                this.setState({
                })
            })
            .catch(err => console.log(err));
    }

    onSubmit(e){
        e.preventDefault();

        const cashOnDelivery = {
            deliveryAddress: this.state.deliveryAddress
        }

        console.log(cashOnDelivery);
        axios.post('http://localhost:5000/cashOnDelivery/add', cashOnDelivery)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <h3><u>Cash On Delivery</u></h3>
                <h4>Total Price : </h4>
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
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}