import React, { Component } from 'react';

class Header extends Component {
  render() {
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
          
          <div className="header-bottom">{/*header-middle*/}
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
                      <li><a href="#"><i className="fa fa-star"></i> Wishlist</a></li>
                      <li><a href="/checkout"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                      <li><a href="/cart"><i className="fa fa-shopping-cart"></i> Cart</a></li>

                      

                      {this.props.username
                        ? <li className="dropdown"><a href="#"><i className="fa fa-user"></i> {this.props.username}<i className="fa fa-angle-down"></i></a>
                            <ul role="menu" className="sub-menu">
                                <li><a href={`/profile/${this.props.username}`}>
                                <i className="fa fa-user"></i>  Profile</a></li>
                                <li><a href="/home"
                                onClick={()=>{
                                  localStorage.removeItem('username')
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
                      <li><a href="/" className="active">Home</a></li>
                      <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                          <ul role="menu" className="sub-menu">
                              <li><a href="/products">Products</a></li>
                              <li><a href="/checkout">Checkout</a></li> 
                              <li><a href="/cart">Cart</a></li>
                          </ul>
                      </li> 
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
                    <input type="text" placeholder="Search"/>
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