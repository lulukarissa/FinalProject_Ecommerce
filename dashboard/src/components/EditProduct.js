import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class EditProducts extends Component {
    state = {
        // id_product: '',
        product_name: '',
        artist: '',
        price: '',
        quantity: '',
        category: '',
        image: ''
    }

    componentDidMount(){
        var id_edit = this.props.location.pathname.slice(14,16)
        // console.log(id_edit)

        axios.get(`${API_URL}/product/${id_edit}`)
        .then((getData)=>{
            // console.log(getData.data)
            this.setState({
            // id_product: getData.data[0].id_product,
            product_name: getData.data[0].product_name,
            artist: getData.data[0].artist,
            price : getData.data[0].price,
            quantity: getData.data[0].quantity,
            category: getData.data[0].category,
            image: getData.data[0].image
            })
        })
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
        // window.location.reload();

        var product_name = this.refs.product_name.value;
        var artist= this.refs.artist.value;
        var price= this.refs.price.value;
        var category= this.refs.category.value;
        var quantity= this.refs.quantity.value;
        
        this.setState({
            // id_product : id_product,
            product_name: product_name,
            artist: artist,
            price: price,
            category: category,
            quantity: quantity,
        })
    }
    
    postData = (e) => {
        e.preventDefault()
        var id_edit = this.props.location.pathname.slice(14,16)
        let addproduct = new FormData();
        addproduct.append('product_name', this.state.product_name);
        addproduct.append('artist', this.state.artist);
        addproduct.append('price', this.state.price);
        addproduct.append('category', this.state.category);
        addproduct.append('quantity', this.state.quantity);
        addproduct.append('image', this.state.image);
        
        var url = `${API_URL}/product/${id_edit}`

        axios.put(url, addproduct)
        .then((x)=>{
            console.log(x)
            swal({
                title: "Succesfully edit data!",
                icon: "success",
                button: "OK",
            }).then((x)=>{
                window.location.href = '/product-list'
            })
        })
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
                        Edit Products
                        {/* <small>Preview</small> */}
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Forms</a></li>
                        <li class="active">Edit Products</li>
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
                                            <input type="text" class="form-control" defaultValue={this.state.product_name} placeholder="Product Name" ref="product_name"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="artist">Artist</label>
                                            <input type="text" class="form-control" defaultValue={this.state.artist} placeholder="Artist" ref="artist"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <input type="number" class="form-control" defaultValue={this.state.price} placeholder="Price" ref="price"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="quantity">Quantity</label>
                                            <input type="number" class="form-control" defaultValue={this.state.quantity} placeholder="Quantity" ref="quantity"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="category">Category</label>
                                            <select type="option" class="form-control" defaultValue={this.state.category} ref="category">
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

export default EditProducts;