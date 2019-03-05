import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Login extends Component {

	login = (e) => {
		var url = `${API_URL}/users`;
		axios.get(url).then((x)=>{
		  var userdata = x.data
	
		  var username = this.refs.username.value
			var password =  this.refs.password.value
		  
			var i;
		  for(i=0; i<userdata.length; i++){
			  if (username === userdata[i].username && password === userdata[i].password){
				axios.post(`${API_URL}/login`, {
				  username: e.username.value,
				  password: e.password.value
				}).then(() => {
					localStorage.setItem('username', username)
					this.props.getUsername(username)

					swal({
						title: "You have successfully logged in!",
						text: `Welcome back, ${userdata[i].first_name}!`,
						icon: "success",
						button: "GO TO HOME",
					}).then(()=>{
						window.location.href = '/home'
					})
				})
				  break;
			  }else if (i === userdata.length - 1){
					swal({text: "Username or Password Incorrect!",
					icon: "warning",
					dangerMode: true})
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
							<div className="login-form">{/*login form*/}
								<h2>Login to your account</h2>
								<form action="#">
								<input type="text" placeholder="Username" ref="username"/>
								<input type="password" placeholder="Password" ref="password"/>
									<p> 
										Don't have any account yet? Please <a href="/register">sign up</a>.
									</p>
									<button type="button" className="btn btn-default" onClick={() => this.login(this.refs)}>Login</button>
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

export default Login;