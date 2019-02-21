import React, { Component } from 'react';

class Checkout extends Component {
  render() {
    return (
        <div>
            <section id="cart_items">
				<div className="container">
					<div className="breadcrumbs">
						<ol className="breadcrumb">
						<li><a href="#">Home</a></li>
						<li className="active">Check out</li>
						</ol>
					</div>{/*/breadcrums*/}

					<div className="step-one">
						<h2 className="heading">Step1</h2>
					</div>
					<div className="checkout-options">
						<h3>New User</h3>
						<p>Checkout options</p>
						<ul className="nav">
							<li>
								<label><input type="checkbox"/> Register Account</label>
							</li>
							<li>
								<label><input type="checkbox"/> Guest Checkout</label>
							</li>
							<li>
								<a href=""><i className="fa fa-times"></i>Cancel</a>
							</li>
						</ul>
					</div>{/*/checkout-options*/}

					<div className="register-req">
						<p>Please use Register And Checkout to easily get access to your order history, or use Checkout as Guest</p>
					</div>{/*/register-req*/}

					<div className="shopper-informations">
						<div className="row">
							<div className="col-sm-3">
								<div className="shopper-info">
									<p>Shopper Information</p>
									<form>
										<input type="text" placeholder="Display Name"/>
										<input type="text" placeholder="User Name"/>
										<input type="password" placeholder="Password"/>
										<input type="password" placeholder="Confirm password"/>
									</form>
									<a className="btn btn-primary" href="">Get Quotes</a>
									<a className="btn btn-primary" href="">Continue</a>
								</div>
							</div>
							<div className="col-sm-5 clearfix">
								<div className="bill-to">
									<p>Bill To</p>
									<div className="form-one">
										<form>
											<input type="text" placeholder="Company Name"/>
											<input type="text" placeholder="Email*"/>
											<input type="text" placeholder="Title"/>
											<input type="text" placeholder="First Name *"/>
											<input type="text" placeholder="Middle Name"/>
											<input type="text" placeholder="Last Name *"/>
											<input type="text" placeholder="Address 1 *"/>
											<input type="text" placeholder="Address 2"/>
										</form>
									</div>
									<div className="form-two">
										<form>
											<input type="text" placeholder="Zip / Postal Code *"/>
											<select>
												<option>-- Country --</option>
												<option>Indonesia</option>
												<option>Malaysia</option>
												<option>Singapore</option>
												<option>Thailand</option>
												<option>Philippines</option>
											</select>
											<select>
												<option>-- State / Province / Region --</option>
												<option>Indonesia</option>
												<option>Malaysia</option>
												<option>Singapore</option>
												<option>Thailand</option>
												<option>Philippines</option>
											</select>
											<input type="password" placeholder="Confirm password"/>
											<input type="text" placeholder="Phone *"/>
											<input type="text" placeholder="Mobile Phone"/>
											<input type="text" placeholder="Fax"/>
										</form>
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="order-message">
									<p>Shipping Order</p>
									<textarea name="message"  placeholder="Notes about your order, Special Notes for Delivery" rows="16"></textarea>
									<label><input type="checkbox"/> Shipping to bill address</label>
								</div>	
							</div>					
						</div>
					</div>
					<div className="review-payment">
						<h2>Review & Payment</h2>
					</div>

					<div className="table-responsive cart_info">
						<table className="table table-condensed">
							<thead>
								<tr className="cart_menu">
									<td className="image">Item</td>
									<td className="description"></td>
									<td className="price">Price</td>
									<td className="quantity">Quantity</td>
									<td className="total">Total</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="cart_product">
										<a href=""><img src="images/cart/one.jpg" alt=""/></a>
									</td>
									<td className="cart_description">
										<h4><a href="">Title</a></h4>
										<p>Artist</p>
									</td>
									<td className="cart_price">
										<p>IDR 435,000</p>
									</td>
									<td className="cart_quantity">
										<div className="cart_quantity_button">
											<a className="cart_quantity_up" href=""> + </a>
											<input className="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2"/>
											<a className="cart_quantity_down" href=""> - </a>
										</div>
									</td>
									<td className="cart_total">
										<p className="cart_total_price">IDR 435,000</p>
									</td>
									<td className="cart_delete">
										<a className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
									</td>
								</tr>

								<tr>
									<td className="cart_product">
										<a href=""><img src="images/cart/two.jpg" alt=""/></a>
									</td>
									<td className="cart_description">
										<h4><a href="">Title</a></h4>
										<p>Artist</p>
									</td>
									<td className="cart_price">
										<p>IDR 435,000</p>
									</td>
									<td className="cart_quantity">
										<div className="cart_quantity_button">
											<a className="cart_quantity_up" href=""> + </a>
											<input className="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2"/>
											<a className="cart_quantity_down" href=""> - </a>
										</div>
									</td>
									<td className="cart_total">
										<p className="cart_total_price">IDR 435,000</p>
									</td>
									<td className="cart_delete">
										<a className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
									</td>
								</tr>
								<tr>
									<td className="cart_product">
										<a href=""><img src="images/cart/three.jpg" alt=""/></a>
									</td>
									<td className="cart_description">
										<h4><a href="">Title</a></h4>
										<p>Artist</p>
									</td>
									<td className="cart_price">
										<p>IDR 435,000</p>
									</td>
									<td className="cart_quantity">
										<div className="cart_quantity_button">
											<a className="cart_quantity_up" href=""> + </a>
											<input className="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2"/>
											<a className="cart_quantity_down" href=""> - </a>
										</div>
									</td>
									<td className="cart_total">
										<p className="cart_total_price">IDR 435,000</p>
									</td>
									<td className="cart_delete">
										<a className="cart_quantity_delete" href=""><i className="fa fa-times"></i></a>
									</td>
								</tr>
								<tr>
									<td colspan="4">&nbsp;</td>
									<td colspan="2">
										<table className="table table-condensed total-result">
											<tr>
												<td>Cart Sub Total</td>
												<td>IDR 1,305,000</td>
											</tr>
											<tr>
												<td>Exo Tax</td>
												<td>IDR 25,000</td>
											</tr>
											<tr className="shipping-cost">
												<td>Shipping Cost</td>
												<td>Free</td>										
											</tr>
											<tr>
												<td>Total</td>
												<td><span>IDR 1,330,000</span></td>
											</tr>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="payment-options">
							<span>
								<label><input type="checkbox"/> Direct Bank Transfer</label>
							</span>
							<span>
								<label><input type="checkbox"/> Check Payment</label>
							</span>
							<span>
								<label><input type="checkbox"/> Paypal</label>
							</span>
						</div>
				</div>
			</section> {/*/#cart_items*/}
        </div>
    );
  }
}

export default Checkout;