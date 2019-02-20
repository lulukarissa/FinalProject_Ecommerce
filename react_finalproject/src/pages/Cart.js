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

	componentDidMount(){
		this.getCart();

		axios.get(`http://localhost:3210/cartcount/${this.props.username}`)
			.then((x)=>{
				this.setState({
					cartcount: x.data[0]
				})
			})
	}

	deleteCart = (e) =>{
		swal({
			title: "Are you sure?",
			text: "You will remove this product from your cart",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				axios.delete(`http://localhost:3210/cartdelete/${e}`)
				.then((x)=>{
					console.log(x)
					this.getCart();
				})
				swal("Successfully removed product from cart!", {
					icon: "success",
				});
			} else {
				swal("This product is still on your cart");
			}
		})
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
			var id_product = val.id_product

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
					<td className="cart_quantity">
						<div className="cart_quantity_button">
							<a className="cart_quantity_up" href=""> + </a>
							<input className="cart_quantity_input" type="text" name="quantity" value={quantity} autocomplete="off" size="2"/>
							<a className="cart_quantity_down" href=""> - </a>
						</div>
					</td>
					<td className="cart_total">
						<p className="cart_total_price">IDR {total_price}</p>
					</td>
					<td className="cart_delete">
						<a className="cart_quantity_button" style={{backgroundColor:'orange'}} onClick={()=>{this.deleteCart(id_cart)}}><i className="fa fa-times"></i></a>
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