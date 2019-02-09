import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import ProductList from './components/ProductList'
import MemberList from './components/MemberList'
import AddProducts from './components/AddProducts'
import AddCategory from './components/AddCategory'
import EditProduct from './components/EditProduct'


class App extends Component {
  render() {
    return (
      <div class="skin-black">
        <div>
            <Route exact path='/' component={ProductList} />
            <Route path='/product-list' component={ProductList} />
            <Route path='/member-list' component={MemberList} />
            <Route path='/add-products' component={AddProducts} />
            <Route path='/add-category' component={AddCategory} />
            <Route path='/edit-product/' component={EditProduct} />
        </div>   
      </div>
    );
  }
}

export default App;
