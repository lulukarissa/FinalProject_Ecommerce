import React, { Component } from 'react';
import Label from '../components/Label';
import axios from 'axios'

class Shop extends Component {
    state = {
        products: []
      }
      
      componentDidMount(){

      axios.get('http://localhost:3210/product')
      .then((x)=>{
          this.setState({
              products: x.data
          })
          console.log(x.data)
      })
      .catch()
    }

    alphabeticalasc = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:3210/alphabeticalasc')
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    alphabeticaldesc = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:3210/alphabeticaldesc')
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    dateoldest = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:3210/dateoldest')
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    datenewest = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:3210/datenewest')
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    pricelow = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:3210/pricelow')
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    pricehigh = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:3210/pricehigh')
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

  render() {
    var products = this.state.products.map((val, i)=>{
        var id_product = val.id_product
        var product_name = val.product_name
        var artist = val.artist
        var price = val.price
        var quantity = val.quantity
        var category = val.category
        var image = val.image
  
        return(
          <div className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                  <div className="productinfo text-center">
                    <img src={`http://localhost:3210/img/${image}`} alt="" />
                    <h2>IDR {price}</h2>
                    <p>{product_name}</p>
                    <p><b>{artist}</b></p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                  <a href={`/product-details/${id_product}`}>
                    <div className="product-overlay">
                        <div className="overlay-content">
                        <h2>IDR {price}</h2>
                        <p>{product_name}</p>
                        <p><b>{artist}</b></p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                        </div>
                    </div>
                    </a>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                  <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                </ul>
              </div>
            </div>
          </div>  
        )
    })
    return (
        <div>
            <section id="advertisement">
		        <div className="container">
			        <img src="../images/shop/advertisement.jpg" alt="" />
		        </div>
	        </section>

            <section>
                <div className="container">
                    <div className="row">
                        <Label/>
                        
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">{/*features_items*/}
                                <h2 className="title text-center">Features Items</h2>
                                
                                <div className="col-sm-12 mainmenu pull-right">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        {/* <li><a>Sort By</a></li> */}
                                        <li className="dropdown" style={{marginBottom: '15px'}}><a href="#">Sort by<i className="fa fa-angle-down"></i></a>
                                            <ul role="menu" className="sub-menu">
                                                {/* <li><a href="#">Best Selling</a></li> */}
                                                <li><a href="#" onClick={this.alphabeticalasc}>Alphabetical: A to Z</a></li>
                                                <li><a href="#" onClick={this.alphabeticaldesc}>Alphabetical: Z to A</a></li>
                                                <li><a href="#" onClick={this.dateoldest}>Date: Oldest to Newest</a></li>
                                                <li><a href="#" onClick={this.datenewest}>Date: Newest to Oldest</a></li>
                                                <li><a href="#" onClick={this.pricelow}>Price: Low to High</a></li>
                                                <li><a href="#" onClick={this.pricehigh}>Price: High to Low</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <br/>
                                {products}
                                <ul className="pagination">
                                    <li className="active"><a href="">1</a></li>
                                    <li><a href="">2</a></li>
                                    <li><a href="">3</a></li>
                                    <li><a href="">&raquo;</a></li>
                                </ul>
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