import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Cart extends Component {
	state = {
		cart: [],
		cartcount: '',
		users: '',
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		telephone: '',
		address: '',
		shipping: []
	}

	getCart = () => {
		var url = `http://localhost:3210/cart/${this.props.username}`
		axios.get(url)
		.then((x)=>{
			this.setState({
				cart: x.data
			})
		})
	}

	getCount = () => {
		axios.get(`http://localhost:3210/cartcount/${this.props.username}`)
			.then((x)=>{
				this.setState({
					cartcount: x.data[0]
				})
			})
	}

	componentDidMount(){
		console.log(this.props.city)
		console.log(this.state.cartcount.totalquantity)
		this.getCart();
		this.getCount()

		var link = `http://localhost:3210/users/${this.props.username}`

	axios.get(link)
	.then((x)=>{
			this.setState({
				username: x.data[0].username,
				email: x.data[0].email,
				first_name: x.data[0].first_name,
				last_name: x.data[0].last_name,
				telephone: x.data[0].telephone,
				address: x.data[0].address,
			})
			// console.log(x.data)
	})
	.catch()
	}

	deleteCart = (id_cart, id_product, quantitycart, stock) =>{
		swal({
			title: "Are you sure?",
			text: "You will remove this product from your cart",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				axios.delete(`http://localhost:3210/cartdelete/${id_cart}`)
				.then((x)=>{
					console.log(x)
					this.getCart();
					this.getCount()
				})
				swal("Successfully removed product from cart!", {
					icon: "success",
				});
			} else {
				swal("This product is still on your cart");
			}
		})


		axios.put(`http://localhost:3210/productquantity/${id_product}`,{
			quantity: stock + quantitycart
		})
	}

	getShipping = ()=>{
		var url = 'http://localhost:3210/shipping'

		axios.post(url,{
			destination: this.props.city,
			quantity: this.state.cartcount.totalquantity
		}).then((x)=>{
			this.setState({
				shipping: x.rajaongkir.results
			})
		}).catch((x)=>{
			console.log(x)
		})
	}

  render() {
		var cart = this.state.cart.map((val,i)=>{
			var image = val.image
			var product_name = val.product_name
			var artist = val.artist
			var price = val.price
			var quantitycart = val.quantity
			var total_price = val.total_price
			var id_cart = val.id_cart
			var id_product = val.id_product
			var stock = val.stock

			return(
				<tr>
					<td className="cart_product">
						<a href={`/product-details/${id_product}`}><img src={`http://localhost:3210/img/${image}`} style={{width:'150px', height:'150px'}} alt=""/></a>
					</td>
					<td className="cart_description">
						<h4><a href={`/product-details/${id_product}`}>{product_name}</a></h4>
						<p>{artist}</p>
					</td>
					<td className="cart_price">
						<p>IDR {price}</p>
					</td>
					<td className="cart_price">
							<p>{quantitycart}</p>
					</td>
					<td className="cart_total">
						<p className="cart_total_price">IDR {total_price}</p>
					</td>
				</tr>
			)
		})

		var shipping = this.state.shipping.map((val,i)=>{
			var service = val.costs.service
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
					<div>
        </div>
					{
						cart.length > 0
						? <div>
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
								{cart}
								<tr>
									<td colspan="2">&nbsp;</td>
									<td colspan="2">
										<table className="table table-condensed total-result"  style={{marginRight: '15px'}}>
											<tr>
												<td>{this.state.first_name} {this.state.last_name}</td>
											</tr>
											<tr>
												<td>({this.state.telephone})</td>								
											</tr>
											<tr>
												<td>{this.state.address}</td>									
											</tr>
											<tr>
											<td>
												<button type="button" className="btn btn-default update" onClick={()=>{window.location.href=`/editprofile/${this.props.username}`}}>
												Edit Address
												</button>
												</td>	
											</tr>
											<br/>
											<tr>
												<td>
													Delivery Service:
												</td>
											</tr>
											<tr>
												<td>
													<select>
														<option>tes</option>
													</select>
												</td>								
											</tr>
										</table>
									</td>
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
					

					<div id="do_action">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
						</div>
						<div className="col-sm-6">
							{/* <div className="heading">
							<h3>What would you like to do next?</h3>
							<p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
						</div> */}
							<div className="total_area" style={{marginRight: '15px'}}>
								<ul>
									<li>Quantity Total<span>{this.state.cartcount.totalquantity}</span></li>
									<li>Price Total<span>IDR {this.state.cartcount.totalprice}</span></li>
								</ul>
									<a className="btn btn-default update" href="">Check Out</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>

					: <div className="col-sm-12">    	
							<h2 className="title text-center">No cart</h2>
							<div id="gmap" className="contact-map card-body">
								<center>
								<img src="images/home/cart.png" style={{width: '200px',height: 'auto'}}></img><br/>
								<a className="btn btn-default update" href="/products">GO TO SHOP</a>
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