import React, { Component } from 'react';

class Label extends Component {
  render() {
    return (
        <div>
            <div className="col-sm-3">
              <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                          <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                          Single
                        </a>
                      </h4>
                    </div>
                    <div id="sportswear" className="panel-collapse collapse">
                      <div className="panel-body">
                        <ul>
                          <li><a href="#">Regular Edition</a></li>
                          <li><a href="#">Limited Edition</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                          <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                          Album
                        </a>
                      </h4>
                    </div>
                    <div id="mens" className="panel-collapse collapse">
                      <div className="panel-body">
                        <ul>
                          <li><a href="#">Regular Edition</a></li>
                          <li><a href="#">Limited Edition</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title"><a href="#">DVD/Blu-ray</a></h4>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title"><a href="#">Goods</a></h4>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title"><a href="#">Photobook</a></h4>
                    </div>
                  </div>
                  
                </div>{/*/category-products*/}
              
                <div className="brands_products">{/*brands_products*/}
                  <h2>Artists</h2>
                  <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                      <li><a href="#"> <span className="pull-right">(50)</span>AAA</a></li>
                      <li><a href="#"> <span className="pull-right">(78)</span>Arashi</a></li>
                      <li><a href="#"> <span className="pull-right">(27)</span>BACK-ON</a></li>
                      <li><a href="#"> <span className="pull-right">(35)</span>Beverly</a></li>
                      <li><a href="#"> <span className="pull-right">(9)</span>COLOR CREATION</a></li>
                      <li><a href="#"> <span className="pull-right">(27)</span>EXILE</a></li>
                      <li><a href="#"> <span className="pull-right">(40)</span>SPYAIR</a></li>
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
                  <img src="images/home/shipping.jpg" width="270px" height="360px" alt="" />
                </div>{/*/shipping*/}
              
              </div>
            </div>
        </div>
    );
  }
}

export default Label;