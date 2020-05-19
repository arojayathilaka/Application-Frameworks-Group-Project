import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import {Link} from "react-router-dom";

const goAdminHome = (
    <div className="form-group">
        <Link to={"/adminLogin"}><input type="submit" value="Back" className="btn badge-pill"/>   </Link>
    </div>

)

class AddStoreManager extends Component{
    constructor(props) {
        super(props);

        this.onChangeUserid = this.onChangeUserid.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUsercontact = this.onChangeUsercontact.bind(this);
        this.onChangeUseremail = this.onChangeUseremail.bind(this);
        this.onChangeUserpassword = this.onChangeUserpassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);

        this.state = {
            userid: 0,
            username: '',
            contact: 0,
            email: '',
            password: ''
        }
    }

    onChangeUserid(e){
        this.setState({
            userid: e.target.value
        });
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeUsercontact(e){
        this.setState({
            contact: e.target.value
        });
    }
    onChangeUseremail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangeUserpassword(e){
        this.setState({
            password: e.target.value
        });
    }
    goAdminHome(){
        return goAdminHome;
    }
    sweetalertfunction(){
        swal({
            title: "Store Manager Added",
            text: "You are Successfully Added new Store Manager.",
            icon: "success",
            button: true,
        }).then(()=>{
            this.setState({
                userid: 0,
                username: '',
                contact: 0,
                email: '',
                password: ''
            });
        });
    }

    onSubmit(e){
        e.preventDefault();

        const storemanager = {
            userid: this.state.userid,
            username: this.state.username,
            contact: this.state.contact,
            email: this.state.email,
            password: this.state.password
        };

        console.log(storemanager);

        let phoneno = /^\d{10}$/;
        let pass = '((?=.*[a-z])(?=.*[@#$%!]).{6,40})';
        if(storemanager.contact.match(phoneno)) {
            if (storemanager.password.match(pass)) {
                axios.post('http://localhost:5000/userDetails/add', storemanager)
                    .then(res => {
                        if (res.data.success === true) {
                            this.sweetalertfunction();
                        }
                        if (res.data.success === false) {
                            swal({
                                title: "Store Manager Not Added!",
                                text: res.data.message,
                                icon: "error",
                                button: true,
                                dangerMode: true,
                            });
                        }
                    });
            }else {
                swal({
                    title: "Store Manager Not Added!",
                    text: "Please Enter the valid Password",
                    icon: "error",
                    button: true,
                    dangerMode: true,
                });
            }
        }else {
            swal({
                title: "Store Manager Not Added!",
                text: "Please Enter the valid contact",
                icon: "error",
                button: true,
                dangerMode: true,
            });
        }


    }

    render() {
        return (

            <div style={{margin: "10px"}}>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <button type="button" className="btn btn-sm"
                                style={{backgroundColor: "#E1BEE7", marginRight: "10px"}}><a className="nav-link active"
                                                                                             style={{color: "#000"}}
                                                                                             href="/adminHome">Back</a></button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-sm"
                                style={{backgroundColor: "#E1BEE7", marginLeft: "10px"}}><a className="nav-link"
                                                                                            style={{color: "#000"}}
                                                                                            href="/adminLogin">Logout</a>
                        </button>
                    </li>
                </ul>
                <br/>

                <div className="container">
                    <h3 style={{color: "#4A235A"}}>Add New Store Manager</h3>

                    <form onSubmit={this.onSubmit} className="jumbotron" style={{backgroundColor:"#E8F8F5"}}>
                        <div className="form-group">
                            <label>Store Manager ID: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.userid}
                                   onChange={this.onChangeUserid}
                            />
                        </div>
                        <div className="form-group">
                            <label>Store Manager Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.username}
                                   onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label>Store Manager Contact: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.contact}
                                   onChange={this.onChangeUsercontact}
                            />
                        </div>
                        <div className="form-group">
                            <label>Store Manager Email: </label>
                            <input type="email"
                                   className="form-control"
                                   value={this.state.email}
                                   onChange={this.onChangeUseremail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Store Manager Password: </label>
                            <input type="password"
                                   className="form-control"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.onChangeUserpassword}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Add StoreManagers" style={{ color:"#fff",backgroundColor:"#0097A7"}} className="btn"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddStoreManager;