import React, { Component } from 'react';
import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData, CredentialData } from "../../interfaces/dtos";
import { Button } from "react-bootstrap";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from '../../libs/openid-connect/client';
import * as utils from "../../utils/utils";

interface Props {
	user: string;
	location: any;
	history?: any;
}
  
interface State {
	user: ICredentialData;
	did: string;
	error: boolean;
	largeFamily: boolean;
	hasVerifiableId: boolean;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	placeOfBirth: string;
	currentAddress: string;
	city: string;
	state: string;
	zip: string;
	gender: string;
}

class Profile extends Component<Props,State> {
	constructor(props:any) {
		super(props);
		this.state = {
			user: {} as ICredentialData,
			error: false,
			largeFamily: false,
			did: "",
			firstName: "",
	        lastName: "",
			dateOfBirth: "",
			placeOfBirth: "",
			currentAddress: "",
			city: "",
			state: "",
			zip: "",
			gender: "",
			hasVerifiableId: false,		
		}
	}
  
componentDidMount(){
	this.setState ({
		did: utils.getUserDid(this.props.location.state.id_token),
		//TODO: Remove hardcoded and retrieve attributes from presentation	
		firstName: "Mauro",
		lastName: "Lucchini",
		dateOfBirth: "05/02/1993",
		placeOfBirth: "Barcelona",
		currentAddress: "Pitfield 64",
		city: "El Masnou",
		state: "Barcelona",
		zip: "08320",
		gender: "Male",
	});
	var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens()
  }

  async generateCredential(type:string){
	const token = await vidchain.getAuthzToken();
	switch(type) { 
		case "verifiableId" : { 
			let credentialSubject:ICredentialData = {
				id: this.state.did,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				dateOfBirth: this.state.dateOfBirth,
				placeOfBirth: this.state.placeOfBirth,
				currentAddress: this.state.currentAddress,
				city:this.state.city,
				state: this.state.state,
				zip: this.state.zip,
				gender: this.state.gender,
			};		
			const response = await vidchain.generateVerifiableID(token, credentialSubject);
			console.log(response);
			this.setState({
				hasVerifiableId: true
			});
			sessionStorage.setItem('hasVerifiableId', 'true');
		  break; 
		} 
		case "largeFamily" : { 
			const credential: CredentialData = {
				type: ["VerifiableCredential", "LargeFamilyCard"],
				issuer: "Your City", // may get a did
				id: "https://example.com/credential/2390",
				credentialSubject: {
					"id": this.state.did,
					"name": "Large Family Card"
				}
			}
			const response = await vidchain.generateVerifiableCredential(token, credential);
			console.log(response);
			this.setState({
				largeFamily: true
			})
		  break; 
		} 
		default: { 
		   this.setState({
			 error: true
		   });
		   console.log("This type of credential is not currently supported.");
		   break; 
		} 
	}
  }
 
// Services page is no longer used
/* async goToServices(){  
	sessionStorage.setItem('did', utils.getUserDid(this.props.location.state.id_token));
		this.props.history.push(
			{
				pathname: '/services',
			}
      ); 
  } */

  render() {
	const { did, firstName, lastName, dateOfBirth, placeOfBirth, currentAddress, city, state, zip, largeFamily, hasVerifiableId} = this.state;
		return (
				<div>
					<Official></Official>
					<Header></Header>
					<div className= "content">
						<div className="wrapper">
							<div className="serviceCard">
								<div className="image-holder">
								<img src={require("../../assets/images/card.png")} alt=""/>
								</div>
								<form action="">
								<h3 className="eID-text">Your profile</h3>
								<div className="form-row">
									<h4>DID:  </h4>
									<p className= "welcome">&nbsp;{did}</p>
								</div>
								<div className="form-row">
									<h4>Name:  </h4>
									<p className= "welcome">&nbsp;{firstName}</p>
								</div>
								<div className="form-row">
									<h4>Surname:  </h4>
									<p className= "welcome">&nbsp;{lastName}</p>
								</div>
								<div className="form-row">
									<h4>Date Of Birth:  </h4>
									<p className= "welcome">&nbsp;{dateOfBirth}</p>
								</div>
								<div className="form-row">
									<h4>Place Of Birth:  </h4>
									<p className= "welcome">&nbsp;{placeOfBirth}</p>
								</div>
								<div className="form-row">
									<h4>Current Address:  </h4>
									<p>&nbsp;{currentAddress}</p>
								</div>
								<div className="form-row">
									<h4>City: </h4>
									<p className= "welcome">&nbsp;{city}</p>
								</div>
								<div className="form-row">
									<h4>State: </h4>
									<p className= "welcome">&nbsp;{state}</p>
								</div>
								<div className="form-row">
									<h4>Zip: </h4>
									<p className= "welcome">&nbsp;{zip}</p>
								</div>
								{!hasVerifiableId &&
								<Button type="button" className="collect-button" onClick={() =>this.generateCredential("verifiableId")}>Get official government ID</Button>
								}
								</form>
							</div>
							{hasVerifiableId && !largeFamily &&
							<div className="services">
								<div className="service">
								<br/>
								<h5 className="eID-text"><b>Now that you have your Verifiable ID, you are ready to request your Large Family credential.</b></h5>
								<br></br>
								<h5 className="eID-text"><i>You can use it wherever you go: Public Service Providers, Universities, Schools,...</i></h5>
									<button className="custom-button" onClick={() => this.generateCredential("largeFamily")}>
									<b>Get Large Family credential</b>
									</button>
								</div>
							</div>
							}
							{hasVerifiableId && largeFamily &&
							<div className="services">
								<div className="service">
								<br/>
								<h5 className="eID-text"><i>Your credential has been sent.</i></h5>
								<br></br>
								<h4 className="eID-text"><b>Check your wallet.</b></h4>
								</div>
							</div>
							}
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