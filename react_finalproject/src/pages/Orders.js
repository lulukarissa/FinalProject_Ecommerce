import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios';
import swal from '@sweetalert/with-react';

class Cart extends Component {
	state = {
		orderlist: []
	}

	getOrderList = () =>{
		axios.get(`${API_URL}/orders/${this.props.username}`)
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
			var payment = val.payment
			var shipment = val.shipment
			var status = val.status

			return(
				<tr key={i}>
					<td>{id_order}</td>
					{
						payment == 'Not Yet Paid'
						?	<td style={{textAlign: 'center'}}>{payment}<br/><a style={{color:'orange'}} href={`/payment_notif/${id_order}`} target="_blank">Confirm Payment</a></td>
						: <td style={{textAlign: 'center'}}>{payment}</td>
					}
					<td style={{textAlign: 'center'}}>{shipment}</td>
					<td style={{textAlign: 'center'}}>{status}</td>
					<td style={{textAlign: 'center'}}><a style={{color:'orange'}} href={`/invoice/${id_order}`} target="_blank">View Invoice</a></td>
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
								<li className="active">Order</li>
							</ol>
						</div>
						{
							orderlist.length > 0
							? 
							<div>
								<div className="review-payment">
									<h2>Order History</h2>
								</div>
								<div className="table-responsive cart_info">
										<table className="table table-hover">
											<thead>
												<tr className="cart_menu">
													<td style={{textAlign: 'center'}}>Order ID</td>
													<td style={{textAlign: 'center'}}>Payment</td>
													<td style={{textAlign: 'center'}}>Shipment</td>
													<td style={{textAlign: 'center'}}>Status</td>
													<td style={{textAlign: 'center'}}>Details</td>
												</tr>
											</thead>
											<tbody>
												{orderlist}
											</tbody>
										</table>
									</div>
								</div>
						: <div className="col-sm-12">    	
								<h2 className="title text-center">No Order History</h2>
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