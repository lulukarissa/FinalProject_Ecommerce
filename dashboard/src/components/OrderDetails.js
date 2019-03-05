import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
        orderitems: [],
        orderdetails: ''
	}

	getOrderItems = () =>{
        var id = this.props.location.pathname.slice(15)
		axios.get(`${API_URL}/orderitems/${id}`)
		.then((x)=>{
			this.setState({
				orderitems: x.data
			})
		})
    }
    
    getOrderDetails = () =>{
        var id = this.props.location.pathname.slice(15)
		axios.get(`${API_URL}/ordersbyid/${id}`)
		.then((x)=>{
			this.setState({
				orderdetails: x.data[0]
			})
		})
    }

    componentDidMount(){
        this.getOrderItems()
        this.getOrderDetails()
    }

  render() {
      
    var orderitems = this.state.orderitems.map((val, i)=>{
        return(
            <tr key={i}>
                <td>{val.product_name}</td>
                <td>{val.artist}</td>
                <td class="text-center"><a href={`${API_URL}/img/${val.image}`} target="_blank">{val.image}</a></td>
                <td>IDR <span style={{float:'right'}}>{new Intl.NumberFormat().format(val.price)}</span></td>
                <td class="text-center">{val.quantity}</td>
                <td>IDR <span style={{float:'right'}}>{new Intl.NumberFormat().format(val.total_price)}</span></td>
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
                        Order Details
                    </h1>
                    <h4>
                        ID: {this.props.location.pathname.slice(15)}
                    </h4><br/>

                    <h4>
                        <b>Delivery Address:</b>
                    </h4>
                    <h5>
                    {this.state.orderdetails.fullname}<br/>
                    {this.state.orderdetails.address}<br/>
                    {this.state.orderdetails.telephone}<br/>
                    </h5>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Order Details</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">Order Items</h3>                                    
                                </div>{/* /.box-header */}
                                { orderitems.length > 0
                                    ? <div class="box-body table-responsive">
                                        <table id="example2" class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Product Name</th>
                                                    <th class="text-center">Artist</th>
                                                    <th class="text-center">Image</th>
                                                    <th class="text-center">Price</th>
                                                    <th class="text-center">Quantity</th>
                                                    <th class="text-center">Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderitems}
                                                <tr>
                                                    <td colspan="5">
                                                    <span style={{float:'right'}}>Subtotal:</span><br/>
                                                    <span style={{float:'right'}}>Shipping Cost:</span><br/>
                                                    <span style={{float:'right'}}>Total Price:</span><br/>
                                                    </td>
                                                    <td colspan="1">
                                                    IDR<span style={{float:'right'}}>{new Intl.NumberFormat().format(this.state.orderdetails.subtotal)}</span><br/>
                                                    IDR<span style={{float:'right'}}>{new Intl.NumberFormat().format(this.state.orderdetails.shippingcost)}</span><br/>
                                                    IDR<span style={{float:'right'}}>{new Intl.NumberFormat().format(this.state.orderdetails.totalamount)}</span><br/>
                                                    </td>
                                                </tr>
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