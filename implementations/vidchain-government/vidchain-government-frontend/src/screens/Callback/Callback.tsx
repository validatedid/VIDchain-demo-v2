import React, { Component } from 'react';
import './Callback.css';
import { OpenIDClient } from '../../libs/openid-connect/client';
import { Redirect } from 'react-router-dom';
import Official from '../../components/Official/Official';
import Header from '../../components/Header/Header';
import io from 'socket.io-client';
import Footer from '../../components/Footer/Footer';
import * as governmentBackend from '../../apis/governmentBackend';
import * as vidchain from '../../apis/vidchain';
import * as utils from "../../utils/utils";
import { verifiableKYC } from '../../interfaces/dtos';
import { Ring } from 'react-spinners-css';
import { ICredentialData } from "../../interfaces/dtos";



interface Props {
	history:any;
	location: any;
	match: any
}
  
interface State {
	access_token: string,
	refresh_token: string,
	id_token: string,
	expires: number,
	verifiableKYC: verifiableKYC,
	socketSession: string,
	showCallback: boolean,
	error: boolean
}

class Callback extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			access_token: '',
			refresh_token: '',
			id_token: '',
			expires: 0,
			verifiableKYC: {} as verifiableKYC,
			socketSession: '',
			showCallback: false,
			error: false,
		}	
	}

	async componentDidMount(){
		var client = OpenIDClient.getInstance().getClient();
		try{
			await client.callback();
		}
		catch(error){
			console.log(error);
		}
		let token = await client.checkToken({
			scopes: {
				request: ["openid", "offline"],
				require: ["openid", "offline"]
			}
		});

		if (token !== null) {
			console.log("I got the token: ", token)
			this.setState({
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				id_token: token.id_token,
				expires: token.expires,
			});
		}
		if(localStorage.getItem('userPass')){
			localStorage.clear();
			this.setState({
				verifiableKYC: {
					id: utils.getUserDid(this.state.id_token),
					documentNumber: sessionStorage.getItem('documentNumber') || "Not provided",
					documentType: sessionStorage.getItem('documentType') || "Not provided",
					name: sessionStorage.getItem('firstName') || "Not provided",
					surname: sessionStorage.getItem('lastName') || "Not provided",
					fullName: sessionStorage.getItem('fullName') || "Not provided", 
					nationality: sessionStorage.getItem('nationality') || "Not provided",
					stateIssuer: sessionStorage.getItem('stateIssuer') || "Not provided",
					issuingAuthority: sessionStorage.getItem('issuingAuthority') || "Not provided",
					dateOfExpiry: sessionStorage.getItem('dateOfExpiry') || "Not provided",
					dateOfBirth: sessionStorage.getItem('dateOfBirth') || "Not provided",
					placeOfBirth: sessionStorage.getItem('placeOfBirth') || "Not provided",
					sex: sessionStorage.getItem('gender') || "Not provided",
					personalNumber: sessionStorage.getItem('personalNumber') || "Not provided",
					}	
				})
			let credentialSubject:ICredentialData = {
				id: this.state.verifiableKYC.id,
				firstName: this.state.verifiableKYC.name,
				lastName: this.state.verifiableKYC.surname,
				dateOfBirth: this.state.verifiableKYC.dateOfBirth,
				placeOfBirth: this.state.verifiableKYC.placeOfBirth,
				gender: this.state.verifiableKYC.sex,
				currentAddress: "Arago 179", 
        		city: "Barcelona",
        		state: "Barcelona",
        		zip: "08011"
			};
			await vidchain.generateVerifiableID(token, credentialSubject);
			this.goToProfile();
		}else{
			this.setState({
				showCallback: true
			})
			this.initiateSocket();
			governmentBackend.claimLoginVP(utils.getUserDid(this.state.id_token));
		}
	}

	async initiateSocket(){
		// const socket = io('http://e82af5e6eb66.ngrok.io', {
		const socket = io('/', {
		  path: '/governmentws',
		  transports: ['websocket']
		});

		socket.on('connect', () => {
			console.log('socket connect!');
			this.setState({
				socketSession: socket.id,
			});
			const socketClient = { 
				did: utils.getUserDid(this.state.id_token),
				clientId: this.state.socketSession,
			};
			 socket.emit('whoami', socketClient);
			 console.log('whoami.did: '+ socketClient.did);
			 console.log('whoami.clientId: '+ socketClient.clientId);
		 });

		socket.on('presentation', (msg: any) => {
			console.log("socket presentation notification!");

			let presentation = JSON.parse(JSON.stringify(utils.strB64dec(msg.data.base64)));
			let details = JSON.stringify(utils.decodeJWT(presentation.verifiableCredential[0]));
			let detailsJSON = JSON.parse(details);
			// This information is now only used to retrieve the user info 
			// Whereas in a real scenario, the backend would take some of these attributes to map the information registered in the system's database (check) and authenticate the user
			this.setState({
				verifiableKYC: {
					id: detailsJSON.vc.credentialSubject.id,
					documentNumber: detailsJSON.vc.credentialSubject.documentNumber,
					documentType: detailsJSON.vc.credentialSubject.documentType,
					name: detailsJSON.vc.credentialSubject.name,
					surname: detailsJSON.vc.credentialSubject.surname,
					fullName: detailsJSON.vc.credentialSubject.fullName, 
					nationality: detailsJSON.vc.credentialSubject.nationality,
					stateIssuer: detailsJSON.vc.credentialSubject.stateIssuer,
					issuingAuthority: detailsJSON.vc.credentialSubject.issuingAuthority,
					dateOfExpiry: detailsJSON.vc.credentialSubject.dateOfExpiry,
					dateOfBirth: detailsJSON.vc.credentialSubject.dateOfBirth,
					placeOfBirth: detailsJSON.vc.credentialSubject.placeOfBirth,
					sex: detailsJSON.vc.credentialSubject.sex,
					personalNumber: detailsJSON.vc.credentialSubject.personalNumber,
					}	
				});
			this.goToProfile();
		});
	}

	goToProfile(){
		const { access_token, refresh_token, id_token, verifiableKYC } = this.state;
		this.props.history.push(
			{
			  pathname: '/profile',
			  state: { 
				access_token: access_token,
				refresh_token: refresh_token,
				id_token: id_token,
				verifiableKYC: verifiableKYC
			 }
			}
		  ); 
	}

  render() {
	const {access_token, error, showCallback} = this.state;
    if (access_token != null && !error) {
			return (<div>
						<Official></Official>
						<Header></Header>
							<div className= "content">
								{showCallback &&
									<div className="wrapper">
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<h2>We have sent you a request to your wallet,</h2>
									<h2>please provide your Verifiable ID.</h2> 
									<br></br>
									<p>Waiting to receive your credential...</p>
									<br></br>
									<div className="spinnerContainer">
									<Ring color="red" />
									</div>		
									</div>
								}
								{!showCallback &&
									<div className="wrapper">
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<div className="spinnerContainer">
									<Ring color="red" />
									</div>		
									</div>
								}
							</div>
							<div className="footer">
						<Footer></Footer>
						</div>	
					</div>);
		} else {
			return (<Redirect to='/'/>);
		}
   }
}

export default Callback;
