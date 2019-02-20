import React, { Component } from 'react';
import axios from 'axios';

class Cart extends Component {
	state = {
		cart: []
	}

	componentDidMount(){
		var url = `http://localhost:3210/cart/${this.props.username}`
		axios.get(url)
		.then((x)=>{
			this.setState({
				cart: x.data
			})
		})
	}

	deleteCart = (e) =>{
		axios.delete(`http://localhost:3210/cartdelete/${e}`)
		.then((x)=>{
			console.log(x)
		})
		
		alert('Successfully removed product from cart!')
		window.location.reload()
	}

  render() {
		var cart = this.state.cart.map((val,i)=>{
		var image = val.image
		var product_name = val.product_name
		var artist = val.artist
		var price = val.price
		var quantity = val.quantity
		var total_price = val.total_price
		var id_cart = val.id_cart

			return(
				<tr>
					<td className="cart_product">
						<a href=""><img src={`http://localhost:3210/img/${image}`} style={{width:'150px', height:'150px'}} alt=""/></a>
					</td>
					<td className="cart_description">
						<h4><a href="">{product_name}</a></h4>
						<p>{artist}</p>
					</td>
					<td className="cart_price">
						<p>IDR {price}</p>
					</td>
					<td className="cart_quantity">
						<div className="cart_quantity_button">
							{/* <a className="cart_quantity_up" href=""> + </a> */}
							<input className="cart_quantity_input" type="text" name="quantity" value={quantity} autocomplete="off" size="2"/>
							{/* <a className="cart_quantity_down" href=""> - </a> */}
						</div>
					</td>
					<td className="cart_total">
						<p className="cart_total_price">IDR {total_price}</p>
					</td>
					<td className="cart_delete">
						<a className="cart_quantity_delete" onClick={()=>{this.deleteCart(id_cart)}}><i className="fa fa-times"></i></a>
					</td>
				</tr>
			)
		})
    return (
        <div>
			<section id="cart_items">
				<div className="container">
					<div className="breadcrumbs">
						<ol className="breadcrumb">
						<li><a href="/">Home</a></li>
						<li className="active">Shopping Cart</li>
						</ol>
					</div>

					{
						cart
						? <div className="table-responsive cart_info">
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
								{cart}
							</tbody>
						</table>
					</div>

					: <div className="col-sm-12">    	
							<h2 className="title text-center">No cart</h2>
							<div id="gmap" className="contact-map card-body">
								<center>
								<img src="images/home/cart.png" style={{width: '200px',height: 'auto'}}></img>	
								</center>
							</div>		    				    				
						</div>	
					}
				</div>
			</section> {/*/#cart_items*/}

			<section id="do_action">
				<div className="container">
					<div className="heading">
						<h3>What would you like to do next?</h3>
						<p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<div className="chose_area">
								<ul className="user_option">
									<li>
										<input type="checkbox"/>
										<label>Use Coupon Code</label>
									</li>
									<li>
										<input type="checkbox"/>
										<label>Use Gift Voucher</label>
									</li>
									<li>
										<input type="checkbox"/>
										<label>Estimate Shipping & Taxes</label>
									</li>
								</ul>
								<ul className="user_info">
									<li className="single_field">
										<label>Country:</label>
										<select>
											<option>Indonesia</option>
											<option>Malaysia</option>
											<option>Singapore</option>
											<option>Thailand</option>
											<option>Philippines</option>
										</select>
										
									</li>
									<li className="single_field">
										<label>Region / State:</label>
										<select>
											<option>Indonesia</option>
											<option>Malaysia</option>
											<option>Singapore</option>
											<option>Thailand</option>
											<option>Philippines</option>
										</select>
									
									</li>
									<li className="single_field zip-field">
										<label>Zip Code:</label>
										<input type="text"/>
									</li>
								</ul>
								<a className="btn btn-default update" href="">Get Quotes</a>
								<a className="btn btn-default check_out" href="">Continue</a>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="total_area">
								<ul>
									<li>Cart Sub Total <span>IDR 435,000</span></li>
									<li>Eco Tax <span>IDR 15,000</span></li>
									<li>Shipping Cost <span>Free</span></li>
									<li>Total <span>IDR 450,000</span></li>
								</ul>
									<a className="btn btn-default update" href="">Update</a>
									<a className="btn btn-default check_out" href="">Check Out</a>
							</div>
						</div>
					</div>
				</div>
			</section>{/*/#do_action*/}
        </div>
    );
  }
}

export default Cart;