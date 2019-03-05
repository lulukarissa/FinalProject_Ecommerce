import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';

class Header extends Component {
  render() {
    return (
      <div class="skin-black">
        {/* header logo: style can be found in header.less */}
        <header class="header">
            
            {/* Header Navbar: style can be found in header.less */}
            <nav class="navbar navbar-static-top" role="navigation">
                <a href="/home" class="logo">
                    <img src="img/logo.png" style={{width: "170px", height: "auto"}} alt="" />
                </a>
                {/* Sidebar toggle button*/}
                
            </nav>
        </header>   
    </div>
    );
  }
}

export default Header;
