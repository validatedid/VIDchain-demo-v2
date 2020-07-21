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
	documentNumber: string;
	documentType: string;
	nationality: string;
	stateIssuer: string;
	dateOfExpiry: string;
	placeOfBirth: string;
	gender: string;
	currentAddress: string; 
	city: string; 
	state: string;
	zip: string;
	fakeLogin: boolean;
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
			documentNumber: "",
			documentType: "",
			nationality: "",
			stateIssuer: "",
			dateOfExpiry: "",
			placeOfBirth: "",
			gender: "",
			currentAddress: "", 
			city: "",
			state: "",
			zip: "",
			hasVerifiableId: false,
			fakeLogin: false		
		}
	}
  
  componentDidMount(){
    if(localStorage.getItem('userPass')){
      this.setState ({
        did: "Not yet provided",
        firstName: sessionStorage.getItem('firstName') || "Not provided",
        lastName: sessionStorage.getItem('lastName') || "Not provided",
        dateOfBirth: sessionStorage.getItem('dateOfBirth') || "Not provided",
        placeOfBirth: sessionStorage.getItem('placeOfBirth') || "Not provided",
        documentNumber: sessionStorage.getItem('documentNumber') || "Not provided",
        documentType: sessionStorage.getItem('documentType') || "Not provided",
        nationality: sessionStorage.getItem('nationality') || "Not provided",
        stateIssuer: sessionStorage.getItem('stateIssuer') || "Not provided",
        dateOfExpiry: sessionStorage.getItem('dateOfExpiry') || "Not provided",
        gender: sessionStorage.getItem('gender') || "Not provided",
        currentAddress: "Arago 179", 
        city: "Barcelona",
        state: "Barcelona",
        zip: "08011",
        fakeLogin: true
      });
    }else{
      this.setState({
        hasVerifiableId : true,
        did: utils.getUserDid(this.props.location.state.id_token) || "Not provided",
        firstName: this.props.location.state.verifiableKYC.name || "Not provided",
        lastName: this.props.location.state.verifiableKYC.surname || "Not provided",
        dateOfBirth: this.props.location.state.verifiableKYC.dateOfBirth || "Not provided",
        placeOfBirth: this.props.location.state.verifiableKYC.placeOfBirth || "Not provided",
        documentNumber: this.props.location.state.verifiableKYC.documentNumber || "Not provided",
        documentType: this.props.location.state.verifiableKYC.documentType || "Not provided",
        nationality: this.props.location.state.verifiableKYC.nationality || "Not provided",
        stateIssuer: this.props.location.state.verifiableKYC.stateIssuer || "Not provided",
        dateOfExpiry: this.props.location.state.verifiableKYC.dateOfExpiry || "Not provided",
        gender: this.props.location.state.verifiableKYC.sex || "Not provided",
        currentAddress: "Arago 179", 
        city: "Barcelona",
        state: "Barcelona",
        zip: "08011",
      });
    }
    if(this.state.did!==""){
      this.setState({
				hasVerifiableId: true
			});
    }
	  var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens()
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

  async generateCredential(type:string){
	const token = await vidchain.getAuthzToken();
	switch(type) { 
    // Currently not used
		/*case "verifiableId" : { 
			let credentialSubject:ICredentialData = {
				id: this.state.did,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				dateOfBirth: this.state.dateOfBirth,
				placeOfBirth: this.state.placeOfBirth,
				gender: this.state.gender,
				// When testing with DNI, these values were not provided
				currentAddress: this.state.currentAddress, 
				city: this.state.city, 
				state: this.state.state, 
				zip: this.state.zip,
			};
			const response = await vidchain.generateVerifiableID(token, credentialSubject);
			console.log(response);
		  break; 
		} */
		case "largeFamily" : { 
			const credential: CredentialData = {
				type: ["VerifiableCredential", "LargeFamilyCard"],
				issuer: "did:vid:0xfB5390914b110BEB6c0B250CB59b23E156B68e29", 
				id: "https://example.com/credential/2390",
				credentialSubject: {
					"id": this.state.did,
					"name": "Large Family Card"
				}
      }
      //TODO move this operation to backend
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
	const { did, firstName, lastName, dateOfBirth, documentNumber, documentType, nationality, stateIssuer, dateOfExpiry, largeFamily, hasVerifiableId, fakeLogin } = this.state;
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
									<h4>Document number:  </h4>
									<p className= "welcome">&nbsp;{documentNumber}</p>
								</div>
								<div className="form-row">
									<h4>Document type:  </h4>
									<p>&nbsp;{documentType}</p>
								</div>
								<div className="form-row">
									<h4>Nationality: </h4>
									<p className= "welcome">&nbsp;{nationality}</p>
								</div>
								<div className="form-row">
									<h4>State Issuer: </h4>
									<p className= "welcome">&nbsp;{stateIssuer}</p>
								</div>
								<div className="form-row">
									<h4>Date of expiry: </h4>
									<p className= "welcome">&nbsp;{dateOfExpiry}</p>
								</div>
								{!hasVerifiableId && fakeLogin &&
								<Button type="button" className="collect-button" onClick={() =>this.loginWithVIDChain()}>Get official government ID</Button>
								}
								</form>
							</div>
							{hasVerifiableId && !largeFamily &&
							<div className="services">
								<div className="service">
								<br/>
								<h5 className="eID-text"><b>Request your Large Family credential.</b></h5>
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