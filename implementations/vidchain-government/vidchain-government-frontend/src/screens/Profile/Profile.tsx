import React, { Component } from 'react';
import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData, Presentation} from "../../interfaces/dtos";
import { Toast, Button } from "react-bootstrap";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from '../../libs/openid-connect/client';
import * as utils from "../../utils/utils";
import * as governmentBackend from "../../apis/governmentBackend";


interface Props {
	user: string;
	location: any;
	history?: any;
}
  
interface State {
	user: ICredentialData;
	did: string;
	error: boolean;
	bicingCompleted: boolean;
	hasDid: boolean;
	hasVerifibleId: boolean;

}

class Profile extends Component<Props,State> {
	constructor(props:any) {
		super(props);
		this.state = {
			user: {} as ICredentialData,
			error: false,
			bicingCompleted: false,
			hasDid: false,
			did: "",
			hasVerifibleId: false
		}
	}
  
componentDidMount(){
	this.retrieveInfo();
	if (this.props.location.state.id_token != null){
		this.setState ({
			did: utils.getUserDid(this.props.location.state.id_token),
			hasDid: true
		});
		sessionStorage.setItem('id', utils.getUserDid(this.props.location.state.id_token));
		if(this.state.user.firstName==""){ //Only if you do not hold this information, retrieve from database
			this.retrieveUserDataBase(utils.getUserDid(this.props.location.state.id_token));			
		}
	}	
	var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens()
  }

  async retrieveUserDataBase(did: string){
	let storedUser = await governmentBackend.getUser(did);
	this.setState({
		user: storedUser
	});
    sessionStorage.setItem('firstName', this.state.user.firstName);
    sessionStorage.setItem('lastName', this.state.user.lastName);
    sessionStorage.setItem('dateOfBirth', this.state.user.dateOfBirth);
    sessionStorage.setItem('placeOfBirth', this.state.user.placeOfBirth);
    sessionStorage.setItem('currentAddress', this.state.user.currentAddress);
    sessionStorage.setItem('city', this.state.user.city);
    sessionStorage.setItem('state', this.state.user.state);
    sessionStorage.setItem('zip', this.state.user.zip);
    sessionStorage.setItem('gender', this.state.user.gender);
  }

  async retrieveInfo(){
	this.state.user.firstName = sessionStorage.getItem('firstName') || "";
	this.state.user.lastName = sessionStorage.getItem('lastName') || "";
	this.state.user.dateOfBirth = sessionStorage.getItem('dateOfBirth') || "";
	this.state.user.placeOfBirth = sessionStorage.getItem('placeOfBirth') || "";
	this.state.user.currentAddress = sessionStorage.getItem('currentAddress') || "";
	this.state.user.city = sessionStorage.getItem('city') || "";
	this.state.user.state = sessionStorage.getItem('state') || "";
	this.state.user.zip = sessionStorage.getItem('zip') || "";
	this.state.user.gender = sessionStorage.getItem('gender') || "";
  }

  async loginWithVIDChain(){
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
			scopes: {
				request: ["openid", "offline"],
				require: ["openid", "offline"]
      }
    });
  }
  
  async generateCredential(){
	//await this.retrieveInfo();
	let credentialSubject:ICredentialData = {
		id: this.state.did,
		firstName: this.state.user.firstName,
		lastName: this.state.user.lastName,
		dateOfBirth: this.state.user.dateOfBirth,
		placeOfBirth: this.state.user.placeOfBirth,
		currentAddress: this.state.user.currentAddress,
		city:this.state.user.city,
		state: this.state.user.state,
		zip: this.state.user.zip,
		gender: this.state.user.gender,
	};
	console.log(credentialSubject);
	const token = await vidchain.getAuthzToken();
	const response = await vidchain.generateVerifiableID(token, credentialSubject);
	console.log(response);
	this.setState({
		hasVerifibleId: true
	});
	//Store this information in the database for future logins only if it has not been stored yet
	if(await governmentBackend.getUser(this.state.did)==""){
		await governmentBackend.storeUser(credentialSubject); 
	}
  }

  /*async claimVP(){
    const presentation: Presentation = {
		target: this.state.did,
		name: "Bicing",
		type: [
			[
				"VerifiableCredential",
				"VerifiablhasDidCredential"
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
  }*/
 
  async goToServices(){  
	sessionStorage.setItem('did', utils.getUserDid(this.props.location.state.id_token));
		this.props.history.push(
			{
				pathname: '/services',
			}
      ); 
  }
  render() {
	const { did, error, bicingCompleted, hasDid, hasVerifibleId} = this.state;
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
							{!hasDid &&
								<div className="form-row">
								<h4>DID:  </h4>
								<p className= "welcome"> <i>You do not have associated your did yet.</i></p>
								</div>
							  }
							{hasDid &&
								<div className="form-row">
								<h4>DID:  </h4>
								<p className= "welcome">&nbsp;{did}</p>
								</div>
							  }
							<div className="form-row">
								<h4>Name:  </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('firstName')}</p>
							</div>
							<div className="form-row">
								<h4>Surname:  </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('lastName')}</p>
							</div>
							<div className="form-row">
								<h4>Date Of Birth:  </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('dateOfBirth')}</p>
							</div>
							<div className="form-row">
								<h4>Place Of Birth:  </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('placeOfBirth')}</p>
							</div>
							<div className="form-row">
								<h4>Current Address:  </h4>
								<p>&nbsp;{sessionStorage.getItem('currentAddress')}</p>
							</div>
							<div className="form-row">
								<h4>City: </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('city')}</p>
							</div>
							<div className="form-row">
								<h4>State: </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('state')}</p>
							</div>
							<div className="form-row">
								<h4>Zip: </h4>
								<p className= "welcome">&nbsp;{sessionStorage.getItem('zip')}</p>
							</div>
							{hasDid && !hasVerifibleId &&
							<Button type="button" className="collect-button" onClick={() =>this.generateCredential()}>Collect the eID in your VIDchain Wallet</Button>
							}
						</form>
					</div>
					{!hasDid &&
						<div className="services">
						<div className="service">
							<br/>
							<h5 className="eID-text">Link your VIDchain wallet to your account</h5>
								<button className="custom-button" onClick={() => this.loginWithVIDChain()}>
									<b>Authenticate with VIDchain</b>
								</button>
						</div>
						</div>
					}
					{hasDid && hasVerifibleId &&
					<div className="services">
					<div className="service">
							<br/>
							<h5 className="eID-text">Now that you have your Verifiable ID (eID), you are ready to use it for using our city services. Get your Bicing card and start using the bicycle sharing system of Your City.</h5>
								<button className="custom-button" onClick={() => this.goToServices()}>
									<b>Check our service catalog</b>
								</button>
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
