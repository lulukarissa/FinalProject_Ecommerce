import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';


class AddCategory extends Component {
    postData = ()=>{
		var url = 'http://localhost:3210/category'
		axios.post(url,{
            // id_category: this.refs.id_category.value,
            category_name: this.refs.category_name.value
		})
		.then((x)=>{
			console.log('Success!')
			// this.setState({
			// 	redirect: true
			// })
		})
		.catch((x)=>{
			console.log('Error!')
        })
        
        window.location.reload();
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
                        Add Category
                        {/* <small>Preview</small> */}
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Forms</a></li>
                        <li class="active">Add Category</li>
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
                                    <h3 class="box-title">Input category</h3>
                                </div>{/* /.box-header */}
                                {/* form start */}
                                <form role="form">
                                    <div class="box-body">
                                        {/* <div class="form-group">
                                            <label for="id_category">ID Category</label>
                                            <input ref="id_category" type="number" class="form-control" placeholder="ID Category" ref="id_category"/>
                                        </div> */}
                                        <div class="form-group">
                                            <label for="category_name">Category Name</label>
                                            <input type="text" class="form-control" placeholder="Category Name" ref="category_name"/>
                                        </div>
                                        {/* <div class="checkbox">
                                            <label>
                                                <input type="checkbox"/> Check me out
                                            </label>
                                        </div> */}
                                    </div>{/* /.box-body */}

                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-primary" onClick={this.postData}>Submit</button>
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

export default AddCategory;
