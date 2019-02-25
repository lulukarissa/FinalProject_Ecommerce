import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

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
	
	componentDidMount(){
		this.getOrderList()
	}

  render() {
		var orderlist = this.state.orderlist.map((val,i)=>{
			var id_order = val.id_order
			var id_product = val.id_product
			var totalamount = val.totalamount
			var payment = val.payment
			var shipment = val.shipment

			axios.get(`http://localhost:3210/orderitems/${id_order}`)
			.then((x)=>{
				this.setState({
					orderitems: x.data
				})
			})

			var orderitems = this.state.orderitems.map((val,i)=>{
				return(
					<li className="list-group-item" key={i}>
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

			return(
				<tr key={i}>
					<td>{id_order}</td>
					<td>
						<ul className="list-group">
							{orderitems}
						</ul>
					</td>
					<td style={{textAlign: 'center'}}>IDR {new Intl.NumberFormat().format(totalamount)}</td>
					{
						payment == 'Not Yet Paid'
						?	<td style={{textAlign: 'center'}}>{payment}<br/><a style={{color:'orange'}} href={`/payment_notif/${id_order}`}>Confirm Payment</a></td>
						: <td style={{textAlign: 'center'}}>{payment}</td>
					}
					<td style={{textAlign: 'center'}}>{shipment}</td>
					<td style={{textAlign: 'center'}}>View Invoice</td>
				</tr>
			)
		})
		
    return (
        <div>
					<section id="cart_items">
					<div className="container">
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
				</div>
			</section> {/*/#cart_items*/}

			
        </div>
    );
  }
}

export default Cart;