import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import Label from '../components/Label';
// import Header from '../components/Header';
// import Footer from '../components/Footer';


class Blog extends Component {
  render() {
    return (
        <div>
            <section>
                <div className="container">
                    <div className="row">
                        <Label/>
                        <div className="col-sm-9">
                            <div className="blog-post-area">
                                <h2 className="title text-center">Latest From our Blog</h2>
                                <div className="single-blog-post">
                                    <h3>SEKAI NO OWARI to release three New Albums in 2019</h3>
                                    <div className="post-meta">
                                        <ul>
                                            <li><i className="fa fa-user"></i> Kanou</li>
                                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i className="fa fa-calendar"></i> DEC 5, 2018</li>
                                        </ul>
                                        <span>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                        </span>
                                    </div>
                                    <a href="">
                                        <img src="images/blog/blog-one.jpg" alt=""/>
                                    </a>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <a  className="btn btn-primary" href="">Read More</a>
                                </div>
                                <div className="single-blog-post">
                                    <h3>Tomomi “The Voice of Asia” Itano to release NEW single in 2019</h3>
                                    <div className="post-meta">
                                        <ul>
                                            <li><i className="fa fa-user"></i> Kanou</li>
                                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i className="fa fa-calendar"></i> DEC 5, 2018</li>
                                        </ul>
                                        <span>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-half-o"></i>
                                        </span>
                                    </div>
                                    <a href="">
                                        <img src="images/blog/blog-two.jpg" alt=""/>
                                    </a>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <a  className="btn btn-primary" href="">Read More</a>
                                </div>
                                <div className="single-blog-post">
                                    <h3>Tackey & Tsubasa to reunite at Johnnys Countdown and release best album “Thanks Two you”</h3>
                                    <div className="post-meta">
                                        <ul>
                                            <li><i className="fa fa-user"></i> Kanou</li>
                                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i className="fa fa-calendar"></i> DEC 5, 2018</li>
                                        </ul>
                                        <span>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-half-o"></i>
                                        </span>
                                    </div>
                                    <a href="">
                                        <img src="images/blog/blog-three.jpg" alt=""/>
                                    </a>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <a  className="btn btn-primary" href="">Read More</a>
                                </div>
                                <div className="pagination-area">
                                    <ul className="pagination">
                                        <li><a href="" className="active">1</a></li>
                                        <li><a href="">2</a></li>
                                        <li><a href="">3</a></li>
                                        <li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	        </section>
        </div>
    );
  }
}

export default Blog;