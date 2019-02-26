import React, { Component } from 'react';
import axios from 'axios'
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
        orderitems: [],
        orderdetails: ''
	}

	getOrderItems = () =>{
        var id = this.props.location.pathname.slice(9)
		axios.get(`http://localhost:3210/orderitems/${id}`)
		.then((x)=>{
			this.setState({
				orderitems: x.data
			})
		})
    }
    
    getOrderDetails = () =>{
        var id = this.props.location.pathname.slice(9)
		axios.get(`http://localhost:3210/ordersbyid/${id}`)
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
                <td>
                <div className="row">
					<div className="col-sm-2">
						<img src={`http://localhost:3210/img/${val.image}`} style={{width:'50px', height:'50px'}}/>
					</div>
					<div className="col-sm-10">
						<b style={{marginLeft:'10px'}}>{val.product_name}</b><br/>
						<small style={{marginLeft:'10px'}}>{val.artist}</small>
					</div>
					</div>
                </td>
                <td>IDR <span style={{float:'right'}}>{new Intl.NumberFormat().format(val.price)}</span></td>
                <td class="text-center">{val.quantity}</td>
                <td>IDR <span style={{float:'right'}}>{new Intl.NumberFormat().format(val.total_price)}</span></td>
            </tr>
        )
    })
    return (
        <div>
        <section className="cart_items">
        <div className="container">
        <div style={{width:'70rem', marginLeft:'200px'}}>            
            <section class="content-header">
            <div className="row" >
                <div className="col-sm-6">
                  <div className="logo pull-left" style={{marginTop:'20px'}}>
                    <a href="/"><img src="../images/home/logo.jpg" alt="" /></a>
                  </div>
                </div>
                <div className="col-sm-6">
                    <div className="logo pull-right">
                        <h2>Invoice</h2>
                        <h4 style={{color:'orange'}}>ID: {this.props.location.pathname.slice(9)}</h4>
                    </div>
                </div>
            </div><br/><br/>
                    <h4>
                        <b>Delivery Address:</b>
                    </h4>
                    <h5>
                    {this.state.orderdetails.fullname}<br/>
                    {this.state.orderdetails.address}<br/>
                    {this.state.orderdetails.telephone}<br/>
                    </h5>
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
                                    ? <div class="table-responsive cart_info">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Product Name</th>
                                                    <th class="text-center">Price</th>
                                                    <th class="text-center">Quantity</th>
                                                    <th class="text-center">Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderitems}
                                                <tr>
                                                    <td colspan="3">
                                                    <span style={{float:'right'}}>Subtotal:</span><br/>
                                                    <span style={{float:'right'}}>Shipping Cost:</span><br/>
                                                    <b><span style={{float:'right', color:'orange'}}>Total Price:</span></b><br/>
                                                    </td>
                                                    <td colspan="1">
                                                    IDR<span style={{float:'right'}}>{new Intl.NumberFormat().format(this.state.orderdetails.subtotal)}</span><br/>
                                                    IDR<span style={{float:'right'}}>{new Intl.NumberFormat().format(this.state.orderdetails.shippingcost)}</span><br/>
                                                    <b><span style={{color:'orange'}}>IDR</span><span style={{float:'right', color:'orange'}}>{new Intl.NumberFormat().format(this.state.orderdetails.totalamount)}</span></b><br/>
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
                </div>
            </div>{/* /.right-side */}
        </section>{/* ./wrapper */}
    </div>
    );
  }
}

export default Tables;