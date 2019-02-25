import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Cart extends Component {
	state = {
		orderlist: []
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

			return(
				<tr>
					<td style={{textAlign: 'center'}}>{id_order}</td>
					<td style={{textAlign: 'center'}}>{id_product}</td>
					<td style={{textAlign: 'center'}}>{totalamount}</td>
					<td style={{textAlign: 'center'}}>{payment}</td>
					<td style={{textAlign: 'center'}}>{shipment}</td>
					<td style={{textAlign: 'center'}}>view invoice</td>
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