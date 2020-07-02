import React, { Component } from 'react';
import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData, Presentation} from "../../interfaces/dtos";
import { Toast } from "react-bootstrap";
import * as vidchain from "../../apis/vidchain";

interface Props {
	user: string;
	location: any;
}
  
interface State {
	user: ICredentialData;
	error: boolean;
	bicingCompleted: boolean;
}

const redIcon = "#ff0000";

class Profile extends Component<Props,State> {
	constructor(props:any) {
		super(props);
		this.state = {
			user: {} as ICredentialData,
			error: false,
			bicingCompleted: false,
		}
	}
  componentDidMount(){
	if(this.props.location.state.user){
		var user: ICredentialData = JSON.parse(this.props.location.state.user);
		this.setState ({
			user: user,
		});
	}
  }

  async claimVP(){
    const presentation: Presentation = {
		target: this.state.user.id,
		name: "Bicing",
		type: [
			[
				"VerifiableCredential",
				"VerifiableIdCredential"
			]
		],
	}
	const token = await vidchain.getAuthzToken();
	const response = await vidchain.requestVP(token, presentation);
	console.log(response)
	//Check response
	if(response !== "Error"){
		this.setState ({
			bicingCompleted: true
		})
	}
	else{
		this.setState ({
			error: true
		})
	}
  }

  toggleClose (){
	this.setState ({
		error: false
	})
}

  render() {
	const { user, error, bicingCompleted} = this.state;  
    return (
    <div>
    <Official></Official>
    <Header></Header>
	<h1 className= "welcome">Welcome to the electronic site of your city</h1>
	<Toast show={error} onClose={() => this.toggleClose()}>
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
            <small>Your City</small>
          </Toast.Header>
          <Toast.Body>Something wrong when generation the credential!</Toast.Body>
    </Toast>
    <div className= "content">
        <div className="wrapper">
			<div className="serviceCard">
				<div className="image-holder">
					<img src={require("../../assets/images/card.png")} alt=""/>
				</div>
				<form action="">
					<h3 className="eID-text">Your profile</h3>
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
				</form>
				
			</div>
			<h1>Services</h1>
			<div className="services">
				<div className="service">
					<img src={require("../../assets/images/bicing.svg")} className="service-img" alt=""/>
					<h1>Get your Bicing Card</h1>
					<h5 className="eID-text">You need to have a eID Verifiable Credential to get the bicing card and start using the bicycle sharing system of Your City.</h5>
					{bicingCompleted &&
						<h4>Check you mobile wallet</h4>
					}
					{!bicingCompleted &&
						<button className="custom-button" onClick={() => this.claimVP()}>
							<b>Claim your Card</b>
						</button>
					}
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
