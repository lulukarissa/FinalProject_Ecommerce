import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
		orderlist: []
	}

	getOrderList = () =>{
		axios.get(`http://localhost:3210/orders`)
		.then((x)=>{
			this.setState({
				orderlist: x.data
			})
		})
	}

    componentDidMount(){
        this.getOrderList()
    }

    changeShipment = (e) =>{
        axios.put(`http://localhost:3210/ordershipment/${e}`,{
            shipment: 'Shipped'
        })
        .then(()=>{this.getOrderList()})
    }

    changeStatus = (e) =>{
        axios.put(`http://localhost:3210/ordercomplete/${e}`,{
            status: 'Completed'
        })
        .then(()=>{this.getOrderList()})
    }

  render() {
      
    var orderlist = this.state.orderlist.map((val, i)=>{
        return(
            <tr key={i}>
                <td class="text-center">{val.no}</td>
                <td><a href={`/order-items/${val.id_order}`}>{val.id_order}</a></td>
                <td>{val.username}</td>
                <td>IDR {new Intl.NumberFormat().format(val.totalamount)}</td>
                <td>{val.address}</td>
                <td>{val.telephone}</td>
                <td class="text-center">
                    {val.payment}
                </td>
                <td class="text-center">
                    {
                        val.shipment == 'Shipped'
                        ? <div>
                            {val.shipment}<br/>
                        </div>
                        : <div>
                            {val.shipment}<br/>
                            <a href="#" onClick={(e)=>{e.preventDefault();this.changeShipment(val.id_order)}}>Change</a>
                        </div>
                    }  
                </td>
                <td class="text-center">
                {
                        val.status == 'Completed'
                        ? <div>
                            {val.status}<br/>
                        </div>
                        : <div>
                            {val.status}<br/>
                            <a href="#" onClick={(e)=>{e.preventDefault();this.changeStatus(val.id_order)}}>Change</a>
                        </div>
                    }  
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
                        Order List
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Order List</li>
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
                                { orderlist.length > 0
                                    ? <div class="box-body table-responsive">
                                        <table id="example2" class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">No</th>
                                                    <th class="text-center">Order ID</th>
                                                    <th class="text-center">Username</th>
                                                    <th class="text-center">Total Amount</th>
                                                    <th class="text-center">Address</th>
                                                    <th class="text-center">Telephone</th>
                                                    <th class="text-center">Payment</th>
                                                    <th class="text-center">Shipment</th>
                                                    <th class="text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderlist}
                                            </tbody>
                                        </table>
                                    </div>
                                : <h4 style={{textAlign: 'center'}}>--No Order List--<br/><br/></h4>
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