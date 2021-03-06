import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import Label from '../components/Label';
import axios from 'axios'
import swal from '@sweetalert/with-react'

class Shop extends Component {
    constructor(){
        super();
        this.state = {
          products: [],
          currentPage:1,
          productsPerPage: 9
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }
      
      componentDidMount(){
      var artist = this.props.location.pathname.slice(8)
      var link = `${API_URL}/artist/${artist}`
    
      axios.get(link)
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
        var artist = this.props.location.pathname.slice(8)
        axios.get(`${API_URL}/artalphabeticalasc/${artist}`)
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
          var artist = this.props.location.pathname.slice(8)
          axios.get(`${API_URL}/artalphabeticaldesc/${artist}`)
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
          var artist = this.props.location.pathname.slice(8)
          axios.get(`${API_URL}/artdateoldest/${artist}`)
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
          var artist = this.props.location.pathname.slice(8)
          axios.get(`${API_URL}/artdatenewest/${artist}`)
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
          var artist = this.props.location.pathname.slice(8)
          axios.get(`${API_URL}/artpricelow/${artist}`)
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
          var artist = this.props.location.pathname.slice(8)
          axios.get(`${API_URL}/artpricehigh/${artist}`)
          .then((x)=>{
              this.setState({
                  products: x.data
              })
              console.log(x.data)
          })
          .catch()
      }

      handleClick(e) {
        e.preventDefault()
        this.setState({
          currentPage: Number(e.target.id)
        })
      }

      handleClickNext(e) {
        e.preventDefault()
        this.setState({
          currentPage: Number(this.state.currentPage+1)
        })
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
    var { products, currentPage, productsPerPage } = this.state;

    var indexOfLastTodo = currentPage * productsPerPage;
    var indexOfFirstTodo = indexOfLastTodo - productsPerPage;
    var currentproducts = products.slice(indexOfFirstTodo, indexOfLastTodo);


    var productsresult = currentproducts.map((val, i)=>{
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

    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number, i) => {
            if(i==0){
                return (
                    <li className="active"><a href="#" id={number} onClick={this.handleClick} data-toggle="tab">{number}</a></li>
                )
            }
            else{
                return (
                    <li><a href="#" id={number} onClick={this.handleClick} data-toggle="tab">{number}</a></li>
                )
            }
           });

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
                                
                                <div className="col-sm-6 mainmenu">
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
                                <div className="col-sm-6" >
                                    <ul className="pagination" style={{float: 'right'}}>
                                    {renderPageNumbers}
                                    <li><a href="" onClick={this.handleClickNext} data-toggle="tab">&raquo;</a></li>
                                    </ul>
                                </div>
                                <br/>
                                {productsresult}
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