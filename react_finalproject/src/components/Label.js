import React, { Component } from 'react';
import axios from 'axios'

class Label extends Component {
  constructor(){
    super()

    this.state = {
      artistproducts: [],
      category: [],
      limit: 6
    }
    this.showMore = this.showMore.bind(this)
  }

  showMore(e){
    e.preventDefault()
    this.setState((prev)=>{
      return {limit: prev.limit + 6}
    })
  }
  
  componentDidMount(){
  var linkartist = 'http://localhost:3210/artistproducts'
  var linkcategory = 'http://localhost:3210/category'

  axios.get(linkartist)
  .then((x)=>{
      this.setState({
          artistproducts: x.data
      })
      console.log(x.data)
  })

  axios.get(linkcategory)
  .then((x)=>{
      this.setState({
          category: x.data
      })
      console.log(x.data)
  })

  }

  render() {
    var artistproducts = this.state.artistproducts.slice(0, this.state.limit).map((val, i)=>{
      var artist = val.artist
      var artistcount = val.artistcount

      return(
        <li><a href={`/artist/${artist}`}> <span className="pull-right">({artistcount})</span>{artist}</a></li>
      )
    })

    var category = this.state.category.map((val, i)=>{
      var id_category = val.id_category
      var category_name = val.category_name

      return(
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title"><a href={`/category/${id_category}`}>{category_name}</a></h4>
          </div>
        </div>
      )
    })
    return (
        <div>
            <div className="col-sm-3">
              <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                  {category}
                </div>{/*/category-products*/}
              
                <div className="brands_products">{/*brands_products*/}
                  <h2>Artists</h2>
                  <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                      {artistproducts}
                      
                      {/* Show More */}
                      {this.state.limit < this.state.artistproducts.length && <li>
                        <a href="#" onClick={this.showMore} style={{color: 'orange'}}>Show more <i className="fa fa-angle-down"></i> </a></li> }
                       
                    </ul>
                  </div>
                </div>{/*/brands_products*/}
                
                {/*price-range*/}
                {/* <div className="price-range">
                  <h2>Price Range</h2>
                  <div className="well text-center">
                    <input type="text" className="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="sl2" /><br />
                    <b className="pull-left">IDR 0</b> <b className="pull-right">IDR 1,000,000</b>
                  </div>
                </div> */}
                {/*/price-range*/}
                
                <div className="shipping text-center">{/*shipping*/}
                  <img src="../images/home/shipping.jpg" width="270px" height="360px" alt="" />
                </div>{/*/shipping*/}
              
              </div>
            </div>
        </div>
    );
  }
}

export default Label;