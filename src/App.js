import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home";
import AddProduct from "./components/add-product";
import Product from "./components/product-details";
import ProductsList from "./components/products-list";
import EditProduct from "./components/edit-product";

function App() {
  return (
      <div >

          <Router>
              <div>
                  <Link to="/add">Add</Link>
                  <Link to="/edit">Edit</Link>
                  <Route path="/" exact component={Home}/>
                  <Route path="/add" exact component={AddProduct}/>
                  <Route path="/edit" exact component={ProductsList}/>
                  <Route path="/product/:id" exact component={Product}/>
                  <Route path="/edit/:id" exact component={EditProduct}/>
              </div>
          </Router>
    </div>




  );
}

export default App;
