import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	state = {
		statusRedirect: false
	  }

	login = (e) => {
		var url = 'http://localhost:3210/users';
		axios.get(url).then((x)=>{
		  var userdata = x.data
	
		  var username = this.refs.username.value
			var password =  this.refs.password.value
			var first_name = x.data[0].first_name
		  
			var i;
		  for(i = 0; i<userdata.length; i++){
			  if (username === userdata[i].username && password === userdata[i].password){
				axios.post('http://localhost:3210/login', {
				  username: e.username.value,
				  password: e.password.value
				}).then(() => {
					localStorage.setItem('username', username)
				  this.setState({
						statusRedirect: true
				  })
					alert(`You have successfully logged in!
					Welcome back, ${first_name}!`)
					this.props.getUsername(username)
				})
				  break;
			  }else if (i === userdata.length - 1){
				  alert ("Username or Password Incorrect")
			  }
		  }
		  })
		}

  render() {
	if(this.state.statusRedirect === true){
		return (<Redirect to="/home" />)
	}
	else{
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
}

export default Login;