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

		province: []
	}
	
	componentDidMount(){

	axios.get(`http://localhost:3210/users/${this.props.username}`)
	.then((x)=>{
			this.setState({
				username: x.data[0].username,
				email: x.data[0].email,
				first_name: x.data[0].first_name,
				last_name: x.data[0].last_name,
				telephone: x.data[0].telephone,
				address: x.data[0].address,
			})
			console.log(x.data)
	})
	.catch()

	axios.get('https://x.rajaapi.com/MeP7c5nesyUuvvEYzvLzuVqSdAV9RJaYM1TXcHE2xwoIyU6kPlJQBj6V50/m/wilayah/provinsi')
	.then((x)=>{
		this.setState({
			province: x.data.data
		})
		// console.log(x.data.data)
	})
	}
	
	// onSelect = (event) => {
	// 	this.props.onSelect(parseInt(event.target.value));
	// }
	

  render() {
		var province = this.state.province.map((val,i)=>{
			var id = val.id
			var name = val.name

			return(
				<option>{val.name}</option>
			)
		})
    return (
        <div>
			<section id="form">{/*form*/}
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="login-form">{/*login form*/}
								<h2>Edit Profile</h2>
								<form action="#">
									<h5>Username:</h5>
									<input type="text" defaultValue={this.state.username} ref=""/>
									<h5>First Name:</h5>
									<input type="text" defaultValue={this.state.first_name} ref=""/>
									<h5>Last Name:</h5>
									<input type="text" defaultValue={this.state.last_name} ref=""/>
									<h5>Telephone:</h5>
									<input type="text" ref=""/>
									<h5>Address:</h5>
									<select>
										<option hidden selected>Province</option>
										{province}
									</select>
									<br/><br/>
									<select>
										<option hidden selected>City</option>
										<option>tes</option>
									</select>
									<br/><br/>
									<select>
										<option hidden selected>District</option>
										<option>tes</option>
									</select>
									<br/><br/>
									<textarea rows="5" ref=""/>
									<button type="button" className="btn btn-default">Submit</button>
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