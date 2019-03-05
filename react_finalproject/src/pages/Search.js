import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios'
import swal from '@sweetalert/with-react'

class Shop extends Component {
    constructor(){
        super();
        this.state = {
          products: []
        }
      }
      
    componentDidMount(){
        var search = this.props.location.pathname.slice(8)

        axios.get(`${API_URL}/search/${search}`)
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }
    
    addtowishlist = (e) =>{
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

  render() {
    var productsresult = this.state.products.map((val, i)=>{
        var id_product = val.id_product
        var product_name = val.product_name
        var artist = val.artist
        var price = val.price
        var image = val.image
  
        return(
          <div className="col-sm-3">
            <div className="product-image-wrapper">
              <div className="single-products">
                  <div className="productinfo text-center">
                    <img src={`${API_URL}/img/${image}`} alt="" />
                    <h2>IDR {new Intl.NumberFormat().format(price)}</h2>
                    <p>{product_name}</p>
                    <p><b>{artist}</b></p>
                    <a href="#" className="btn btn-default add-to-cart" onClick={(e)=>{e.preventDefault(); this.addtowishlist(id_product)}}><i className="fa fa-star"></i> Add to wishlist</a>
                  </div>
                  <a href={`/product-details/${id_product}`}>
                    <div className="product-overlay">
                        <div className="overlay-content">
                        <h2>IDR {new Intl.NumberFormat().format(price)}</h2>
                        <p>{product_name}</p>
                        <p><b>{artist}</b></p>
                        <a href="#" className="btn btn-default add-to-cart" onClick={(e)=>{e.preventDefault(); this.addtowishlist(id_product)}}><i className="fa fa-star"></i> Add to wishlist</a>
                        </div>
                    </div>
                    </a>
              </div>
            </div>
          </div>  
        )
    })


    return (
        <div>

            <section>
                <div className="container">
                    <div className="row">
                        
                        <div className="col-sm-12 padding-right">
                            <div className="features_items">{/*features_items*/}
                                <h2 className="title text-center">Search Results</h2>

                                <br/>

                                {
                                    productsresult.length > 0
                                    ? productsresult
                                    : <div className="col-sm-12">    	
                                    <div id="gmap" className="contact-map card-body">
                                        <center>
                                        <img src="images/home/search.png" style={{width: '200px',height: 'auto'}}></img><br/>
                                        <h3 style={{color: 'grey'}}>Sorry, no results found!</h3>
                                        <h5 style={{color: 'grey'}}>Please check the spelling or try searching for something else</h5>
                                        </center>
                                    </div>		    				    				
                                </div>	
                                }
                                
                                
                                
                            </div>{/*features_items*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default Shop;