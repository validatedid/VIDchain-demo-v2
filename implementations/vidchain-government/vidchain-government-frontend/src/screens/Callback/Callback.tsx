import React, { Component,Fragment } from 'react';
import './Callback.css';
import * as utils from "../../utils/utils";
import { OpenIDClient } from '../../libs/openid-connect/client';
import { Redirect } from 'react-router-dom';
import Official from '../../components/Official/Official';
import Header from '../../components/Header/Header';
import { Presentation, verifiableKYC } from '../../interfaces/dtos';
import * as vidchain from '../../apis/vidchain';
import io from 'socket.io-client';


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
		this.claimVP();
	}

	async initiateSocket(){
		const socket = io('/', {
		  path: '/governmentws',
		  transports: ['websocket']
		});
		socket.on('presentation', (msg: any) => {
		console.log("socket.on('presentation')");
		console.log(msg);
		  // Agafar els atributs de la presentació
			/*this.setState({
				verifiableKYC: verifiableKYC = {
					id: string;
					documentNumber: string; 
					documentType: string;
					name: string;
					surname: string;
					fullName: string; 
					nationality: string;
					stateIssuer: string;
					issuingAuthority: string;
					dateOfExpiry: string;
					dateOfBirth: string;
					placeOfBirth: string;
					sex: string;
					personalNumber: string;
				}	
			});*/
		  this.goToProfile();
		});
	}

	async claimVP(){	
		const presentation: Presentation = {
			target: utils.getUserDid(this.state.id_token),
			name: "verifiableKYC",
			type: [
				[
					"VerifiableCredential",
					"VidKycCredential"
				]
			],
		}
		const token = await vidchain.getAuthzToken();
		const response = await vidchain.requestVP(token, presentation);
		console.log("Check the parameters that will have to be parsed!");
		console.log(response);
		if(response == "Error"){
			this.setState ({
				error: true
			})
		}else{
			
		}
	  }

	goToProfile(){
		const { history } = this.props;
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
									<h2>Waiting to receive your credential presentation...</h2>
									<p>Once you present your verifiableID you will be automatically redirected to your profile.</p>				
								</div>
							</div>
					</div>);
		} else {
			return (<Redirect to='/'/>);
		}
   }
}

export default Callback;
