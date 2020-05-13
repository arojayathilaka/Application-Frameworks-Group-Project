
import React, {Component} from "react";
import axios from "axios"

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            imageFiles: [],
            images: [],
            image: ''
        }
    }

    // arrayBufferToBase64(buffer) {
    //     let binary = '';
    //     const bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
    //     return window.btoa(binary);
    // };

    componentDidMount() {
        // fetch('http://localhost:5000/images/image')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         const base64Flag = 'data:image/jpeg;base64,';
        //         const imageStr =
        //             this.arrayBufferToBase64(data.img.data.data);
        //         this.setState({
        //             img: base64Flag + imageStr
        //         })
        //     })

        axios.get('http://localhost:5000/images/')
            .then(res => {
                this.setState({
                    imageFiles: res.data
                });
                console.log(this.state.imageFiles[0].filename);
            })
            .catch(err => {
                console.error(err)
            });

        axios.get('http://localhost:5000/products/')
            .then(res => {
                this.setState({
                    products: res.data
                });
                console.log(this.state.products)
            })
            .catch(err => {
                console.log(err)
            });
        // this.loadFiles();
        // this.loadProducts();
    }

    // loadFiles() {
    //     fetch('http://localhost:5000/images/')
    //         .then(res => res.json())
    //         .then(files => {
    //             if (files.message) {
    //                 console.log('No Files');
    //                 this.setState({ imageFiles: [] })
    //             } else {
    //                 this.setState({ files })
    //             }
    //         });

    //}

    // loadProducts() {
    //     fetch('http://localhost:5000/products/')
    //         .then(res => res.json())
    //         .then(products => {
    //             this.setState({ products })
    //
    //         });
    //
    // }

    componentWillMount() {

        // this.imageFiles.map(file => {
        //     axios.get('http://localhost:5000/images/'+file.filename)
        //         .then(res => {
        //             this.setState({
        //                 images: res.data
        //             });
        //             console.log(this.state.images[0]);
        //         })
        //         .catch(err => {
        //             console.error(err)
        //         });
        // });



        // this.setState({
        //     images: this.state.imageFiles.map(file => {
        //         axios.get('http://localhost:5000/images/'+file.filename)
        //             .then(res => {
        //                 console.log(res.data);
        //                 return res.data;
        //             })
        //             .catch(err => {
        //                 console.error(err)
        //             });
        //     })
        // });

    }

    render() {
        //const {img} = this.state;
        // if (this.state.products === null) {
        //     return null;
        // }
        // } else {

        // if (this.state.products.length !== 0)
            return (
                this.state.products.map(product => (
                    <div key={product.prodId}>
                        <div className="ProductArea">
                            <div className="Product">
                                <div className="ProductImage">
                                    {/*<img alt="" src='https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg' />*/}
                                    {/*<img*/}
                                    {/*    src={'http://localhost:5000/images/' + this.state.imageFiles[product.id-1].filename}*/}
                                    {/*     // src={this.state.images[product.prodId-1]}*/}
                                    {/*    alt=""*/}
                                    {/*    style={{width: "100%"}}*/}
                                    {/*/>*/}
                                    {/*<img*/}
                                    {/*    src={img}*/}
                                    {/*    alt='Helpful alt text'/>*/}
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
    //}


}

export default Home