import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
	state = {
		statusRedirect: false,
		// redirect: false,
		// typePass: 'password',
		// statusPass: '',
		// statusUsername: '',
		// mycookie: cookies.get('userID')
	  }

	
	ambil = (e) => {
		var url1 = 'http://localhost:3210/verifadmin';
		axios.get(url1).then((x)=>{
		  // var dt = x.data[1].password
		  var pjg = x.data
	
		  var username = this.refs.username.value
		  var password =  this.refs.password.value
		  
			var i;
		  for(i = 0; i<pjg.length; i++){
			  if (username === pjg[i].username && password === pjg[i].password){
				axios.post('http://localhost:3210/loginadmin', {
				  username: e.username.value,
				  password: e.password.value
				}).then((Response) => {
					
				  var userId = Response.data;
				  
				  cookies.set('userID', userId, {path: '/add-category'});
				  cookies.set('userID', userId, {path: '/add-products'});
				  cookies.set('userID', userId, {path: '/category-list'});
				  cookies.set('userID', userId, {path: '/edit-product'});
				  cookies.set('userID', userId, {path: '/member-list'});
				  cookies.set('userID', userId, {path: '/product-list'});
				  cookies.set('userID', userId, {path: '/home'});
				  this.setState({
						statusRedirect: true
				  })
					alert('success login');
					window.location.href = "/home";
					// this.props.getUsername(username);
				})
				  break;
			  }else if (i === pjg.length - 1){
				  alert ("Username or Password Incorrect")
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
									<button type="button" className="btn btn-default" onClick={() => this.ambil(this.refs)}>Login</button>
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