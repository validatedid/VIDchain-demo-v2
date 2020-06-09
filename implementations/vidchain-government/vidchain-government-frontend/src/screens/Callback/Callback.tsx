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
import * as transform from "../../utils/StringTransformer";
import { OpenIDClient } from '../../libs/openid-connect/client';
import queryString from "query-string";
import { withRouter } from "react-router";

interface Props {
	history:any;
	location: any;
	match: any
}
  
interface State {
	access_token: string,
	refresh_token: string,
	id_token: string,
	expires: number
}

class Callback extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			access_token: '',
			refresh_token: '',
			id_token: '',
			expires: 0
		}
	}

	async componentDidMount(){
		const { location, history, match } = this.props;
		console.log("in");
		const params = queryString.parse(location.search);
		var client = OpenIDClient.getInstance().getClient();
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
				expires: token.expires
			});
		}
	}

	goToRegistration(){
		const { location } = this.props;
		const params = queryString.parse(location.search);
		this.props.history.push(
			{
			  pathname: '/registration',
			  state: { code: params.code }
			}
		  ); 
	}
	


  render() {
	  const {access_token, refresh_token, id_token, expires} = this.state;
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
		<Button type="button" className="register-button" onClick={() =>this.goToRegistration()}>Create the eID in my VIDchain Wallet</Button>
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
