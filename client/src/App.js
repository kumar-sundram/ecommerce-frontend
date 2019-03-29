import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Register from './component/users/register'
import Login from './component/users/login'
import ProductList from './component/products/poductList'
import ProductNew from './component/products/productNew'
import ProductDetails from './component/products/productDetails'
import AddCategory from './component/products/categoryForm'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h2>Welcome to our ecommerce</h2>
          <Link to="/users/register">Register</Link> |
          <Link to="/users/login">Login</Link> |
          {/* <Link to="/products">Products</Link> |*/}
          <Link to="/categories">Add Category</Link>
          <Switch>
            <Route path="/users/register" component={Register} exact={true}></Route>
            <Route path="/users/login" component={Login} exact={true}></Route>
            <Route path="/products" component={ProductList} exact={true}></Route>
            <Route path="/products/new" component={ProductNew} exact={true}></Route>
            <Route path="/products/:id" component={ProductDetails} exact={true}></Route>
            <Route path="/categories" component={AddCategory} exact={true}></Route>
          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
