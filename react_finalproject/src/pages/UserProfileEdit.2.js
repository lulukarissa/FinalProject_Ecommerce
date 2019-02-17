import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
	state = {
		username: '',
		first_name: '',
		last_name: '',
		telephone: '',
		address: '',

		token: '',
		province: [],
		city: [],
		subdistrict: [],
		village: []
	}
	
	componentDidMount(){

		axios.get(`http://localhost:3210/users/${this.props.username}`)
		.then((x)=>{
				this.setState({
					username: x.data[0].username,
					// email: x.data[0].email,
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

	getVillage = (e) =>{
		axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kelurahan?idkecamatan=${e}`)
		.then((x)=>{
			this.setState({
				village: x.data.data
			})
		})
	}	

	editData = (e) => {
		var username = this.refs.username.value
		var first_name = this.refs.first_name.value
		var last_name = this.refs.last_name.value
		var telephone = this.refs.telephone.value

		var street = this.refs.street.value
		var village = this.refs.village.value.slice(10)
		var district = this.refs.district.value.slice(7)
		var city = this.refs.city.value.slice(4)
		var province = this.refs.province.value.slice(2)
		var address = `${street}, ${village}, ${district}, ${city}, ${province}`

		var url = `http://localhost:3210/users/${this.props.username}`
		axios.put(url,{
				username: username,
				first_name: first_name,
				last_name: last_name,
				telephone: telephone,
				address: address
			})
			.then((x)=>{
				console.log('Success!')
			})
			.catch((x)=>{
				console.log('Error!')
			})
		}


  render() {
		var province = this.state.province.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			
			return(
				<option key={i} value={`${id}${name}`}>{name}</option>
			)
		})

		var city = this.state.city.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			return(
				<option key={i} value={`${id}${name}`}>{name}</option>
			)
		})

		var subdistrict = this.state.subdistrict.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			return(
				<option key={i} value={`${id}${name}`}>{name}</option>
			)
		})

		var village = this.state.village.map((val,i)=>{
			var id = val.id	 
			var name = val.name

			return(
				<option key={i} value={`${id}${name}`}>{name}</option>
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
									<input type="text" defaultValue={this.state.username} ref="username"/>
									<h5>First Name:</h5>
									<input type="text" defaultValue={this.state.first_name} ref="first_name"/>
									<h5>Last Name:</h5>
									<input type="text" defaultValue={this.state.last_name} ref="last_name"/>
									<h5>Telephone:</h5>
									<input type="text" ref="telephone"/>
									<h5>Address:</h5>
									<select ref="province" onChange={(e)=>{this.getCity(e.target.value.slice(0,2))}}>
										<option hidden selected>Province</option>
										{province}
									</select>
									<br/><br/>
									<select ref="city" onChange={(e)=>{this.getSubDistrict(e.target.value.slice(0,4))}}>
										<option hidden selected>City</option>
										{city}
									</select>
									<br/><br/>
									<select ref="district" onChange={(e)=>{this.getVillage(e.target.value.slice(0,7))}}>
										<option hidden selected>SubDistrict</option>
										{subdistrict}
									</select>
									<br/><br/>
									<select ref="village">
										<option hidden selected>Administrative Village</option>
										{village}
									</select>
									<br/><br/>
									<textarea ref="street" rows="5" ref="street"/>
									<button type="button" className="btn btn-default" onClick={this.editData}>Submit</button>
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