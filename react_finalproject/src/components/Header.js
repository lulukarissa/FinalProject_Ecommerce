import React, { Component } from 'react';
import axios from 'axios'
import swal from '@sweetalert/with-react'

class Header extends Component {
  state = {
    category: [],
    search: ''
  }

  componentDidMount(){
    var linkcategory = 'http://localhost:3210/category'

    axios.get(linkcategory)
    .then((x)=>{
        this.setState({
            category: x.data
        })
        console.log(x.data)
    })
  }

  search = () =>{
    window.location.href = `/search/${this.state.search}`
  }
  render() {
    var category = this.state.category.map((val, i)=>{
      var id_category = val.id_category
      var category_name = val.category_name

      return(
        <li key={i}><a href={`/category/${id_category}`}>{category_name}</a></li> 
      )
    })
    return (
      <div>
        <header id="header">{/*header*/}
          <div className="header_top">{/*header_top*/}
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="contactinfo">
                    <ul className="nav nav-pills">
                      <li><a href="#"><i className="fa fa-phone"></i> (021) 685 793</a></li>
                      <li><a href="#"><i className="fa fa-envelope"></i> info@getmyu.com</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="social-icons pull-right">
                    <ul className="nav navbar-nav">
                      <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                      <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                      <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/header_top*/}
          
          <div className="header-middle">{/*header-middle*/}
            <div className="container">
              <div className="row">
                <div className="col-sm-4">
                  <div className="logo pull-left">
                    <a href="/"><img src="../images/home/logo.gif" alt="" /></a>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="main-menu pull-right">
                    <ul className="nav navbar-nav">
                      <li><a href="/wishlist"><i className="fa fa-star"></i> Wishlist</a></li>
                      {/* <li><a href="/checkout"><i className="fa fa-crosshairs"></i> Checkout</a></li> */}
                      <li><a href="/cart"><i className="fa fa-shopping-cart"></i> Cart</a></li>
                      {this.props.username
                        ? <li className="dropdown"><a href="#"><i className="fa fa-user"></i> {this.props.username}<i className="fa fa-angle-down"></i></a>
                            <ul role="menu" className="sub-menu">
                                <li><a href={`/profile/${this.props.username}`}>
                                <i className="fa fa-user"></i>  Profile</a></li>
                                <li><a href="#"
                                onClick={(e)=>{
                                  e.preventDefault()
                                  localStorage.removeItem('username')
                                  swal("You just logged out!", "Please login again to proccess the shopping cart")
                                  .then(()=>{window.location.href = '/home'});
                                  }}><i className="fa fa-lock"></i>  Logout</a></li> 
                            </ul>
                          </li> 
                        : <li><a href="/login"><i className="fa fa-lock"></i> Login</a></li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/header-middle*/}
        
          <div className="header-bottom">{/*header-bottom*/}
            <div className="container">
              <div className="row">
                <div className="col-sm-9">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="mainmenu pull-left">
                    <ul className="nav navbar-nav collapse navbar-collapse">
                      <li><a href="/">Home</a></li>
                      <li className="dropdown"><a href="/products">Products<i className="fa fa-angle-down"></i></a>
                          <ul role="menu" className="sub-menu">
                            {category}
                          </ul>
                      </li> 
                      {/* <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                          <ul role="menu" className="sub-menu">
                              <li><a href="/checkout">Checkout</a></li> 
                              <li><a href="/cart">Cart</a></li>
                          </ul>
                      </li>  */}
                      <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                          <ul role="menu" className="sub-menu">
                              <li><a href="/blog">Blog List</a></li>
                              <li><a href="/blog-single">Blog Single</a></li>
                          </ul>
                      </li>
                      <li><a href="/contact-us">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="search_box pull-right">
                    <input type="text" placeholder="Search"
                    onChange={(e)=>{this.setState({search: e.target.value})}}
                    onKeyPress={(e)=>{
                      if(e.key == 'Enter'){
                        this.search()
                      }
                    }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/header-bottom*/}
        </header>{/*/header*/}
      </div>
    );
  }
}

export default Header;