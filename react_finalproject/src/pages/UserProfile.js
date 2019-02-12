import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
	state = {
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		telephone: '',
		address: '',
	}
	
	componentDidMount(){
	var link = `http://localhost:3210/users/${this.props.username}`

	axios.get(link)
	.then((x)=>{
			this.setState({
				username: x.data[0].username,
				email: x.data[0].email,
				first_name: x.data[0].first_name,
				last_name: x.data[0].last_name,
				telephone: x.data[0].telephone,
				address: x.data[0].address,
			})
			// console.log(x.data)
	})
	.catch()
	}
	
  render() {
    return (
        <div>
			<section id="form">{/*form*/}
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="login-form">{/*login form*/}
								<h2>User Profile</h2>
								<form action="#">
									<h5>Username:</h5>
									<p>{this.state.username}</p>
									<h5>Email:</h5>
									<p>{this.state.email}</p>
									<h5>Full Name:</h5>
									<p>{this.state.first_name} {this.state.last_name}</p>
									<h5>Telephone:</h5>
									<p>{this.state.telephone}</p>
									<h5>Address:</h5>
									<p>{this.state.address}</p>

									<button type="button" className="btn btn-default" onClick={()=>{window.location.href=`/editprofile/${this.props.username}`}}>
										Edit Profile
									</button>
									
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