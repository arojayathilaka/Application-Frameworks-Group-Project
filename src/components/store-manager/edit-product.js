import React, {Component} from "react";
import axios from 'axios';
import '../../stylesheets/edit-product.css';

class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: '',
            prodId: '',
            name: '',
            price: '',
            discount: '',
            categories: [],
            image: '',
            imageData: '',
            isEditing: false
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/categories/get')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        categories: res.data,
                        // category: res.data[0].categoryname
                    });
                }
            })
            .catch((error) =>{
                console.log(error);
            });

        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    category: res.data.category,
                    prodId: res.data.prodId,
                    name: res.data.name,
                    price: res.data.price,
                    duration: res.data.duration
                });
                console.log(this.state.prodId);
                })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/images')
            .then(res => {
                console.log(res.data);
                const imageData = res.data.find(imageData => (imageData.imgId === this.state.prodId));
                this.setState({
                    imageData: imageData
                });
                console.log(imageData._id);
                const base64Flag = 'data:image/jpeg;base64,';
                const imageStr = this.arrayBufferToBase64(imageData.img.data.data);
                const image = base64Flag + imageStr;
                this.setState({
                    image: image
                })
            });
        console.log(this.state.isEditing)
    }

    onChangeId = event => {
        this.setState({
            prodId: event.target.value
        })
    };

    onChangeName = event => {
        this.setState({
            name: event.target.value
        })
    };

    onChangePrice = event => {
        this.setState({
            price: event.target.value
        })
    };

    onChangeDiscount = event => {
        this.setState({
            discount: event.target.value
        })
    };

    onChangeCategory = event => {
        this.setState({
            category: event.target.value
        })
    };

    onSubmit = event => {
        event.preventDefault();

        const product = {
            prodId: this.state.prodId,
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            category: this.state.category
        };

        console.log(product);

        axios.put('http://localhost:5000/products/update/' + this.props.match.params.id, product)
            .then(res => {
                console.log(res.data);
                alert("Product Updated Successfully!");
            })
            .catch(err => console.log(err));

        //window.location = '/';
    };

    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    setIsEditing = () => {
      this.setState({
          isEditing: true
      })
    };

    render() {
        return(
            <div className="backImg">
                <div className="editProduct">
                <br/>
                <h3>Edit Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Category: </label>
                        <br/>
                        <select
                            required
                            value= {this.state.category}
                            onChange={this.onChangeCategory}>
                            {this.state.categories.map(category => {
                                return (
                                    <option
                                        key={category._id}
                                        value={category.categoryname}>{category.categoryname}
                                    </option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Product ID: </label>
                        <br/>
                        <input  type="text"
                                required
                                pattern="\d+"
                                value={this.state.prodId}
                                onChange={this.onChangeId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <br/>
                        <input  type="text"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <br/>
                        <input  type="text"
                                required
                                pattern="\d+"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount: </label>
                        <br/>
                        <input
                            type="text"
                            value={this.state.discount}
                            onChange={this.onChangeDiscount}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Product" className="btnUpdate"/>
                    </div>
                </form>
                <h4>Update Product Image</h4>
                <img src={this.state.isEditing ? "" : this.state.image} alt=""/>
                <form action={"http://localhost:5000/images/update/" + this.state.imageData._id} method="POST" encType="multipart/form-data">
                    <div>
                        <input
                            type="hidden"
                            name="imageId"
                            id="imageId"
                            required
                            pattern="\d+"
                            value={this.state.prodId}
                            onChange={this.onChangeProdId}
                        />
                    </div>
                    {
                        this.state.isEditing ? (
                            <div className="custom-file mb-3">
                                <input type="file" name="file" id="file" className="custom-file-input"/>
                                <label htmlFor="file" className="custom-file-label">Choose Product Image</label>
                            </div>
                        ) : ""
                    }
                    <input type={this.state.isEditing ? "hidden" : "button"} value="Edit Product Image" className="btnUpdateImg" onClick={this.setIsEditing}/>
                    <input type={this.state.isEditing ? "submit" : "hidden"} value="Update Product Image" className="btnUpdateImg" />
                </form>
            </div>
            </div>
        );
    }
}

export default EditProduct