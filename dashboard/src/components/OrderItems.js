import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
		orderitems: []
	}

	getOrderItems = () =>{
        var id = this.props.location.pathname.slice(13)
		axios.get(`http://localhost:3210/orderitems/${id}`)
		.then((x)=>{
			this.setState({
				orderitems: x.data
			})
		})
	}

    componentDidMount(){
        this.getOrderItems()
    }

  render() {
      
    var orderitems = this.state.orderitems.map((val, i)=>{
        return(
            <tr key={i}>
                <td>{val.product_name}</td>
                <td>{val.artist}</td>
                <td>IDR {new Intl.NumberFormat().format(val.price)}</td>
                <td class="text-center">{val.quantity}</td>
                <td>IDR {new Intl.NumberFormat().format(val.total_price)}</td>
                <td class="text-center"><a href={`http://localhost:3210/img/${val.image}`} target="__blank">{val.image}</a></td>
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
                        Order Items
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Order Items</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">ID: {this.props.location.pathname.slice(13)}</h3>                                    
                                </div>{/* /.box-header */}
                                { orderitems.length > 0
                                    ? <div class="box-body table-responsive">
                                        <table id="example2" class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Product Name</th>
                                                    <th class="text-center">Artist</th>
                                                    <th class="text-center">Price</th>
                                                    <th class="text-center">Quantity</th>
                                                    <th class="text-center">Total Price</th>
                                                    <th class="text-center">Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderitems}
                                            </tbody>
                                        </table>
                                    </div>
                                : <h4 style={{textAlign: 'center'}}>--No Order Items--<br/><br/></h4>
                                }
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