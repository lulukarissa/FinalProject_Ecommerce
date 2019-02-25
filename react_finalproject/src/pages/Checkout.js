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
		shipping: [],
		shippingcost: ''
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
		this.getShipping()

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
	})
	.catch()
	}

	getShipping = ()=>{
		var url = 'http://localhost:3210/shipping'

		axios.post(url,{
			destination: this.props.city,
			quantity: this.state.cartcount.totalquantity
		}).then((x)=>{
			this.setState({
				shipping: x.data.rajaongkir.results[0].costs
			})
			console.log(x.data.rajaongkir.results[0].costs)
		}).catch((x)=>{
			console.log(x)
		})
	}

	order = () =>{
		for (var i = 0; i < this.state.cart.length; i++) {
			// console.log(this.state.cart[i].id_cart)
			var order = new Date
			var year = order.getFullYear()
			var month = order.getMonth()
			var date = order.getDate()
			var hours = order.getHours()
			var minutes = order.getMinutes()
			var seconds = order.getSeconds()
			// var miliseconds = order.getMilliseconds()
			var neworder = `${year}${month}${date}${hours}${minutes}${seconds}`

			axios.post('http://localhost:3210/orderitems', {
					id_order: neworder,
					id_product: this.state.cart[i].id_product,
					quantity: this.state.cart[i].quantity,
					total_price: this.state.cart[i].total_price
			})
			.then((x)=>{
				console.log(x)
			})

			axios.delete(`http://localhost:3210/cartdelete/${this.state.cart[i].id_cart}`)
			.then((x)=>{
				console.log(x)
			})
		}

		axios.post('http://localhost:3210/order', {
				id_order: neworder,
				username: this.props.username,
				subtotal: this.state.cartcount.totalprice,
				shippingcost: this.state.shippingcost,
				totalamount: this.state.cartcount.totalprice + this.state.shippingcost,
				address: this.state.address,
				telephone: this.state.telephone
		})
		.then((x)=>{
			console.log(x)
			swal({
				title: "Successfully ordered!",
				text: "You have to choose the payment for your orders",
				icon: "success",
				button: "OK",
			}).then(()=>{
				window.location.href = `/payment_notif/${neworder}`
			})
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
						<h4 style={{marginLeft: "80px"}}><a href={`/product-details/${id_product}`}>{product_name}</a></h4>
						<p style={{marginLeft: "80px"}}>{artist}</p>
					</td>
					<td className="cart_price">
						<p>IDR {new Intl.NumberFormat().format(price)}</p>
					</td>
					<td className="cart_price">
							<p>{quantitycart}</p>
					</td>
					<td className="cart_total">
						<p className="cart_total_price">IDR {new Intl.NumberFormat().format(total_price)}</p>
					</td>
				</tr>
			)
		})

		var shipping = this.state.shipping.map((val,i)=>{
			var service = val.service

			return(
				<option key={i} value={i}>{service}</option>
			)

		})

    return (
        <div>
					<section id="cart_items">
					<div className="container">
						<div className="breadcrumbs">
							<ol className="breadcrumb">
							<li><a href="/cart"><i className="fa fa-shopping-cart"></i>Cart</a></li>
							<li className="active">Checkout</li>
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
												<button type="button" className="btn btn-default"
												onClick={()=>{window.location.href=`/editprofile/${this.props.username}`}}>
												Edit Address
												</button>
												</td>	
											</tr>
											<br/>
											<div>
											<tr>
												<td>
													Delivery Service:
												</td>
											</tr>
											<tr>
												<td>
													<select onClick={this.getShipping} onChange={(e)=>{
														var index = e.target.value
														this.setState({
															shippingcost: this.state.shipping[index].cost[0].value
														})
													}}>
													<option hidden selected>Choose</option>
														{shipping}
													</select>
												</td>								
											</tr>
											</div>
										</table>
									</td>
									<td colspan="2">
										<table className="table table-condensed total-result">
											<tr>
												<td>Cart Sub Total</td>
												<td>IDR<p style={{float: 'right', marginRight:'20px'}}>{new Intl.NumberFormat().format(this.state.cartcount.totalprice)}</p></td>
											</tr>
											<tr className="shipping-cost">
												<td>Shipping Cost</td>
												{
													this.state.shippingcost
													? <td>IDR<p style={{float: 'right', marginRight:'20px'}}>{new Intl.NumberFormat().format(this.state.shippingcost)}</p></td>	
													: <td>IDR<p style={{float: 'right', marginRight:'20px'}}>-</p></td>
												}									
											</tr>
											<tr>
												<td>Total</td>
												{
													this.state.shippingcost
													? <td><span>IDR<p style={{float: 'right', marginRight:'20px'}}>{new Intl.NumberFormat().format(this.state.cartcount.totalprice + this.state.shippingcost)}</p></span></td>
													: <td><span>IDR<p style={{float: 'right', marginRight:'20px'}}>-</p></span></td>
												}		
												
											</tr>

											{
												this.state.shippingcost
												? <tr>
														<td></td>
														<td style={{float: 'right', marginRight:'20px'}}>
															<button type="button" className="btn btn-default update"
															onClick={()=>{this.order()}}>
																Order
															</button>
														</td>	
													</tr>
											: <tr>
													<td></td>
													<td style={{float: 'right', marginRight:'20px'}}>
														<button disabled type="button" className="btn btn-disabled update">
															Order
														</button>
													</td>	
												</tr>
											}
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				: <div className="col-sm-12">    	
						<h2 className="title text-center">Nothing to checkout</h2>
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