import React, { Component } from 'react';
import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData} from "../../interfaces/ICredentialData";
import * as utils from "../../utils/utils";

interface Props {
	user: string;
	location: any;
}
  
interface State {
	user: ICredentialData;
}
const redIcon = "#ff0000";
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
			user: user,
		});
	}
  }
  claimVP(){
    
  }

  render() {
	const { user} = this.state;  
    return (
    <div>
    <Official></Official>
    <Header></Header>
	<h1 className= "welcome">Welcome to the electronic site of you city.</h1>
	<h4 className= "welcome">You can use your eID Verifiable Credential to access to the different services the city offers.</h4>
    <div className= "content">
        <div className="wrapper">
			<div className="inner">
				<div className="image-holder">
					<img src={require("../../assets/images/card.png")} alt=""/>
				</div>
				<form action="">
					<h3 className="eID-text">eID Verifiable Credential</h3>
					<div className="form-row">
						<h4>DID:  </h4>
						<p className= "welcome">{user.id}</p>
					</div>
					<div className="form-row">
						<h4>Name:  </h4>
						<p className= "welcome">{user.firstName}</p>
					</div>
					<div className="form-row">
						<h4>Surname:  </h4>
						<p className= "welcome">{user.lastName}</p>
					</div>
					<div className="form-row">
						<h4>Date Of Birth:  </h4>
						<p className= "welcome">{user.dateOfBirth}</p>
					</div>
					<div className="form-row">
						<h4>Place Of Birth:  </h4>
						<p className= "welcome">{user.placeOfBirth}</p>
					</div>
					<div className="form-row">
						<h4>Current Address:  </h4>
						<p>{user.currentAddress}</p>
					</div>
					<div className="form-row">
						<h4>City: </h4>
						<p className= "welcome">{user.city}</p>
					</div>
					<div className="form-row">
						<h4>State: </h4>
						<p className= "welcome">{user.state}</p>
					</div>
					<div className="form-row">
						<h4>Zip: </h4>
						<p className= "welcome">{user.zip}</p>
					</div>
					
					{/* <button className="custom-button">Claim your credential
						<i className="zmdi zmdi-long-arrow-right"></i>
					</button> */}
				</form>
				
			</div>
			<h1>Services</h1>
			<div className="services">
				{/* <div className="image-holder">
					<img src={require("../../assets/images/bicing.svg")} alt=""/>
				</div> */}
				<div className="service">
					<img src={require("../../assets/images/bicing.svg")} className="service-img" alt=""/>
					<h1>Get your Bicing Card</h1>
					<h5 className="eID-text">You need to have a eID Verifiable Credential to get the bicing card and start using the bicycle sharing system of Your City.</h5>
					<button className="custom-button" onClick={() => this.claimVP()}><b>Claim your Card</b>
					</button>
				</div>
				
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
