import React, { Component } from "react";
import axios from "axios";
import swal from 'sweetalert';
import {Link} from "react-router-dom";

const goAdminHome = (
    <div>
        <Link to={"/adminHome"} style={{textDecoration:"none"}}><input type="submit" style={{ color:"#fff", backgroundColor:"#9B59B6"}} value="Go To Admin Home" class="btn btn-lg btn-block"/><br/><br/></Link>
    </div>
)

class AdminLogin extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUserpassword = this.onChangeUserpassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);

        this.state = {
            name: '',
            password: '',
            isLogin: false
        }

    }
    onChangeUsername(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeUserpassword(e){
        this.setState({
            password: e.target.value
        });
    }

    sweetalertfunction(){
        swal({
            title: "Login!",
            text: "You are Successfully Login!",
            icon: "success",
            button: true,
        }).then(()=>{
            this.setState({
                isLogin: true
            });
        });
    }

    goAdminHome(){
        return (goAdminHome);
    }

    onSubmit(e){
        e.preventDefault();

        console.log("print");

        const storemanager = {
            name: this.state.name,
            password: this.state.password
        }

        console.log(storemanager);

        console.log("print");

        axios.post('http://localhost:5000/userDetails/admin', storemanager)
            .then(res => {
                if (res.data.success === true){
                    this.sweetalertfunction();
                }
                else if(res.data.success === false){
                    swal({
                        title: "Login Error!",
                        text: res.data.message,
                        icon: "error",
                        button: true,
                        dangerMode: true,
                    });
                }
            })
    }

    render() {
        if(this.state.isLogin){
            return (
                <div className="container">

                    <br/>
                    <br/>
                    <div className="jumbotron" style={{backgroundColor:"#E8DAEF"}}>
                        <img src={"adminwelcom.png"}/>
                        <h1 style={{color:"#4A235A",marginLeft:"700px", fontFamily:"Lucida Console"}}>Admin</h1>
                        <br/>
                        {this.goAdminHome()}
                    </div>

                </div>
            );
        }
        return (
            <div className="container">
                <br/>
                <br/>
                <h3 style={{color: "#4A235A"}}>Admin Login</h3>
                <form onSubmit={this.onSubmit} style={{backgroundColor:"#E8DAEF"}} className="jumbotron">
                    <div className="form-group">
                        <label>Admin Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Admin Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangeUserpassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" style={{color:"#fff",backgroundColor:"#CC00FF"}} className="btn" />
                    </div>

                </form>

            </div>
        );
    }
}
export default AdminLogin;