import React, {Component} from "react";
import axios from "axios";
import '../stylesheets/products-home.css';
import '../stylesheets/home.css';
import swal from "sweetalert";
import Application from "./user/selectPaymentMethod.component";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'




class Home extends Component {

    constructor(props) {
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            products: [],
            images: [],
            imagesData: [],
            image: '',
            quantity: 0,

        }
    }

    onChangeQuantity = event => {
        this.setState({
            quantity: event.target.value
        })
    };


    componentDidMount() {
        axios.get('http://localhost:5000/images/image')
            .then(res => {
                console.log(res.data);
                const base64Flag = 'data:image/jpeg;base64,';
                const imageStr = this.arrayBufferToBase64(res.data.img.data.data);
                this.setState({
                    image: base64Flag + imageStr
                })
            });

        axios.get('http://localhost:5000/images')
            .then(res => {
                console.log(res.data);
                this.setState({
                    imagesData: res.data
                });
                // const images = [];
                // res.data.forEach(img => {
                //     const base64Flag = 'data:image/jpeg;base64,';
                //     const imageStr = this.arrayBufferToBase64(img.img.data.data);
                //     const image = base64Flag + imageStr;
                //     images.push(image);
                // });
                // this.setState({
                //     images: images
                // })
                //console.log(images)
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
            totalPrice: (this.state.quantity * price) - (discount),


        };

        console.log(cartItem);

        axios.post('http://localhost:5000/cartItems/add', cartItem)
            .then(res => {
                console.log(res.data);
                //alert("Product Added to the Shopping Cart!");
                swal({
                    title: "Product Added to the Cart!",
                    icon: "success",
                    button: true,
                })
            })

            .catch(err => console.log(err));

        //window.location = '/cartItems/';

    };




    /*addToWishlist = (prodId,name) => {

        const wishlistItem = {

            itemId: prodId,
            itemName: name,

        };

        console.log(wishlistItem);
        axios.post('http://localhost:5000/wishlistItems/add',wishlistItem)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

    };*/



    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };



    // createImage = (prodId) => {
    //     const imgData = this.state.imagesData.find(imageData => (imageData.imgId === prodId));
    //     console.log(imgData);
    //     const base64Flag = 'data:image/jpeg;base64,';
    //     const imageStr = this.arrayBufferToBase64(imgData.img.data.data);
    //     return base64Flag + imageStr;
    // };

    render() {
        //let image;
        return (

            this.state.products.map(product => (
                <div className="background">
                    <div key={product.prodId}>
                        <div className="prodArea">
                            <div className="prod">
                                <div className="prodImage">
                                    {/*{console.log(this.state.imagesData.find(imageData => (imageData.imgId === product.prodId)))}*/}
                                    {/*{this.state.imagesData.forEach(imageData => {*/}
                                    {/*    if (imageData.imgId === product.prodId) {*/}
                                    {/*        const base64Flag = 'data:image/jpeg;base64,';*/}
                                    {/*        const imageStr = this.arrayBufferToBase64(imageData.img.data.data);*/}
                                    {/*        const image =  base64Flag + imageStr;*/}
                                    {/*    }*/}
                                    {/*})}*/}
                                    <img
                                        //src={this.createImage(this.state.imagesData.find(imageData => (imageData.imgId === product.prodId)))}
                                        //src={() => {this.createImage(product.prodId)}}
                                        // src={this.state.imagesData.forEach(imageData => {
                                        //     if (imageData.imgId === product.prodId) {
                                        //         const base64Flag = 'data:image/jpeg;base64,';
                                        //         const imageStr = this.arrayBufferToBase64(imageData.img.data.data);
                                        //         return base64Flag + imageStr;
                                        //     }
                                        // })}
                                        // src = {
                                        //     this.state.imagesData.find(imageData => (imageData.imgId === product.prodId))
                                        // }
                                         src={this.state.image}
                                        // src={img}
                                        alt={product.name}/>
                                </div>
                                <div className="prodDetails">
                                    <h4>{product.name} <Link to="/wishlist" ><FontAwesomeIcon icon={faHeart}/></Link></h4>
                                    <h6>Price: LKR {product.price}.00</h6>
                                    <h6>Discount: LKR {product.discount}.00</h6>



                                    <form
                                        // onSubmit={this.onSubmit(product.prodId, product.name, product.price, product.discount)}
                                        onSubmit={event => this.onSubmit(event, product.prodId, product.name, product.price, product.discount)}
                                    >
                                        <div className="form-group">
                                            <h6>Quantity: </h6>
                                            <input
                                                type="text"
                                                required
                                                pattern="\d+"
                                                className="form-control"
                                                placeholder="Quantity"
                                                value={this.state.quantity}
                                                onChange={this.onChangeQuantity}
                                            />
                                        </div>

                                        <input type="submit" value="Add To Shopping Cart" className="btn btn-primary "
                                               style={{backgroundColor: "#8E44AD", width: "280px"}}/>

                                    </form>
                                    <br/>


                                    <a href={"/product/" + product._id}>more details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))

        );
    }
}

export default Home
