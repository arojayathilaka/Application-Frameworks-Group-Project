import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home";
import AddProduct from "./components/store-manager/add-product";
import Product from "./components/user/productDetails.component";
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
import EditCartItem from "./components/edit-cartItem.component";
import Application from "./components/user/selectPaymentMethod.component";
// import Navlink from "./components/user/navlink.component";
import creditCardPayment from "./components/user/creditCardPayment.component";
import cashOnDelivery from "./components/user/cashOnDelivery.component";

function App() {
  return (
      <div >
          <Router>
              <Navbar/>
              <Route path="/adminLogin" component={AdminLogin} />
              <Route path="/adminHome" component={AdminHome} />
              <Route path="/smLogin" component={StoreManagerLogin} />
              <div className="container">
                  {/*<Navlink/>*/}
                  <Route path="/creditCardPayment" exact component={creditCardPayment}/>
                  <Route path="/cashOnDelivery" exact component={cashOnDelivery}/>
              </div>
              <Route path="/gocategory" component={Category} />
              <Route path="/addCategory" component={CategoryAdd} />
              <Route path="/viewSM" component={ViewStoreManager} />
              <Route path="/addSM" component={AddStoreManager} />
              <Route path="/updateSM/:id" component={UpdateStoreManager} />
              <Route path="/deleteSM/:id" component={DeleteStoreManager} />
              {/*<Link to="/cartItems">Shopping Cart</Link>*/}
              <Route path="/" exact component={Home}/>
              <Route path="/addProduct" exact component={AddProduct}/>
              <Route path="/productsList/:category" exact component={ProductsList}/>
              <Route path="/cartItems/:id" exact component={EditCartItem}/>
              <Route path="/cartItems" exact component={CartItemList}/>
              <Route path="/product/:id" exact component={Product}/>
              <Route path="/editProduct/:id" exact component={EditProduct}/>
              <Route path="/selectPaymentMethod" exact component={Application}/>
          </Router>
    </div>




  );
}

export default App;
