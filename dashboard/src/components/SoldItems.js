import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
        products: []
    }

    getProducts = () =>{
        var link = `${API_URL}/sold`

        axios.get(link)
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    componentDidMount(){
        this.getProducts()
    }

  render() {
      
    var products = this.state.products.map((val, i)=>{
        var id_product = val.id_product
        var product_name = val.product_name
        var total = val.total

        return(
            <tr key={i}>
                <td class="text-center">{id_product}</td>
                <td>{product_name}</td>
                <td class="text-center">{total}</td>
            </tr>
        )
    })
    return (
    <div class="skin-black">
    <Header/>
    <Sidebar/>
        <div class="wrapper row-offcanvas row-offcanvas-left">
            {/* Right side column. Contains the navbar and content of the page */}
            <aside class="right-side">                
                {/* Content Header (Page header) */}
                <section class="content-header">
                    <h1>
                        Sold Items
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Others</a></li>
                        <li class="active">Sold Items</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">List Details</h3>                                    
                                </div>{/* /.box-header */}
                                <div class="box-body table-responsive">
                                    <table id="example2" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Id Product</th>
                                                <th class="text-center">Product Name</th>
                                                <th class="text-center">Total Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products}
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* /.box */}
                        </div>
                    </div>

                </section>{/* /.content */}
            </aside>{/* /.right-side */}
        </div>{/* ./wrapper */}
    </div>
    );
  }
}

export default Tables;