import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Cart extends Component {
	state = {
		cart: [],
		cartcount: ''
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
		this.getCart();
		this.getCount()
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
						<h4 style={{marginLeft: "40px"}}><a href={`/product-details/${id_product}`}>{product_name}</a></h4>
						<p style={{marginLeft: "40px"}}>{artist}</p>
					</td>
					<td className="cart_price">
						<p>IDR {new Intl.NumberFormat().format(price)}</p>
					</td>
					<td className="cart_quantity">
						<div className="cart_quantity_button">
							{/* <a className="cart_quantity_up" href="#"> + </a> */}
							<input className="cart_quantity_input" min="1" max="99" ref="quantity" type="number" name="quantity" defaultValue={quantitycart}
							onChange={(e)=>{
								var quantitymax = parseInt(stock) + parseInt(e.target.defaultValue)
								if(e.target.value > quantitymax){
									swal({text: 'Sorry, we do not have that number of items in stock',
									icon: "warning",
									dangerMode: true})
								}
								else{
									axios.put(`http://localhost:3210/cart/${id_cart}`,{
										quantity: e.target.value,
										total_price: e.target.value * price
									})
									.then((x)=>{
										this.getCart()
										this.getCount()
									})

									if(e.target.value > e.target.defaultValue){
										axios.put(`http://localhost:3210/productquantity/${id_product}`,{
											quantity: parseInt(stock) - (parseInt(e.target.value) - parseInt(e.target.defaultValue))
										})
									}
									else if(e.target.value < e.target.defaultValue){
										axios.put(`http://localhost:3210/productquantity/${id_product}`,{
											quantity: parseInt(stock) + (parseInt(e.target.defaultValue) - parseInt(e.target.value))
										})
									}

							}}
						}
							size="2"/>
							{/* <a className="cart_quantity_down" href="#"> - </a> */}
						</div>
					</td>
					<td className="cart_total">
						<p className="cart_total_price">IDR {new Intl.NumberFormat().format(total_price)}</p>
					</td>
					<td className="cart_delete">
						<a className="cart_quantity_button" style={{backgroundColor:'orange', marginRight:"20px"}} onClick={()=>{this.deleteCart(id_cart, id_product, quantitycart, stock)}}><i className="fa fa-times"></i></a>
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
						<li><a href="/home">Home</a></li>
						<li className="active">Shopping Cart</li>
						</ol>
					</div>

					{
						cart.length > 0
						? <div>
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
							</tbody>
						</table>
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
									<li>Price Total<span>IDR {new Intl.NumberFormat().format(this.state.cartcount.totalprice)}</span></li>
								</ul>
									<a className="btn btn-default update" href="/cart/checkout">Check Out</a>
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