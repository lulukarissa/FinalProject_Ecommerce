import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Profile extends Component {
	state = {
		totalpayment: ''
	}

	getTotalPayment = () =>{
		var id = this.props.location.pathname.slice(15)
		var link = `http://localhost:3210/totalpayment/${id}`
		
		axios.get(link)
		.then((x)=>{
			this.setState({
				totalpayment: x.data[0].totalamount
			})
		})
	}

	postConfirmPayment = () =>{
		var transaction_date = this.refs.transaction_date.value
		var sender_name = this.refs.sender_name.value
		var amount = this.refs.amount.value
		var payment_to = this.refs.payment_to.value
		var id_order = this.props.location.pathname.slice(15)

		if(transaction_date == '' || sender_name == '' || amount == '' || payment_to == '' || id_order == ''){
			swal({text: "Please input all data!",
			icon: "warning",
			dangerMode: true})
		}
		else{
			var id = this.props.location.pathname.slice(15)
			axios.put(`http://localhost:3210/orderpayment/${id}`, {payment: 'Waiting To Confirm'})
			var link = 'http://localhost:3210/confirmpayment'
			axios.post(link, {
				transaction_date: transaction_date,
				sender_name: sender_name,
				amount: amount,
				payment_to: payment_to,
				id_order: id_order
			})
			.then((x)=>{
				swal({
					title: "You have sent the payment confirmation!",
					text: "The orders will be confirmed in 24hours",
					icon: "success",
					button: "OK",
				}).then(()=>{
					window.location.href = '/order'
				})
			})
			.catch((x)=>{
				console.log('Error!')
			})	
		}
	}
	
	componentDidMount(){
		this.getTotalPayment()
	}	

  render() {
		
    return (
        <div>
			<section id="form">{/*form*/}
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="login-form">{/*login form*/}
								<h2>Payment Confirmation</h2>
									<h4 style={{color:'orange'}}>Total amount payable for this order is: IDR {new Intl.NumberFormat().format(this.state.totalpayment)}</h4>
									<p><b>You have to fill the form and the orders will be confirmed in <span style={{color:'orange'}}>24hours.</span></b></p>
									<small style={{color:'grey'}}>*The payment slip doesn't need to be uploaded, but please keep it until our order confirms & order status changes to Processing.
									</small>
									<br/><br/>
									<ul className="list-group" style={{marginRight:'25px'}}>
										<li className="list-group-item">BCA 4820359179 a/n Getmyu Store</li>
										<li className="list-group-item">BNI 10559163452 a/n Getmyu Store</li>
										<li className="list-group-item">Mandiri 1180059163452 a/n Getmyu Store</li>
									</ul>
							</div>{/*/login form*/}
						</div>

						<div className="col-sm-6">
							<div className="login-form">{/*login form*/}
								<h2>
									<br/>
								</h2>
								<form action="#">
									<h5>Order ID:</h5>
									<input type="text" ref="id_order" disabled defaultValue={this.props.location.pathname.slice(15)}/>
									<h5>Transaction Date:</h5>
									<input type="date" ref="transaction_date"/>
									<h5>Sender Name:</h5>
									<input type="text" ref="sender_name"/>
									<h5>Amount Transferred:</h5>
									<input type="text" ref="amount"/>
									<h5>Payment to:</h5>
									<select type="option" ref="payment_to">
										<option hidden selected>--- Select Bank Account ---</option>
										<option>BCA</option>
										<option>BNI</option>
										<option>Mandiri</option>
									</select>
									<button type="button" className="btn btn-default" onClick={this.postConfirmPayment}>Confirm Payment</button>
								</form>
							</div>{/*/login form*/}
						</div>
					</div>
				</div>
			</section>{/*/form*/}
        </div>
    );
  }
}

export default Profile;