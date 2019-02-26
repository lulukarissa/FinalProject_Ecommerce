import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';

class Cart extends Component {
	state = {
		orderlist: [],
		orderitems: []
	}

	getOrderList = () =>{
		axios.get(`http://localhost:3210/orders/${this.props.username}`)
		.then((x)=>{
			this.setState({
				orderlist: x.data
			})
		})
	}

	getItemOrders = (e) =>{
		axios.get(`http://localhost:3210/orderitems/${e}`)
			.then((x)=>{
				this.setState({
					orderitems: x.data
				})
				console.log(x.data)
			})
	}
	
	componentDidMount(){
		this.getOrderList()
	}

  render() {
		var orderitems = this.state.orderitems.map((val,i)=>{
			return(
				<li className="list-group-item" key={i} style={{marginRight:'20px'}}>
				<div className="row">
					<div className="col-sm-2">
						<img src={`http://localhost:3210/img/${val.image}`} style={{width:'50px', height:'50px'}}/>
					</div>
					<div className="col-sm-10">
						<b style={{marginLeft:'10px'}}>{val.product_name}</b><br/>
						<small style={{marginLeft:'10px'}}>{val.artist}</small>
					</div>
					</div>
				</li>
			)
		})

		var orderlist = this.state.orderlist.map((val,i)=>{
			var id_order = val.id_order
			var id_product = val.id_product
			var totalamount = val.totalamount
			var payment = val.payment
			var shipment = val.shipment

			return(
				<tr key={i}>
					<td>{id_order}</td>
					<td>
						{
							orderitems.length > 0
							? <ul>{orderitems}</ul>
							: <a href="#" style={{color:'orange'}} onClick={(e)=>{e.preventDefault();this.getItemOrders(id_order)}}>Item List</a>
						}
					</td>
					<td style={{textAlign: 'center'}}>IDR {new Intl.NumberFormat().format(totalamount)}</td>
					{
						payment == 'Not Yet Paid'
						?	<td style={{textAlign: 'center'}}>{payment}<br/><a style={{color:'orange'}} href={`/payment_notif/${id_order}`}>Confirm Payment</a></td>
						: <td style={{textAlign: 'center'}}>{payment}</td>
					}
					<td style={{textAlign: 'center'}}>{shipment}</td>
					<td style={{textAlign: 'center'}}><a href={`/invoice/${id_order}`}>View Invoice</a></td>
				</tr>
			)
		})
		
    return (
        <div>
					<section id="cart_items">
					<div className="container">
						<div className="breadcrumbs">
							<ol className="breadcrumb">
								<li><a href="/home">Home</a></li>
								<li className="active">Order List</li>
							</ol>
						</div>
						{
							orderlist.length > 0
							? 
							<div>
								<div className="review-payment">
									<h2>Order List</h2>
								</div>
								<div className="table-responsive cart_info">
										<table className="table table-hover">
											<thead>
												<tr className="cart_menu">
													<td style={{textAlign: 'center'}}>Order ID</td>
													<td style={{textAlign: 'center'}}>Items</td>
													<td style={{textAlign: 'center'}}>Total</td>
													<td style={{textAlign: 'center'}}>Payment</td>
													<td style={{textAlign: 'center'}}>Shipment</td>
													<td style={{textAlign: 'center'}}>Remarks</td>
												</tr>
											</thead>
											<tbody>
												{orderlist}
											</tbody>
										</table>
									</div>
								</div>
						: <div className="col-sm-12">    	
								<h2 className="title text-center">No Order List</h2>
								<div id="gmap" className="contact-map card-body">
									<center>
									<img src="images/home/list.png" style={{width: '200px',height: 'auto'}}></img><br/>
									</center>
								</div>		    				    				
							</div>	
						}	
				</div>
			</section> {/*/#cart_items*/}

			
        </div>
    );
  }
}

export default Cart;