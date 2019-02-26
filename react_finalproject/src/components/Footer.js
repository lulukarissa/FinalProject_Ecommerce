import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Footer extends Component {
  render() {
    if (this.props.location.pathname.slice(0,9) === '/invoice/') {
      return null
    }
    return (
    <div>
        <footer id="footer">{/*Footer*/}
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-sm-2">
                  <div className="companyinfo">
                    <h2><span>GET</span>-Myu</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="col-sm-3">
                    <div className="video-gallery text-center">
                      <a href="#">
                        <div className="iframe-img">
                          <img src="../images/home/iframe1.jpg" alt="" />
                        </div>
                        <div className="overlay-icon">
                          <i className="fa fa-play-circle-o"></i>
                        </div>
                      </a>
                      <p>Watch it</p>
                      <h2>24 DEC 2018</h2>
                    </div>
                  </div>
                  
                  <div className="col-sm-3">
                    <div className="video-gallery text-center">
                      <a href="#">
                        <div className="iframe-img">
                          <img src="../images/home/iframe2.jpg" alt="" />
                        </div>
                        <div className="overlay-icon">
                          <i className="fa fa-play-circle-o"></i>
                        </div>
                      </a>
                      <p>Watch it</p>
                      <h2>24 DEC 2018</h2>
                    </div>
                  </div>
                  
                  <div className="col-sm-3">
                    <div className="video-gallery text-center">
                      <a href="#">
                        <div className="iframe-img">
                          <img src="../images/home/iframe3.jpg" alt="" />
                        </div>
                        <div className="overlay-icon">
                          <i className="fa fa-play-circle-o"></i>
                        </div>
                      </a>
                      <p>Watch it</p>
                      <h2>24 DEC 2018</h2>
                    </div>
                  </div>
                  
                  <div className="col-sm-3">
                    <div className="video-gallery text-center">
                      <a href="#">
                        <div className="iframe-img">
                          <img src="../images/home/iframe4.jpg" alt="" />
                        </div>
                        <div className="overlay-icon">
                          <i className="fa fa-play-circle-o"></i>
                        </div>
                      </a>
                      <p>Watch it</p>
                      <h2>24 DEC 2018</h2>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="address">
                    <img src="../images/home/map.png" alt="" />
                    <p>Sudirman, Jakarta Pusat, DKI Jakarta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-widget">
            <div className="container">
              <div className="row">
                <div className="col-sm-2">
                  <div className="single-widget">
                    <h2>Service</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Online Help</a></li>
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Order Status</a></li>
                      <li><a href="#">Change Location</a></li>
                      <li><a href="#">FAQ’s</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="single-widget">
                    <h2>Quick Shop</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Single</a></li>
                      <li><a href="#">Album</a></li>
                      <li><a href="#">DVD/Blu-ray</a></li>
                      <li><a href="#">Goods</a></li>
                      <li><a href="#">Photobook</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="single-widget">
                    <h2>Policies</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Terms of Use</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="#">Refund Policy</a></li>
                      <li><a href="#">Billing System</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="single-widget">
                    <h2>About Shopper</h2>
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#">Company Information</a></li>
                      <li><a href="#">Careers</a></li>
                      <li><a href="#">Store Location</a></li>
                      <li><a href="#">Affillate Program</a></li>
                      <li><a href="#">Copyright</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-3 col-sm-offset-1">
                  <div className="single-widget">
                    <h2>About Shopper</h2>
                    <form action="#" className="searchform">
                      <input type="text" placeholder="Your email address" />
                      <button type="submit" className="btn btn-default"><i className="fa fa-arrow-circle-o-right"></i></button>
                      <p>Get the most recent updates from <br />our site and be updated your self...</p>
                    </form>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <p className="pull-left">Copyright © 2018 GET-Myu Inc. All rights reserved.</p>
              </div>
            </div>
          </div>
        
      </footer>{/*/Footer*/}
    </div>
    );
  }
}

export default withRouter(Footer);