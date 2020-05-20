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
            categories: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/userDetails/get')
            .then(res =>{
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
            .then(res =>
                this.setState({
                    category: res.data.category,
                    prodId: res.data.prodId,
                    name: res.data.name,
                    price: res.data.price,
                    duration: res.data.duration
                }))
            .catch(err => console.log(err));
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
                        <input type="submit" value="Edit Product" className="btnEdit"/>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default EditProduct