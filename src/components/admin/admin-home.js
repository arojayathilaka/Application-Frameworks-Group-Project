import React, { Component } from "react";
import {Link} from "react-router-dom";

const goAdminPages = (
    <div className="jumbotron">
        <Link to={"/viewSM"} style={{textDecoration:"none"}}><input type="submit" style={{ color:"#fff", backgroundColor:"#de3163"}} value="View Store Managers" class="btn btn-lg btn-block"/><br/><br/></Link>
        <Link to={"/addSM"} style={{textDecoration:"none"}}><input type="submit" style={{color:"#fff",backgroundColor:"#007ba7"}} value="Add Store Managers" class="btn btn-lg btn-block" /><br/><br/></Link>
        <Link to={"/addCategory"} style={{textDecoration:"none"}}><input type="submit" style={{color:"#fff",backgroundColor:"#2e8b57"}} value="Add Category" class="btn btn-lg btn-block" /></Link>
    </div>
)

class AdminHome extends Component{
    adminPages(){
        return (goAdminPages);
    }
    render() {
        return (
            <div style={{margin:"10px"}}>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <button type="button" class="btn btn-sm" style={{backgroundColor:"#E1BEE7",marginLeft:"10px"}}><a className="nav-link" style={{color:"#000"}} href="/adminLogin">Logout</a></button>
                    </li>
                </ul>
                <br/>
                <div className="container">
                    <h3 style={{color: "#4A235A"}} >Admin Home Page</h3>
                    <br/>
                    {this.adminPages()}
                </div>
            </div>
        );
    }
}

export default AdminHome;