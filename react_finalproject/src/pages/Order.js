import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Cart extends Component {
	
  render() {
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