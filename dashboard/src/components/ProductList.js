import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';


class Tables extends Component {
    state = {
        products: []
    }
    componentDidMount(){
    var link = 'http://localhost:3210/product'

    axios.get(link)
    .then((x)=>{
        this.setState({
            products: x.data
        })
        console.log(x.data)
    })
    .catch()
  }

    deleteData = (e) =>{
        var link = `http://localhost:3210/product/${e}`

        axios.delete(link)
        .then((x)=>{
            console.log(x)
        })
        .catch()

        window.location.reload();
    }

        updateData = () =>{
            
        }

  render() {
      
    var products = this.state.products.map((val, i)=>{
        var id_product = val.id_product
        var product_name = val.product_name
        var artist = val.artist
        var price = val.price
        var quantity = val.quantity
        var category = val.category
        var image = val.image

        return(
            <tr key={i}>
                <td class="text-center">{id_product}</td>
                <td>{product_name}</td>
                <td>{artist}</td>
                <td>{price}</td>
                <td class="text-center">{quantity}</td>
                <td class="text-center">{category}</td>
                <td><a href={`http://localhost:3210/img/${image}`} target="__blank">{image}</a></td>
                <td class="text-center">
                    <a class="btn btn-primary" href={`/edit-product/${id_product}`}>Edit</a>
                    <span>  </span>
                    <button class="btn btn-danger"
                    onClick={()=>{this.deleteData(id_product)}}>Delete</button>
                </td>
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
                        Product List
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Product List</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
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
                                                <th class="text-center">Artist</th>
                                                <th class="text-center">Price</th>
                                                <th class="text-center">Quantity</th>
                                                <th class="text-center">Category</th>
                                                <th class="text-center">Image</th>
                                                <th class="text-center">Settings</th>
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
