import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {
    state = {
        payment: []
    }

    getPayment = () =>{
        var link = 'http://localhost:3210/confirmpayment'

        axios.get(link)
        .then((x)=>{
            this.setState({
                payment: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    componentDidMount(){
        this.getPayment()
    }

  render() {
      
    var payment = this.state.payment.map((val, i)=>{

        return(
            <tr key={i}>
                <td class="text-center">{val.no}</td>
                <td>{val.transaction_date}</td>
                <td>{val.sender_name}</td>
                <td>IDR {new Intl.NumberFormat().format(val.amount)}</td>
                <td class="text-center">{val.payment_to}</td>
                <td class="text-center">{val.id_order}</td>
                <td class="text-center">
                    <button class="btn btn-info">Confirm</button>
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
                        Confirmation
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Confirmation</a></li>
                        <li class="active">Payment</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">Payment Confirmation</h3>                                    
                                </div>{/* /.box-header */}
                                <div class="box-body table-responsive">
                                    <table id="example2" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">No</th>
                                                <th class="text-center">Transaction Date</th>
                                                <th class="text-center">Sender Name</th>
                                                <th class="text-center">Amount Transferred</th>
                                                <th class="text-center">Payment To</th>
                                                <th class="text-center">Order ID</th>
                                                <th class="text-center">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payment}
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