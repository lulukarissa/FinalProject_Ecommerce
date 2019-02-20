import React, { Component } from 'react';
import axios from 'axios';

class Cart extends Component {
	state = {
		wishlist: []
	}

	componentDidMount(){
		var url = `http://localhost:3210/wishlist/${this.props.username}`
		axios.get(url)
		.then((x)=>{
			this.setState({
				wishlist: x.data
			})
		})
	}

	deleteWishlist = (e) =>{
		axios.delete(`http://localhost:3210/wishlistdelete/${e}`)
		.then((x)=>{
			console.log(x)
		})
		
		alert('Successfully removed product from wishlist!')
		window.location.reload()
	}

  render() {
		var wishlist = this.state.wishlist.map((val,i)=>{
		var image = val.image
		var product_name = val.product_name
		var artist = val.artist
		var price = val.price
		var quantity = val.quantity
		var id_wishlist = val.id_wishlist
		var id_product = val.id_product

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
							<input className="cart_quantity_input" type="text" name="quantity" value={quantity} autocomplete="off" size="2"/>
						</div>
					</td>
					{/* <td className="cart_total">
						<p className="cart_total_price">IDR {total_price}</p>
					</td> */}
					<td className="text-center">
						<a className="btn btn-default update" onClick={()=>{window.location.href = `/product-details/${id_product}`}}><i className="fa fa-shopping-cart"></i></a>
						<a className="btn btn-default update" onClick={()=>{this.deleteWishlist(id_wishlist)}}><i className="fa fa-times"></i></a>
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
						<li className="active">Wishlist</li>
						</ol>
					</div>
					{
						wishlist > 0 
						? <div className="table-responsive cart_info">
						<table className="table table-condensed">
							<thead>
								<tr className="cart_menu">
									<td className="image"><i className="fa fa-star"></i> Item</td>
									<td className="description"></td>
									<td className="price">Price</td>
									<td className="quantity">Stock</td>
									<td className="total text-center">Action</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								{wishlist}
							</tbody>
						</table>
					</div>

					: <div className="col-sm-12">    	
							<h2 className="title text-center">No wishlist</h2>
							<div id="gmap" className="contact-map card-body">
								<center>
								<img src="images/home/wishlist.png" style={{width: '200px',height: 'auto'}}></img>	
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