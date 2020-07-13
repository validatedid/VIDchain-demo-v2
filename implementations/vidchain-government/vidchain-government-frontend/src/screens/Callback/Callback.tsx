import React, { Component } from 'react';
import './Callback.css';
import { OpenIDClient } from '../../libs/openid-connect/client';
import { Redirect } from 'react-router-dom';
import Official from '../../components/Official/Official';
import Header from '../../components/Header/Header';
import io from 'socket.io-client';
import Footer from '../../components/Footer/Footer';
import * as governmentBackend from '../../apis/governmentBackend';
import * as utils from "../../utils/utils";
import { verifiableKYC } from '../../interfaces/dtos';


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
		this.initiateSocket();
		governmentBackend.claimVP(utils.getUserDid(this.state.id_token));
	}

	async initiateSocket(){
		//const socket = io('https://fd4b7eb1114c.ngrok.io'
		const socket = io('/', {
		  path: '/governmentws',
		  transports: ['websocket']
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
	const {access_token, error} = this.state;
    if (access_token != null && !error) {
			return (<div>
						<Official></Official>
						<Header></Header>
							<div className= "content">
							<div className="wrapper">
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<h2>Waiting to receive your credential presentation...</h2>
									<p>Once you present your verifiableID you will be automatically redirected to your profile.</p>				
								</div>
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
