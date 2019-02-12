import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';


class Form extends Component {
    state = {
        // id_product: '',
        product_name: '',
        artist: '',
        price: '',
        quantity: '',
        category: '',
        image: ''
    }

    setImage = (e) => {
        switch(e.target.name){
          case 'image': 
          this.setState({
            image: e.target.files[0],
          })
          break;
          default:
        }
      }
    
    data = (e) => {
        window.location.reload();

        var product_name = this.refs.product_name.value;
        var artist= this.refs.artist.value;
        var price= this.refs.price.value;
        var category= this.refs.category.value;
        var quantity= this.refs.quantity.value;
    
        // var id_product = e.id_product.value
        // var product_name = e.product_name.value;
        // var artist = e.artist.value
        // var price = e.price.value;
        // var category = e.category.value;
        // var quantity = e.quantity.value;
        
        this.setState({
            // id_product : id_product,
            product_name: product_name,
            artist: artist,
            price: price,
            category: category,
            quantity: quantity,
        })
        alert("Succesfully Input Data")
        window.location.reload();
    }
    
    postData = (e) => {
        e.preventDefault()
        let addproduct = new FormData();
        // addproduct.append('id_product', this.state.id_product);
        addproduct.append('product_name', this.state.product_name);
        addproduct.append('artist', this.state.artist);
        addproduct.append('price', this.state.price);
        addproduct.append('category', this.state.category);
        addproduct.append('quantity', this.state.quantity);
        addproduct.append('image', this.state.image);
        
        var url = 'http://localhost:3210/product'

        axios.post(url, addproduct)
        // .then((x)=>{
        //     console.log(x)
        // })
        // .catch((x)=>{
        //     console.log(x)
        // })
    }

    
  render() {
    return (
    <div class="skin-black">
    <Header/>
    <Sidebar/>
        <div class="wrapper row-offcanvas row-offcanvas-left">
        {/* Right side column. Contains the navbar and content of the page */}
            <aside class="right-side">
                {/* Content Header (Page header) */}
                <section class="content-header">
                    <h1>
                        Add Products
                        {/* <small>Preview</small> */}
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Forms</a></li>
                        <li class="active">Add Products</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        {/* left column */}
                        <div class="col-md-6">
                            {/* general form elements */}
                            <div class="box box-primary">
                                <div class="box-header">
                                    <h3 class="box-title">Input product</h3>
                                </div>{/* /.box-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.postData}>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label for="productname">Product Name</label>
                                            <input type="text" class="form-control" placeholder="Product Name" ref="product_name"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="artist">Artist</label>
                                            <input type="text" class="form-control" placeholder="Artist" ref="artist"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <input type="number" class="form-control" placeholder="Price" ref="price"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="quantity">Quantity</label>
                                            <input type="number" class="form-control" placeholder="Quantity" ref="quantity"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="category">Category</label>
                                            <select type="option" class="form-control" ref="category">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputpicture">Image</label>
                                            <input name="image" ref="image" type="file" accept="image/*" onChange={this.setImage}/>
                                            {/* <p class="help-block">Example block-level help text here.</p> */}
                                        </div>
                                        {/* <div class="checkbox">
                                            <label>
                                                <input type="checkbox"/> Check me out
                                            </label>
                                        </div> */}
                                    </div>{/* /.box-body */}

                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-primary" onClick={()=>{this.data(this.refs)}}>Submit</button>
                                    </div>
                                </form>
                            </div>{/* /.box */}
                        </div>{/*/.col (right) */}
                    </div>   {/* /.row */}
                </section>{/* /.content */}
            </aside>{/* /.right-side */}
        </div>{/* ./wrapper */}
    </div>
    );
  }
}

export default Form;