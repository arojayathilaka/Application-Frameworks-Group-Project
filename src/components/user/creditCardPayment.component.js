import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class creditCardPayment extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeExpiration = this.onChangeExpiration.bind(this);
        this.onChangeCVC = this.onChangeCVC.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: "",
            cardNumber: "",
            expiration: new Date(),
            cvc: 0,
        }
    }

    onChangeUsername(e){
        this.setState({
            userName: e.target.value
        })
    }

    onChangeCardNumber(e){
        this.setState({
            cardNumber: e.target.value
        })
    }

    onChangeExpiration(expiration){
        this.setState({
            expiration: expiration
        })
    }

    onChangeCVC(e){
        this.setState({
            cvc: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const payment = {
            userName: this.state.userName,
            cardNumber: this.state.cardNumber,
            expiration: this.state.expiration,
            cvc: this.state.cvc
        }

        console.log(payment);
        axios.post('http://localhost:5000/creditCardPayment/add', payment)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <h3>Payment</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Name On Card: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.userName}
                        onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label> Card Number: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.cardNumber}
                               onChange={this.onChangeCardNumber}/>
                    </div>
                    <div className="form-group">
                        <label> Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.expiration}
                                onChange={this.onChangeExpiration}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label> CVC/CW: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.cvc}
                               onChange={this.onChangeCVC}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Pay" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}