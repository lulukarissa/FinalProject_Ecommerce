import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProductList from './components/ProductList'
import CategoryList from './components/CategoryList'
import MemberList from './components/MemberList'
import AddProducts from './components/AddProducts'
import AddCategory from './components/AddCategory'
import EditProduct from './components/EditProduct'
import EditCategory from './components/EditCategory'


class App extends Component {
  state = {
    username: localStorage.getItem('username')
  }

  getUsername = (x) => {
    this.setState({
      username: x
    })
  }

  render() {
    return (
      <div class="skin-black">
        <div>
            <Route exact path='/' render={(props) => <Login {...props} getUsername={this.getUsername} />}/>
            <Route path='/home' component={Dashboard} />
            <Route path='/product-list' component={ProductList} />
            <Route path='/category-list' component={CategoryList} />
            <Route path='/member-list' component={MemberList} />
            <Route path='/add-products' component={AddProducts} />
            <Route path='/add-category' component={AddCategory} />
            <Route path='/edit-product/' component={EditProduct} />
            <Route path='/edit-category/' component={EditCategory} />
        </div>   
      </div>
    );
  }
}

export default App;
