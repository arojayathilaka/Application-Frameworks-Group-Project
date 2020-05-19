import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import {Link} from "react-router-dom";

const goCategoryHome = (
    <div>
        <Link to={"/gocategory"} style={{textDecoration:"none"}}><input type="submit" style={{ color:"#fff", backgroundColor:"#9B59B6"}} value="Go to Category List" class="btn btn-lg btn-block"/><br/><br/></Link>
    </div>
)

class StoreManagerLogin extends Component{
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
            password: '',
            isLogin: false,
            smdetails: []
        }
    }
    componentDidMount() {

        if (!(this.state.email === '')){
            //console.log(this.state.email)
            const sm = {
                email: this.state.email,
            }
            axios.post('http://localhost:5000/userDetails/getSM', sm)
                .then(response =>{
                    this.setState({smdetails: response.data})
                    console.log(response.data);
                })
                .catch((error) =>{
                    console.log(error);
                });
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
    goCategoryHome(){
        return (goCategoryHome);
    }

    sweetalertfunction(){
        swal({
            title: "Login!",
            text: "You are Successfully Login!",
            icon: "success",
            button: true,
        }).then(()=>{
            this.componentDidMount();
            this.setState({
                isLogin: true
            });

        });
    }
    onSubmit(e){
        e.preventDefault();

        const storemanager = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(storemanager);

        axios.post('http://localhost:5000/userDetails/signin', storemanager)
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
            });

    }

    render() {
        if (this.state.isLogin){
            return (
                <div className="container">
                    <br/>
                    <br/>
                    <div className="jumbotron" style={{backgroundColor:"#E8DAEF"}}>
                        <img src={"adminwelcom.png"}/>
                        <h1 style={{color:"#4A235A",marginLeft:"500px", fontFamily:"Lucida Console"}}>to the Web Site</h1>
                        <br/>
                        {this.goCategoryHome()}
                    </div>

                </div>
            );
        }
        return (
            <div className="container">
                <br/>
                <br/>
                <h3 style={{color: "#4A235A"}}>Store Manager Login</h3>
                <form onSubmit={this.onSubmit} style={{backgroundColor:"#E8DAEF"}} className="jumbotron">
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
                               value={this.state.password}
                               onChange={this.onChangeUserpassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" style={{color:"#fff",backgroundColor:"#CC00FF"}} className="btn"/>
                    </div>
                </form>

            </div>
        );
    }
}
export default StoreManagerLogin;