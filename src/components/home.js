import '../stylesheets/home.css';
import React, {Component} from "react";
import axios from "axios"

class Home extends Component{

    constructor(props) {
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            products: [],
            images: [],
            image: '',
            quantity:0,

        }
    }

    onChangeQuantity = event => {
        this.setState({
            quantity: event.target.value
        })
    };


    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {


        fetch('http://localhost:5000/images')
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                const images = [];
                data.forEach(img => {
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = this.arrayBufferToBase64(img.img.data.data);
                    const image = base64Flag + imageStr;
                    images.push(image);
                });
                this.setState({
                    images: images
                })
            });

            axios.get('http://localhost:5000/products')
                .then(res => {
                    this.setState({
                        products: res.data
                    });
                    console.log(this.state.products)
                })
                .catch(err => {
                    console.log(err)
                });



        }


    onSubmit = (event, prodId, name, price, discount) => {
        event.preventDefault();

        const cartItem = {

            itemId: prodId,
            itemName: name,
            price: price,
            discount: discount,
            quantity: this.state.quantity,
            totalPrice: this.state.quantity * price ,


        };


        console.log(cartItem);

        axios.post('http://localhost:5000/cartItems/add', cartItem)
            .then(res => {
                console.log(res.data);
                alert("Product Added to the Shopping Cart!");
            })
            .catch(err => console.log(err));


    window.location = '/cartItems/';

}



    render() {
            return (
                this.state.products.map(product => (
                    <div class={product} key={product.prodId}>
                        <div className="ProductArea">
                            <div className="Product">
                                <div className="ProductImage">
                                    <img
                                        src={this.state.images[product.prodId-1]}
                                        //src={img}
                                        alt={product.name}/>
                                </div>
                                <div className="ProductDetails">
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <p>{product.discount}</p>
                                    <form
                                        // onSubmit={this.onSubmit(product.prodId, product.name, product.price, product.discount)}
                                        onSubmit={event => this.onSubmit(event, product.prodId, product.name, product.price, product.discount)}
                                    >
                                    <label>Quantity: </label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.quantity}
                                        onChange={this.onChangeQuantity}
                                    />
                                        <div className="form-group">
                                            <input type="submit" value="Add To Shpping Cart" className="btn btn-primary" />
                                        </div>
                                    </form>
                                <br/>

                                    <br/>

                                    <br/>

                                    <a href={"/product/" + product._id}>more details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            );
        }
}

export default Home