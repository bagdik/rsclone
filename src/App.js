import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import CreateUser from "./components/create-user.component";
import CreateProduct from './components/ceate-product.component';
import ProductList from './components/product-list.component';
import Login from './components/login.component';


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ProductList} />      
      <Route path="/user" component={CreateUser} />
      <Route path="/product" component={CreateProduct} />
      <Route path="/productlist" component={ProductList} />
      <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
