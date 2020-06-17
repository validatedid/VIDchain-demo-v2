import React, { Component,Fragment } from 'react';
import './Callback.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { Button, Form, Alert, Row,InputGroup, Col } from "react-bootstrap";
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
	callback: boolean
}

class Callback extends Component<Props,State> {

	constructor(props:any) {
		super(props);

		this.state = {
			access_token: '',
			refresh_token: '',
			id_token: '',
			expires: 0,
			callback: true
		}
		
	}

	async componentDidMount(){
		const { location,history, match } = this.props;
		const params = queryString.parse(location.search);
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
		console.log(token);
		if (token !== null) {
			console.log("I got the token: ", token)
			this.setState({
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				id_token: token.id_token,
				expires: token.expires
			});
		}else {
			console.log("token is null");
		}		
	}

	goToProfile(){
		const { history } = this.props;
		const { access_token,refresh_token,id_token } = this.state;
		const userDID = utils.getUserDid(id_token);
		var user = localStorage.getItem(userDID);
		this.props.history.push(
			{
			  pathname: '/profile',
			  state: { user: user }
			}
		  ); 
	}
	


  render() {
	  const {access_token, refresh_token, id_token, expires} = this.state;
    return (
    <div>
	<Header></Header>
	<div>
	<main>
	  	<p>
        	OAuth2 authorize code flow was performed successfully!
		</p>
		<ul>
			<li><b>Access Token: </b>{access_token}</li>
			<li><b>Refresh Token: </b> {refresh_token}</li>
			<li><b>ID Token: </b> {id_token}</li>
			<li><b>Expires In: </b> {expires}</li>
		</ul>
		<Button type="button" className="register-button" onClick={() =>this.goToProfile()}>Go to your Profile</Button>
		
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
