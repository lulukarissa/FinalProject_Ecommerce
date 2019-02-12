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
                <td class="text-center">{id}</td>
                <td>{username}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td class="text-center">
                    <a class="btn btn-primary" href={`/edit-member/${id}`}>Edit</a>
                    <span>  </span>
                    <button class="btn btn-danger"
                    onClick={()=>{}}>Delete</button>
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