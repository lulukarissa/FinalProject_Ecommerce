import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
        category: []
    }

    getCategory = () =>{
        var link = 'http://localhost:3210/category'

        axios.get(link)
        .then((x)=>{
            this.setState({
                category: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    deleteData = (e) =>{
        swal({
			title: "Are you sure?",
			text: "You will remove this category from the list",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
                axios.delete(`http://localhost:3210/category/${e}`)
                .then((x)=>{
                    console.log(x)
                    this.getCategory()
                })
                .catch()
				swal("Successfully removed category from list!", {
					icon: "success",
				});
			} else {
				swal("This category is still on the list");
			}
		})
    }
    
    componentDidMount(){
        this.getCategory()
    }

  render() {
      
    var category = this.state.category.map((val, i)=>{
        var id_category = val.id_category
        var category_name = val.category_name

        return(
            <tr key={i}>
                <td class="text-center">{id_category}</td>
                <td>{category_name}</td>
                <td class="text-center">
                    <a class="btn btn-primary" href={`/edit-category/${id_category}`}>Edit</a>
                    <span>  </span>
                    <button class="btn btn-danger"
                    onClick={()=>{this.deleteData(id_category)}}>Delete</button>
                </td>
            </tr>
        )
    })
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
                        Category List
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Category List</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">List Details</h3>                                    
                                </div>{/* /.box-header */}
                                <div class="box-body table-responsive">
                                    <table id="example2" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Id Category</th>
                                                <th class="text-center">Category Name</th>
                                                <th class="text-center">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category}
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* /.box */}
                        </div>
                    </div>

                </section>{/* /.content */}
            </aside>{/* /.right-side */}
        </div>{/* ./wrapper */}
    </div>
    );
  }
}

export default Tables;