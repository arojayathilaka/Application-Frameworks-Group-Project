import React, {Component} from "react";
import axios from "axios";

const CategoryView = props => (
    <div className="nav flex-column nav-pills" aria-orientation="vertical">
        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" style={{color:"#000"}} href={"/productsList/" + props.categoryview.categoryname}
           role="tab" aria-controls="v-pills-profile" aria-selected="false">{props.categoryview.categoryname}</a>
    </div>
);

class Category extends Component{
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        axios.post('http://localhost:5000/categories/get')
            .then(response =>{
                this.setState({categories: response.data})
                console.log(response.data);
            })
            .catch((error) =>{
                console.log(error);
            });
    }

    categoriesList(){
        return this.state.categories.map(currentcategory =>{
            return <CategoryView categoryview={currentcategory}/>
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" aria-orientation="vertical" style={{backgroundColor:"#F3E5F5"}}>
                        <a className="nav-link active" id="v-pills-home-tab" style={{fontSize:"24px",fontWeight: 'bold',color:"#000",backgroundColor:"#E1BEE7"}} data-toggle="pill" href="#v-pills-home"
                           role="tab" aria-controls="v-pills-home" aria-selected="true">Categories</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
                           role="tab" aria-controls="v-pills-profile"
                           aria-selected="false">{this.categoriesList()}</a>
                    </div>
                </div>
                <div className="col-9">

                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <div className="form-group">
                                <button className="btn btn-sm"
                                        style={{marginTop:"5px",backgroundColor: "#E1BEE7", marginRight: "10px"}}><a className="nav-link"
                                                                                                                     style={{color: "#000"}}
                                                                                                                     href="/smLogin">Logout</a>
                                </button>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}
export default Category;