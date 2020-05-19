import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home";
import AddProduct from "./components/store-manager/add-product";
import Product from "./components/user/product-details";
import ProductsList from "./components/store-manager/products-list";
import EditProduct from "./components/store-manager/edit-product";
import AdminLogin from "./components/admin/admin-login";
import CategoryAdd from "./components/admin/add-category";
import StoreManagerLogin from "./components/admin/storemanager-login";
import Navbar from "./components/admin/navbar";
import ViewStoreManager from "./components/admin/list-storemanager";
import AddStoreManager from "./components/admin/add-storemanager";
import UpdateStoreManager from "./components/admin/update-storemanager";
import DeleteStoreManager from "./components/admin/delete-storemanager";
import Category from "./components/admin/goCategory";
import AdminHome from "./components/admin/admin-home";
import CartItemList from "./components/user/cartItem-list.component";

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
              <Link to="/cartItems">Shopping Cart</Link>
              <Link to="/add">add</Link>
              <Route path="/" exact component={Home}/>
              <Route path="/add" exact component={AddProduct}/>
              <Route path="/productsList/:category" exact component={ProductsList}/>
              <Route path="/cartItems" exact component={CartItemList}/>
              <Route path="/product/:id" exact component={Product}/>
              <Route path="/edit/:id" exact component={EditProduct}/>
          </Router>
    </div>




  );
}

export default App;
