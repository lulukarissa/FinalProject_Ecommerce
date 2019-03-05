import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios';
import swal from '@sweetalert/with-react'


class Register extends Component {

	  postData = (e)=>{
		e.preventDefault()

		var url = `${API_URL}/users`;
		axios.get(url).then((x)=>{
			var userdata = x.data
			
			var i;
		  for(i=0; i<userdata.length; i++){
			  if (this.refs.email.value === userdata[i].email){
					swal({text: "Email has already used!",
					icon: "warning",
					dangerMode: true})
				}
				else{
					var url = `${API_URL}/register`
					axios.post(url,{
						username: this.refs.username.value,
						first_name: this.refs.first_name.value,
						last_name: this.refs.last_name.value,
						email: this.refs.email.value,
						password: this.refs.password.value,
					})
					.then(()=>{
						var username = this.refs.username.value
						var first_name = this.refs.first_name.value

						localStorage.setItem('username', username)
						this.props.getUsername(username)

						swal({
							title: "You have successfully registered!",
							text: `Thank you for joining us, happy shopping ${first_name}!`,
							icon: "success",
							button: "GO TO HOME",
						}).then(()=>{
							window.location.href = '/home'
						})
					})
					.catch((x)=>{
						console.log('Error!')
					})
				}
			}
		})
	}
	
  render() {
    return (
        <div>
			<section id="form">{/*form*/}
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<div className="signup-form">{/*sign up form*/}
								<h2>New User Signup!</h2>
								<form action="#">
									<input type="text" placeholder="First Name" ref="first_name"/>
									<input type="text" placeholder="Last Name" ref="last_name"/>
									<input type="text" placeholder="Username" ref="username"/>
									<input type="email" placeholder="Email Address" ref="email"/>
									<input type="password" placeholder="Password" ref="password"/>
									<button type="submit" className="btn btn-default" onClick={this.postData}>Signup</button>
								</form>
							</div>{/*/sign up form*/}
						</div>
					</div>
				</div>
			</section>{/*/form*/}
        </div>
    );
  }
}

export default Register;