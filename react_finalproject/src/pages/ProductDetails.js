import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import Label from '../components/Label';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Products extends Component {
	state = {
				products: '',
				username: '',
				quantity: '',
				total_price: '',
				recommended: []
      }
      
      componentDidMount(){
				var id = this.props.location.pathname.slice(17)
				var link = `${API_URL}/product/${id}`

				console.log(id)
				
					axios.get(link)
					.then((x)=>{
							this.setState({
									products: x.data[0]
							})
							console.log(x.data[0])
					})
					.catch()

				axios.get(`${API_URL}/recommended`)
				.then((x)=>{
						this.setState({
								recommended: x.data
						})
						console.log(x.data)
				})
				.catch()
			}
		
		addtocart = () =>{
			if(this.props.username){
				if(this.refs.quantity.value > this.state.products.quantity){
					swal({text: "Sorry, we do not have that number of items in stock. Please check the stock number!",
					icon: "warning",
					dangerMode: true})
				}
				else if(this.refs.quantity.value < 1){
					swal({text: "Please input the right number!",
					icon: "warning",
					dangerMode: true})
				}
				else{
					axios.post(`${API_URL}/cart`, {
							username: this.props.username,
							id_product: this.props.location.pathname.slice(17),
							quantity: this.refs.quantity.value,
							total_price: this.refs.quantity.value * this.state.products.price
					}).then((x) => {
							console.log(x);
							swal({
								title: "Added to cart!",
								text: "You just added this product to your cart",
								icon: "success",
								button: "VIEW CART",
							}).then((x)=>{
								if(x){
									window.location.href = '/cart'
								}
								else{
									window.location.reload()
								}
							})
					}).catch(() => {
							console.log("Error post");
					})

					var id = this.props.location.pathname.slice(17)
					axios.put(`${API_URL}/productquantity/${id}`,{
						quantity: this.state.products.quantity - this.refs.quantity.value
					})
				}
			}
			else{
				swal('Please login first to add to cart!')
			}	
		}
		
		addtowishlist = (e) =>{
			if(this.props.username){
				axios.post(`${API_URL}/wishlist`, {
					username: this.props.username,
					id_product: e
				}).then((x) => {
						console.log(x);
						swal({
							title: "Added to wishlist!",
							text: "You just successfully added this product to your wishlist",
							icon: "success",
							button: "OK",
						})
				}).catch(() => {
						console.log("Error post");
				})
			}
			else{
				swal('Please login first to add to wishlist!')
			} 
		}
		
  render() {

		var recommended1 = this.state.recommended.map((val, i)=>{
      var id_product = val.id_product
      var product_name = val.product_name
      var artist = val.artist
      var price = val.price
      var image = val.image

      if(i<3){
      return(
          <div className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
							<a href={`/product-details/${id_product}`}>
                <div className="productinfo text-center">
                  <img src={`${API_URL}/img/${image}`} alt="" />
                  <h2>IDR {new Intl.NumberFormat().format(price)}</h2>
                  <p>{product_name}</p>
                  <p><b>{artist}</b></p>
                  <a href="#" className="btn btn-default add-to-cart" onClick={(e)=>{e.preventDefault(); this.addtowishlist(id_product)}}><i className="fa fa-star"></i> Add to wishlist</a>
                </div>
								</a>
              </div>
            </div>
          </div>
      )}
    })

    var recommended2 = this.state.recommended.map((val, i)=>{
      var id_product = val.id_product
      var product_name = val.product_name
      var artist = val.artist
      var price = val.price
      var image = val.image

      if(i>=3){
      return(
          <div className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
							<a href={`/product-details/${id_product}`}>
                <div className="productinfo text-center">
                  <img src={`${API_URL}/img/${image}`} alt="" />
                  <h2>IDR {new Intl.NumberFormat().format(price)}</h2>
                  <p>{product_name}</p>
                  <p><b>{artist}</b></p>
                  <a href="#" className="btn btn-default add-to-cart" onClick={(e)=>{e.preventDefault(); this.addtowishlist(id_product)}}><i className="fa fa-star"></i> Add to wishlist</a>
                </div>
								</a>
              </div>
            </div>
          </div>
      )}
		})
		
    return (
        <div>
            <section>
				<div className="container">
					<div className="row">
						<Label/>
						<div className="col-sm-9 padding-right">
							<div className="product-details">{/*product-details*/}
								<div className="col-sm-6">
									<div className="view-product">
										<img src={`${API_URL}/img/${this.state.products.image}`} alt="" />
									</div>
								</div>
								<div className="col-sm-6">
									<div className="product-information">{/*/product-information*/}
										<h2>{this.state.products.product_name}</h2>
										<p>{this.state.products.artist}</p>
										<img src="../images/product-details/rating.png" alt="" />
										<span>
											<span>IDR {new Intl.NumberFormat().format(this.state.products.price)}</span>
											<label>Quantity:</label>
											<input type="number" ref="quantity" min="1" max={this.state.products.quantity} defaultValue="1"/>
											<button type="button" className="btn btn-fefault cart" onClick={this.addtocart}>
												<i className="fa fa-shopping-cart"></i> Add to cart	
											</button>
										</span>
										{
											this.state.products.quantity > 0
											? <p><b>Availability:</b> In Stock</p>
											: <p><b>Availability:</b> Out of Stock</p>
										}
										<p><b>Condition:</b> New</p>
										<p><b>Stock:</b> {this.state.products.quantity}</p>
										<a href=""><img src="../images/product-details/share.png" className="share img-responsive"  alt="" /></a>
									</div>{/*/product-information*/}
								</div>
							</div>{/*/product-details*/}
							
							<div className="category-tab shop-details-tab">{/*category-tab*/}
								<div className="col-sm-12">
									<ul className="nav nav-tabs">
										<li><a href="#details" data-toggle="tab">Details</a></li>
										<li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
										<li><a href="#tag" data-toggle="tab">Tag</a></li>
										<li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
									</ul>
								</div>
								<div className="tab-content">
									<div className="tab-pane fade" id="details" >
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery1.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery2.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery3.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery4.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									<div className="tab-pane fade" id="companyprofile" >
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery1.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery3.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery2.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery4.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									<div className="tab-pane fade" id="tag" >
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery1.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery2.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery3.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="../images/home/gallery4.jpg" alt="" />
														<h2>IDR 435,000</h2>
														<p>Title</p>
														<p><b>Artist</b></p>
														<button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									<div className="tab-pane fade active in" id="reviews" >
										<div className="col-sm-12">
											<ul>
												<li><a href=""><i className="fa fa-user"></i>JOKOWI</a></li>
												<li><a href=""><i className="fa fa-clock-o"></i>12:41 PM</a></li>
												<li><a href=""><i className="fa fa-calendar-o"></i>31 DEC 2018</a></li>
											</ul>
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
											<p><b>Write Your Review</b></p>
											
											<form action="#">
												<span>
													<input type="text" placeholder="Your Name"/>
													<input type="email" placeholder="Email Address"/>
												</span>
												<textarea name="" ></textarea>
												<b>Rating: </b> <img src="../images/product-details/rating.png" alt="" />
												<button type="button" className="btn btn-default pull-right">
													Submit
												</button>
											</form>
										</div>
									</div>
									
								</div>
							</div>{/*/category-tab*/}
							
							<div className="recommended_items">{/*recommended_items*/}
								<h2 className="title text-center">recommended items</h2>
								
								<div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
									<div className="carousel-inner">
										<div className="item active">	
											{recommended1}
										</div>
										<div className="item">	
											{recommended2}
										</div>
									</div>
									<a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
										<i className="fa fa-angle-left"></i>
									</a>
									<a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
										<i className="fa fa-angle-right"></i>
									</a>			
								</div>
							</div>{/*/recommended_items*/}
							
						</div>
					</div>
				</div>
			</section>
        </div>
    );
  }
}

export default Products;