import React from 'react';
import cashOnDelivery from "./cashOnDelivery.component";

function Application(){

    const cashDelivery = () => {
        window.location = "/creditCardPayment"
    }
    const cardPayment = () => {
        window.location = "/cashOnDelivery"
    }

    return(
        <div>
            <h1>Select Payment Method</h1>
            <div className="form-group">
                <input type="submit" value="Credit Card Payments" className="btn btn-primary" onClick={cashDelivery}/>
            </div>
            <div className="form-group">
                <input type="submit" value="Cash On Delivery" className="btn btn-primary" onClick={cardPayment}/>
            </div>
        </div>
    );
}

export default Application;