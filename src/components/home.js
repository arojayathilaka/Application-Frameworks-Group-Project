import React, {Component} from "react";
import axios from "axios";
import '../stylesheets/products-home.css';
import '../stylesheets/home.css';

class Home extends Component {

    constructor(props) {
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            products: [],
            quantity: 0
        }
    }

    onChangeQuantity = event => {
        this.setState({
            quantity: event.target.value
        })
    };

    componentDidMount() {
        // axios.get('http://localhost:5000/images/image')
        //     .then(res => {
        //         console.log(res.data);
        //         const base64Flag = 'data:image/jpeg;base64,';
        //         const imageStr = this.arrayBufferToBase64(res.data.img.data.data);
        //         this.setState({
        //             image: base64Flag + imageStr
        //         })
        //     });

        axios.get('http://localhost:5000/images')
            .then(res => {
                console.log(res.data);
                this.setState({
                    imagesData: res.data
                });
                this.imageMapper();
            });

        axios.get('http://localhost:5000/products')
            .then(res => {
                console.log(res.data);
                this.setState({
                    products: res.data
                });

            })
            .catch(err => {
                console.log(err)
            });
    }

    imageMapper = () => {
        let products = {};

        this.state.products.forEach(prod => {
            this.state.imagesData.forEach(imageData => {
                if (imageData.imgId === prod.prodId) {
                    products[prod.prodId] = {
                        _id: prod._id,
                        id: prod.prodId,
                        name: prod.name,
                        price: prod.price,
                        image: this.imageConverter(imageData.img.data.data)
                    };
                    console.log(products[prod.prodId]);
                }
            })
        });

        this.setState({
            products: products
        });
    };

    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    imageConverter = data => {
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = this.arrayBufferToBase64(data);
        return base64Flag + imageStr;
    };


    onSubmit = (event, prodId, name, price, discount) => {
        event.preventDefault();

        const cartItem = {
            itemId: prodId,
            itemName: name,
            price: price,
            discount: discount,
            quantity: this.state.quantity,
            totalPrice: (this.state.quantity * price) - (discount),
        };

        console.log(cartItem);

        axios.post('http://localhost:5000/cartItems/add', cartItem)
            .then(res => {
                console.log(res.data);
                alert("Product Added to the Shopping Cart!");
            })
            .catch(err => console.log(err));

        window.location = '/cartItems/';

    };

    render() {
        const products = this.state.products;
        return (
            Object.keys(products).map(product => (
                <div key={products[product].id}>
                    <div className="prodArea">
                        <div className="prod">
                            <div className="prodImage">
                                <img src={products[product].image}
                                     alt={products[product].name}/>
                            </div>
                            <div className="prodDetails">
                                <p>{products[product].name}</p>
                                <p>{products[product].price}</p>
                                <p>{products[product].discount}</p>

                                <form
                                    onSubmit={event => this.onSubmit(event,
                                        products[product].id,
                                        products[product].name,
                                        products[product].price,
                                        products[product].discount)}
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
                                        <input type="submit" value="Add To Shopping Cart" className="btn btn-primary"/>
                                    </div>
                                </form>
                            </div>
                            <a href={"/product/" + products[product]._id}>more details</a>
                        </div>
                    </div>
                </div>
            )));
    }
}

export default Home