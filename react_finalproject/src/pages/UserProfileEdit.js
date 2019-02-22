import React, { Component } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react'

class Profile extends Component {
	state = {
		username: '',
		first_name: '',
		last_name: '',
		telephone: '',
		address: '',

		province: [],
		city: []
	}
	
	componentDidMount(){

		axios.get(`http://localhost:3210/users/${this.props.username}`)
		.then((x)=>{
				this.setState({
					username: x.data[0].username,
					first_name: x.data[0].first_name,
					last_name: x.data[0].last_name,
					telephone: x.data[0].telephone,
					address: x.data[0].address,
				})
		})
		.catch()

		axios.get(`http://localhost:3210/province`)
			.then((x)=>{
				this.setState({
					province: x.data.rajaongkir.results
				})
		})	
	}

	getCity = (e) =>{
		axios.get(`http://localhost:3210/city/${e}`)
		.then((x)=>{
			this.setState({
				city: x.data.rajaongkir.results
			})
		})
	}	

	editData = (e) => {
		var username = this.refs.username.value
		var first_name = this.refs.first_name.value
		var last_name = this.refs.last_name.value
		var telephone = this.refs.telephone.value

		var street = this.refs.street.value
		var city = this.refs.city.value.split(',')[1]
		var province = this.refs.province.value.split(',')[1]
		var address = `${street}, ${city}, ${province}`

		

			if(username == '' || first_name == '' || last_name == '' || telephone == '' || street == '' || city == '' || province == ''){
				swal({text: "Please input all data!",
				icon: "warning",
				dangerMode: true})
			}
			else{
				var url = `http://localhost:3210/users/${this.props.username}`
				axios.put(url,{
					username: username,
					first_name: first_name,
					last_name: last_name,
					telephone: telephone,
					address: address
				})
				.then((x)=>{
					swal({
						title: "Successfully edit profile!",
						icon: "success",
						button: "OK",
					}).then(()=>{
						window.history.back()
					})

					localStorage.setItem('city', this.refs.city.value.split(',')[0])
					this.props.getCity(this.refs.city.value.split(',')[0])
					// console.log(this.refs.city.value.split(',')[0])
				})
				.catch((x)=>{
					console.log('Error!')
				})	
			}
		}


  render() {
		var province = this.state.province.map((val,i)=>{
			var id = val.province_id
			var name = val.province

			
			return(
				<option key={i} value={`${id},${name}`}>{name}</option>
			)
		})

		var city = this.state.city.map((val,i)=>{
			var id = val.city_id
			var name = val.city_name

			return(
				<option key={i} value={`${id},${name}`}>{name}</option>
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
									<input defaultValue={this.state.telephone} type="text" ref="telephone"/>
									<h5>Address:</h5>
									<select ref="province" onChange={(e)=>{this.getCity(e.target.value.split(',')[0])}}>
										<option hidden selected>Province</option>
										{province}
									</select>
									<br/><br/>
									<select ref="city">
										<option hidden selected>City</option>
										{city}
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