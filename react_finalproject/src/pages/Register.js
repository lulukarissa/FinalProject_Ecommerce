import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Register extends Component {
	state = {
		statusRedirect: false,
		// redirect: false,
		// typePass: 'password',
		// statusPass: '',
		// statusUsername: '',
		// mycookie: cookies.get('userID')
	  }

	  postData = ()=>{
		var url = 'http://localhost:3210/register'
		axios.post(url,{
			username: this.refs.username.value,
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
		})
		.then((x)=>{
			console.log('Success!')
			// this.setState({
			// 	redirect: true
			// })
		})
		.catch((x)=>{
			console.log('Error!')
		})
	}
	
	
	ambil = (e) => {
		var url1 = 'http://localhost:3210/verif';
		axios.get(url1).then((x)=>{
		  // var dt = x.data[1].password
		  var pjg = x.data
	
		  var username = this.refs.username.value
		  var password =  this.refs.password.value
		  
			var i;
		  for(i = 0; i<pjg.length; i++){
			  if (username === pjg[i].username && password === pjg[i].password){
				axios.post('http://localhost:3210/login', {
				  username: e.username.value,
				  password: e.password.value
				}).then((Response) => {
				  var userId = Response.data;
				  
				  cookies.set('userID', userId, {path: '/shop'});
				  cookies.set('userID', userId, {path: '/product-details'});
				  cookies.set('userID', userId, {path: '/checkout'});
				  cookies.set('userID', userId, {path: '/cart'});
				  cookies.set('userID', userId, {path: '/blog'});
				  cookies.set('userID', userId, {path: '/blog-single'});
				  cookies.set('userID', userId, {path: '/contact-us'});
				  cookies.set('userID', userId, {path: '/home'});
				  this.setState({
					statusRedirect: true
				  })
				  alert('success login')
				})
				  break;
			  }else if (i === pjg.length - 1){
				  alert ("Username or Password Incorrect")
			  }
		  }
		  })
		}

  render() {
	if(this.state.statusRedirect === true){
		return <Redirect to="/home" />
	}
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