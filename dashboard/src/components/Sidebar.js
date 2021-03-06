import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';

class Sidebar extends Component {
  render() {
    return (
      <div>
        {/* Left side column. contains the logo and sidebar */}
        <aside class="left-side sidebar-offcanvas">
            {/* sidebar: style can be found in sidebar.less */}
            <section class="sidebar">
                {/* Sidebar user panel */}
                <div class="user-panel">
                    <div class="pull-left image">
                        <img src="img/avatar3.png" class="img-circle" alt="User Image" />
                    </div>
                    <div class="pull-left info">
                        <p>Hello, Lulu</p>

                        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>
                {/* search form */}
                <form action="#" method="get" class="sidebar-form">
                    <div class="input-group">
                        <input type="text" name="q" class="form-control" placeholder="Search..."/>
                        <span class="input-group-btn">
                            <button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </form>
                {/* /.search form */}
                {/* sidebar menu: : style can be found in sidebar.less */}
                <ul class="sidebar-menu">
                    <li class="active">
                        <a href="/home">
                            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-edit"></i> <span>Forms</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/add-products"><i class="fa fa-angle-double-right"></i>Add Products</a></li>
                            <li><a href="/add-category"><i class="fa fa-angle-double-right"></i>Add Category</a></li>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-table"></i> <span>Table Lists</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/product-list"><i class="fa fa-angle-double-right"></i>Product List</a></li>
                            <li><a href="/category-list"><i class="fa fa-angle-double-right"></i>Category List</a></li>
                            <li><a href="/member-list"><i class="fa fa-angle-double-right"></i>Member List</a></li>
                            <li><a href="/order-list"><i class="fa fa-angle-double-right"></i>Order List</a></li>
                        </ul>
                    </li>
                    
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-folder"></i> <span>Others</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/payment-confirmation"><i class="fa fa-angle-double-right"></i>Payment Confirmation</a></li>
                            <li><a href="/sold-items"><i class="fa fa-angle-double-right"></i>Sold Items</a></li>
                            <li><a href="/unsaleable-products"><i class="fa fa-angle-double-right"></i>Unsaleable</a></li>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i className="fa fa-user"></i> <span>Account</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/"><i class="fa fa-angle-double-right"></i>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </section>
            {/* /.sidebar */}
        </aside>   
    </div>
    );
  }
}

export default Sidebar;
