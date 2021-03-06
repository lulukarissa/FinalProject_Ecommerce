import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';

class Error404 extends Component {
  render() {
    return (
        <div>
            <div className="container text-center" style={{marginBottom: '50px'}}>
                <div className="logo-404">
                    <a href="/"><img src="images/home/logo.png" alt="" /></a>
                </div>
                <div className="content-404">
                    <img src="images/404/404a.png" className="img-responsive" alt="" />
                    <h3><b>OPPS!</b> We Couldn’t Find this Page</h3>
                    <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
                    {/* <h4><a href="/">Bring me back Home</a></h4> */}
                </div>
	        </div>
        </div>
    );
  }
}

export default Error404;