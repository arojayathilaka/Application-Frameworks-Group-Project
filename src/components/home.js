
import React, {Component} from "react";
import axios from "axios"

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            images: [],
            image: ''
        }
    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
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
               const images = [];
               res.data.forEach(img => {
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

    render() {
            return (
                this.state.products.map(product => (
                    <div key={product.prodId}>
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