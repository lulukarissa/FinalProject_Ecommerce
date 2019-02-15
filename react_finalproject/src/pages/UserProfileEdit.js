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

		token: '',
		province: [],
		city: [],
		subdistrict: [],
		district: []
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
				// console.log(x.data)
		})
		.catch()

		axios.get('https://x.rajaapi.com/poe')
		.then((x)=>{
			this.setState({
				token: x.data.token
			})
			
			axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/provinsi`)
			.then((x)=>{
				this.setState({
					province: x.data.data
				})
				console.log(x.data.data)
			})
		})	
	}

	getCity = (e) =>{
		axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kabupaten?idpropinsi=${e}`)
		.then((x)=>{
			this.setState({
				city: x.data.data
			})
		})
	}	

	getSubDistrict = (e) =>{
		axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kecamatan?idkabupaten=${e}`)
		.then((x)=>{
			this.setState({
				subdistrict: x.data.data
			})
		})
	}	

	getDistrict = (e) =>{
		axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kelurahan?idkecamatan=${e}`)
		.then((x)=>{
			this.setState({
				district: x.data.data
			})
		})
	}	


  render() {
		var province = this.state.province.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			
			return(
				<option key={i} value={id}>{name}</option>
			)
		})

		var city = this.state.city.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			return(
				<option key={i} value={id}>{name}</option>
			)
		})

		var subdistrict = this.state.subdistrict.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			return(
				<option key={i} value={id}>{name}</option>
			)
		})

		var district = this.state.district.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			return(
				<option key={i} value={id}>{name}</option>
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
									<select onChange={(e)=>{this.getCity(e.target.value)}}>
										<option hidden selected>Province</option>
										{province}
									</select>
									<br/><br/>
									<select onChange={(e)=>{this.getSubDistrict(e.target.value)}}>
										<option hidden selected>City</option>
										{city}
									</select>
									<br/><br/>
									<select onChange={(e)=>{this.getDistrict(e.target.value)}}>
										<option hidden selected>SubDistrict</option>
										{subdistrict}
									</select>
									<br/><br/>
									<select>
										<option hidden selected>District</option>
										{district}
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