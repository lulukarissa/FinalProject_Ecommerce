import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Products from './pages/Products';
import Artist from './pages/ProductsbyArtist'
import Category from './pages/ProductsbyCategory'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Order from './pages/Order'
import PaymentNotif from './pages/PaymentNotif'
import Invoice from './pages/Invoice'
import Blog from './pages/Blog';
import Blogsingle from './pages/Blogsingle';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import UserProfileEdit from './pages/UserProfileEdit';
import Contact from './pages/Contact';
import Error404 from './pages/Error404'

import {Route, Switch} from 'react-router-dom';

class App extends Component {
  state = {
    username: localStorage.getItem('username'),
    city: localStorage.getItem('city'),
    total: ''
  }


  getUsername = (x) => {
    this.setState({
      username: x
    })
  }

  getCity = (x) => {
    this.setState({
      city: x
    })
  }

  getTotal = (x) =>{
    this.setState({
      total: x
    })
  }
  
  render() {
    // alert(this.state.username)
    return (
      <div>
        <Header username={this.state.username}/>
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} username={this.state.username} />}/>
            <Route path='/home' render={(props) => <Home {...props} username={this.state.username} />}/>
            <Route path='/products' render={(props) => <Products {...props} username={this.state.username} />}/>
            <Route path='/search/' render={(props) => <Search {...props} username={this.state.username} />}/>
            <Route path='/artist/' render={(props) => <Artist {...props} username={this.state.username} />}/>
            <Route path='/category/' render={(props) => <Category {...props} username={this.state.username} />}/>
            <Route path='/product-details/' render={(props) => <ProductDetails {...props} username={this.state.username} />}/>
            <Route path='/cart/checkout'  render={(props) => <Checkout {...props} username={this.state.username} city={this.state.city} getTotal={this.getTotal} />}/>
            <Route path='/cart'  render={(props) => <Cart {...props} username={this.state.username} />}/>
            <Route path='/wishlist'  render={(props) => <Wishlist {...props} username={this.state.username} />}/>
            <Route path='/order'  render={(props) => <Order {...props} username={this.state.username} />}/>
            <Route path='/payment_notif/'  render={(props) => <PaymentNotif {...props} username={this.state.username} />}/>
            <Route path='/orders/invoice/'  render={(props) => <Invoice {...props} username={this.state.username} />}/>
            <Route path='/blog' component={Blog} />
            <Route path='/blog-single' component={Blogsingle} />
            <Route path='/login' render={(props) => <Login {...props} getUsername={this.getUsername} />}/>
            <Route path='/register' render={(props) => <Register {...props} getUsername={this.getUsername} />}/>
            <Route path='/profile/' render={(props) => <UserProfile {...props} username={this.state.username} />}/>
            <Route path='/editprofile/' render={(props) => <UserProfileEdit {...props} username={this.state.username} getCity={this.getCity} />}/>
            <Route path='/contact-us' component={Contact} />
            <Route path='*' component={Error404} />
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
