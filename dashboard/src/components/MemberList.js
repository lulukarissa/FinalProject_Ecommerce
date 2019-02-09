import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';


class Tables extends Component {
    state = {
        users: []
    }
    componentDidMount(){
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

  deleteData = (e) =>{
    var link = `http://localhost:3210/users/${e}`

    axios.delete(link)
    .then((x)=>{
        console.log(x)
    })
    .catch()

    window.location.reload();
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
                <td>{id}</td>
                <td>{username}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger"onClick={()=>{this.deleteData(id)}}>Delete</button>
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
                        Data Tables
                        <small>advanced tables</small>
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Data tables</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">Hover Data Table</h3>                                    
                                </div>{/* /.box-header */}
                                <div class="box-body table-responsive">
                                    <table id="example2" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Username</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Setting</th>
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
