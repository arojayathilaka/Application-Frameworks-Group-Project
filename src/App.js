import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home";
import AddProduct from "./components/store-manager/add-product";
import Product from "./components/product-details";
import ProductsList from "./components/store-manager/products-list";
import EditProduct from "./components/store-manager/edit-product";

import AdminLogin from "./components/admin-login";
import CategoryAdd from "./components/add-category";
import StoreManagerLogin from "./components/storemanager-login";
import Navbar from "./components/navbar";
import ViewStoreManager from "./components/list-storemanager";
import AddStoreManager from "./components/add-storemanager";
import UpdateStoreManager from "./components/update-storemanager";
import DeleteStoreManager from "./components/delete-storemanager";
import Category from "./components/goCategory";
import AdminHome from "./components/admin-home";
import CartItemList from "./components/cartItem-list.component";

function App() {
  return (
      <div >

          <Router>

              <Navbar/>

              <Route path="/adminLogin" component={AdminLogin} />
              <Route path="/adminHome" component={AdminHome} />
              <Route path="/smLogin" component={StoreManagerLogin} />
              <Route path="/gocategory" component={Category} />
              <Route path="/addCategory" component={CategoryAdd} />
              <Route path="/viewSM" component={ViewStoreManager} />
              <Route path="/addSM" component={AddStoreManager} />
              <Route path="/updateSM/:id" component={UpdateStoreManager} />
              <Route path="/deleteSM/:id" component={DeleteStoreManager} />

              <div>
                  <Link to="/add">Add</Link>
                  <Link to="/edit">Edit</Link>
                  <Link to="/cartItems">Shopping Cart</Link>
                  <Route path="/" exact component={Home}/>
                  <Route path="/add" exact component={AddProduct}/>
                  <Route path="/edit" exact component={ProductsList}/>
                  <Route path="/cartItems" exact component={CartItemList}/>
                  <Route path="/product/:id" exact component={Product}/>
                  <Route path="/edit/:id" exact component={EditProduct}/>
              </div>
          </Router>
    </div>




  );
}

export default App;
