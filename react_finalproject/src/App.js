import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Products from './pages/Products';
import Artist from './pages/ProductsbyArtist'
import Category from './pages/ProductsbyCategory'
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Blog from './pages/Blog';
import Blogsingle from './pages/Blogsingle';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Error404 from './pages/Error404'

// import Admin from './pagesAdmin/Tables'
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/products' component={Products} />
            <Route path='/artist/' component={Artist} />
            <Route path='/category/' component={Category} />
            <Route path='/product-details/' component={ProductDetails} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/cart' component={Cart} />
            <Route path='/blog' component={Blog} />
            <Route path='/blog-single' component={Blogsingle} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/contact-us' component={Contact} />
            <Route path='/error' component={Error404} />

            {/* <Route path='/admin' component={Admin} /> */}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
