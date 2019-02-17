import React, { Component } from 'react';
import Label from '../components/Label';
import axios from 'axios'

class Shop extends Component {
    constructor(){
        super();
        this.state = {
          products: [],
          currentPage:1,
          productsPerPage: 9
        }
        this.handleClick = this.handleClick.bind(this);
    }
      
      componentDidMount(){
      var category = this.props.location.pathname.slice(10)
      var link = `http://localhost:3210/category/${category}`
    
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
        var category = this.props.location.pathname.slice(10)
        axios.get(`http://localhost:3210/catalphabeticalasc/${category}`)
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
          var category = this.props.location.pathname.slice(10)
          axios.get(`http://localhost:3210/catalphabeticaldesc/${category}`)
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
          var category = this.props.location.pathname.slice(10)
          axios.get(`http://localhost:3210/catdateoldest/${category}`)
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
          var category = this.props.location.pathname.slice(10)
          axios.get(`http://localhost:3210/catdatenewest/${category}`)
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
          var category = this.props.location.pathname.slice(10)
          axios.get(`http://localhost:3210/catpricelow/${category}`)
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
          var category = this.props.location.pathname.slice(10)
          axios.get(`http://localhost:3210/catpricehigh/${category}`)
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
                                    <li><a href="">&raquo;</a></li>
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