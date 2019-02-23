import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
        users: []
    }

    getUsers = () =>{
        var link = 'http://localhost:3210/users'
        axios.get(link)
        .then((x)=>{
            this.setState({
                users: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    componentDidMount(){
        this.getUsers()
    }

  deleteData = (e) =>{
    swal({
        title: "Are you sure?",
        text: "You will remove this member from the list",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://localhost:3210/users/${e}`)
            .then((x)=>{
                console.log(x)
                this.getUsers()
            })
            .catch()
            swal("Successfully removed member from list!", {
                icon: "success",
            });
        } else {
            swal("This member is still on the list");
        }
    })
}

  render() {
      
    var users = this.state.users.map((val, i)=>{
        var id = val.id
        var username = val.username
        var first_name = val.first_name
        var last_name = val.last_name
        var email = val.email
        var password = val.password

        return(
            <tr key={i}>
                <td class="text-center">{id}</td>
                <td>{username}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td class="text-center">
                    <button class="btn btn-danger"
                    onClick={()=>{this.deleteData(id)}}>Delete</button>
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
                        Member List
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Member List</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">List Details</h3>                                    
                                </div>{/* /.box-header */}
                                <div class="box-body table-responsive">
                                    <table id="example2" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Id</th>
                                                <th class="text-center">Username</th>
                                                <th class="text-center">First Name</th>
                                                <th class="text-center">Last Name</th>
                                                <th class="text-center">Email</th>
                                                <th class="text-center">Password</th>
                                                <th class="text-center">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users}
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