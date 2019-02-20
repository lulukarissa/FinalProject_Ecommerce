import React, { Component } from 'react';
import Label from '../components/Label';
import axios from 'axios'

class Home extends Component {
  state = {
    products: [],
    category: [],
    procat: []
  }

  componentDidMount(){
  var link = 'http://localhost:3210/product'

  axios.get(link)
  .then((x)=>{
      this.setState({
          products: x.data
      })
      console.log(x.data)
  })
  .catch()

  var linkcategory = 'http://localhost:3210/category'

  axios.get(linkcategory)
  .then((x)=>{
      this.setState({
          category: x.data
      })
      console.log(x.data)
  })

  axios.get('http://localhost:3210/productcategory')
  .then((x)=>{
      this.setState({
          procat: x.data
      })
      console.log(x.data)
  })
  .catch()

  }

  addtowishlist = (e) =>{
    axios.post('http://localhost:3210/wishlist', {
        username: this.props.username,
        id_product: e
    }).then((x) => {
        console.log(x);
        alert('Successfully added to wishlist!')
    }).catch(() => {
        console.log("Error post");
    })
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

      if(i<6){
      return(
        <div className="col-sm-4">
          <div className="product-image-wrapper">
            <div className="single-products">
                <div className="productinfo text-center">
                  <img src={`http://localhost:3210/img/${image}`} alt="" />
                  <h2>IDR {price}</h2>
                  <p>{product_name}</p>
                  <p><b>{artist}</b></p>
                  <a href="#" className="btn btn-default add-to-cart" onClick={()=>{this.addtowishlist(id_product)}}><i className="fa fa-star"></i> Add to wishlist</a>
                </div>
                <a href={`/product-details/${id_product}`}>
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <h2>IDR {price}</h2>
                      <p>{product_name}</p>
                      <p><b>{artist}</b></p>
                      <a href="#" className="btn btn-default add-to-cart" onClick={()=>{this.addtowishlist(id_product)}}><i className="fa fa-star"></i> Add to wishlist</a>
                    </div>
                  </div>
                </a>
            </div>
          </div>
        </div>  
      )}
  })

  var category = this.state.category.map((val, i)=>{
    var id_category = val.id_category
    var category_name = val.category_name

    if(i==0){
      return <li className="active"><a href={`#${category_name}`} data-toggle="tab">{category_name}</a></li>
    }
    else{
      return <li><a href={`#${category_name}`} data-toggle="tab">{category_name}</a></li>
    }
  })

  var procat = this.state.procat.map((val, i)=>{
    var id_product = val.id_product
    var product_name = val.product_name
    var artist = val.artist
    var price = val.price
    var image = val.image
    var category_name = val.category_name

    if(i<4){
    return(
      <div className="tab-pane fade active in" id={category_name} >
        <div className="col-sm-3">
          <div className="product-image-wrapper">
            <div className="single-products">
              <div className="productinfo1 text-center">
                <img src={`http://localhost:3210/img/${image}`} alt="" />
                <h2>IDR {price}</h2>
                <p>{product_name}</p>
                <p><b>{artist}</b></p>
                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  })
  
    return (
      <div>
        <section id="slider">{/*slider*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                  </ol>
                  
                  <div className="carousel-inner">
                    <div className="item active">
                      <div className="col-sm-6">
                        <h1><span>GET</span>-Myu</h1>
                        <h2>J-music Online Store</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <a href="/product-details/54"><button type="button" className="btn btn-default get">Get it now</button></a>
                      </div>
                      <div className="col-sm-6">
                        <img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
                      </div>
                    </div>
                    <div className="item">
                      <div className="col-sm-6">
                        <h1><span>GET</span>-Myu</h1>
                        <h2>J-music Online Store</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <a href="/product-details/55"><button type="button" className="btn btn-default get">Get it now</button></a>
                      </div>
                      <div className="col-sm-6">
                        <img src="images/home/girl2.jpg" className="girl img-responsive" alt="" />
                      </div>
                    </div>
                    
                    <div className="item">
                      <div className="col-sm-6">
                        <h1><span>GET</span>-Myu</h1>
                        <h2>J-music Online Store</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <a href="/product-details/12"><button type="button" className="btn btn-default get">Get it now</button></a>
                      </div>
                      <div className="col-sm-6">
                        <img src="images/home/girl3.jpg" className="girl img-responsive" alt="" />
                      </div>
                    </div>
                    
                  </div>
                  
                  <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                    <i className="fa fa-angle-left"></i>
                  </a>
                  <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
                
              </div>
            </div>
          </div>
        </section>{/*/slider*/}
        
        <section>
          <div className="container">
            <div className="row">
              <Label/>
              <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                  <h2 className="title text-center">Features Items</h2>
                  {products}

                  <div className="pagination padding-right" style={{float:'right', marginRight:10}}>
                      <li><a href="/products">See all products >></a></li>
                  </div>
                </div>{/*features_items*/}

                
                
                <div className="category-tab">{/*category-tab*/}
                  <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                     {category} 
                    </ul>
                  </div>
                  <div className="tab-content">
                    {procat}
                  </div>
                </div>{/*/category-tab*/}
                
                <div className="recommended_items">{/*recommended_items*/}
                  <h2 className="title text-center">recommended items</h2>
                  
                  <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      <div className="item active">	
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/recommend1.jpg" alt="" />
                                <h2>IDR 335,000</h2>
                                <p>32nd Single</p>
                                <p><b>BISH</b></p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/recommend2.jpg" alt="" />
                                <h2>IDR 435,000</h2>
                                <p>Stand by you</p>
                                <p><b>SKE48</b></p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/recommend3.jpg" alt="" />
                                <h2>IDR 285,000</h2>
                                <p>Hey, Girls!</p>
                                <p><b>TOKYO PERFORMANCE DOLL</b></p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">	
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/recommend1.jpg" alt="" />
                                <h2>IDR 335,000</h2>
                                <p>32nd Single</p>
                                <p><b>BISH</b></p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/recommend2.jpg" alt="" />
                                <h2>IDR 435,000</h2>
                                <p>Stand by you</p>
                                <p><b>SKE48</b></p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="product-image-wrapper">
                            <div className="single-products">
                              <div className="productinfo text-center">
                                <img src="images/home/recommend3.jpg" alt="" />
                                <h2>IDR 285,000</h2>
                                <p>Hey, Girls!</p>
                                <p><b>TOKYO PERFORMANCE DOLL</b></p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-star"></i> Add to wishlist</a>
                              </div>
                              
                            </div>
                          </div>
                        </div>
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

export default Home;
