import React, { Component } from 'react';
import logo from './logo.svg';
import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData} from "../../interfaces/ICredentialData";
interface Props {
	user: string;
	location: any;
}
  
interface State {
	user: ICredentialData;
}
class Profile extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			user: {} as ICredentialData
		}
	}
  componentDidMount(){
	if(this.props.location.state){
		var user: ICredentialData = JSON.parse(this.props.location.state.user);
		this.setState ({
			user: user
		});
	}
  }
  loginWithVIDChain(){
    
  }

  render() {
	const { user} = this.state;  
    return (
    <div>
    <Official></Official>
    <Header></Header>
	<h4>Welcome to the electronic site of the city of Barcelona</h4>
    <div className= "content">
		
        <div className="wrapper">
			<div className="inner">
				<div className="image-holder">
					<img src={require("../../assets/images/profile_image.png")} alt=""/>
				</div>
				<form action="">
					<h3>My Profile</h3>
					<div className="form-row">
						<h4>DID</h4>
						<p>{user.id}</p>
					</div>
					<div className="form-row">
						<h4>Name</h4>
						<p>{user.currentGivenName}</p>
					</div>
					<div className="form-row">
						<h4>Surname</h4>
						<p>{user.currentFamilyName}</p>
					</div>
					<div className="form-row">
						<h4>Date Of Birth</h4>
						<p>{user.dateOfBirth}</p>
					</div>
					<div className="form-row">
						<h4>Place Of Birth</h4>
						<p>{user.placeOfBirth}</p>
					</div>
					<div className="form-row">
						<h4>Phone</h4>
						<p>{user.govID}</p>
					</div>
					<div className="form-row">
						<h4>Current Address</h4>
						<p>{user.currentAddress}</p>
					</div>
					
					{/* <button className="custom-button">Claim your credential
						<i className="zmdi zmdi-long-arrow-right"></i>
					</button> */}
				</form>
				
			</div>
		</div>
    </div>
    <div className="footer">
      <Footer></Footer>
    </div>

    </div>
    
    );
  }
}

export default Profile;
