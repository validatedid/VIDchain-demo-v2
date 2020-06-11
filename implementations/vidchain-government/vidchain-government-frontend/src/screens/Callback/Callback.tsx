import React, { Component,Fragment } from 'react';
import './Callback.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { Button, Form, Alert, Row,InputGroup, Col } from "react-bootstrap";
import {ICredentialData} from "../../interfaces/ICredentialData";
import axios from 'axios'
import * as config from '../../config';
import { Link } from "react-router-dom";
import io from 'socket.io-client'
import * as utils from "../../utils/utils";
import { OpenIDClient } from '../../libs/openid-connect/client';
import queryString from "query-string";
// @ts-ignore
import {JSO, Popup} from 'jso'

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
	signUp: boolean
}

class Callback extends Component<Props,State> {
	

	constructor(props:any) {
		super(props);

		this.state = {
			access_token: '',
			refresh_token: '',
			id_token: '',
			expires: 0,
			signUp: true,
		}
		
	}

	async componentDidMount(){
		const { location,history, match } = this.props;
		const params = queryString.parse(location.search);
		var client = OpenIDClient.getInstance().getClient();
		let token = client.checkToken({
			grant_type : "authorization_code",
			code: params.code,
		});
		console.log(token);
		if (token !== null) {
			console.log("I got the token: ", token)
			this.setState({
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				id_token: token.id_token,
				expires: token.expires
			});
		}
		//this.checkIfSignInOrSignUp();
	}

	async getTokens(){
		var client = OpenIDClient.getInstance().getClient();
		let token = await client.checkToken({
			scopes: {
				request: ["openid", "offline"],
				require: ["openid", "offline"]
      		}
		});
		console.log(token);
		if (token !== null) {
			console.log("I got the token: ", token)
			this.setState({
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				id_token: token.id_token,
				expires: token.expires
			});
		}
	}

	async checkIfSignInOrSignUp(){
		// const userDID = utils.getUserDid(this.state.id_token);
		// console.log(userDID);
		//Check if User exists and go to Registration of Profile
		//const user = await this.state.userRedis.get(userDID);
		//console.log(user);
	}

	goToRegistration(){
		const { history } = this.props;
		const { access_token,refresh_token,id_token } = this.state;
		history.push(
			{
			  pathname: '/registration',
			  state: { 
				access_token: access_token,
				refresh_token: refresh_token,
				id_token: id_token
			   }
			}
		  ); 
	}
	goToProfile(){
		const { history } = this.props;
		const { access_token,refresh_token,id_token } = this.state;
		history.push(
			{
			  pathname: '/profile',
			  state: { 
				access_token: access_token,
				refresh_token: refresh_token,
				id_token: id_token
			   }
			}
		  ); 
	}
	


  render() {
	  const {access_token, refresh_token, id_token, expires, signUp} = this.state;
    return (
    <div>
    <Official></Official>
	<Header></Header>
	<div className="page">
      <main className="main">
	  	<p>
        	OAuth2 authorize code flow was performed successfully!
		</p>
		<li>
			<ul><b>Access Token: </b>{access_token}</ul>
			<ul><b>Refresh Token: </b> {refresh_token}</ul>
			<ul><b>ID Token: </b> {id_token}</ul>
			<ul><b>Expires In: </b> {expires}</ul>
		</li>
		{ signUp &&
			<Button type="button" className="register-button" onClick={() =>this.goToRegistration()}>Create the eID in my VIDchain Wallet</Button>
		}
		{ !signUp &&
			<Button type="button" className="register-button" onClick={() =>this.goToProfile()}>Go to your Profile</Button>
		}
		<p>
			<a href="/">Do it again</a>
		</p>
	
	</main>
	</div>
	<div className="footer">
		<Footer></Footer>
	</div>
    
    </div>
    
    );
  }
}

export default Callback;
