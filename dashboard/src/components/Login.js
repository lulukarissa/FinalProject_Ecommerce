import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Login extends Component {

	login = (e) => {
		var url = 'http://localhost:3210/verifadmin';
		axios.get(url).then((x)=>{
		  var userdata = x.data
	
		  var username = this.refs.username.value
			var password =  this.refs.password.value
			var first_name = x.data[0].first_name
		  
			var i;
		  for(i = 0; i<userdata.length; i++){
			  if (username === userdata[i].username && password === userdata[i].password){
				axios.post('http://localhost:3210/loginadmin', {
				  username: e.username.value,
				  password: e.password.value
				}).then(() => {
					localStorage.setItem('username', username)
					this.props.getUsername(username)

					swal({
						title: "You have successfully logged in!",
						text: `Hello, ${first_name}!`,
						icon: "success",
						button: "OK",
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
			<section id="form" style={{marginTop:'50px'}}>{/*form*/}<center>
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="login-form">{/*login form*/}
								<h2>Login to your account</h2>
								<form action="#">
								<input type="text" placeholder="Username" ref="username"/><br/>
								<input type="password" placeholder="Password" ref="password"/>
								<br/><br/>
									<button type="button" className="btn btn-default" onClick={() => this.login(this.refs)}>Login</button>
								</form>
							</div>{/*/login form*/}
						</div>
					</div>
				</div></center>
			</section>{/*/form*/}
        </div>
    );
  }
}

export default Login;