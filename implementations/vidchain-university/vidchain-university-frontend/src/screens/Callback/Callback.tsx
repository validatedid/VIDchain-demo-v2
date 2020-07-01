import React, { Component,Fragment } from 'react';
import './Callback.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button, Form, Alert, Row,InputGroup, Col } from "react-bootstrap";
import { OpenIDClient } from '../../libs/openid-connect/client';
import queryString from "query-string";
import { Redirect } from 'react-router-dom';

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
		if (token !== null) {
			console.log("I got the token: ", token)
			this.setState({
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				id_token: token.id_token,
				expires: token.expires
			});
			this.goToProfile()
		}else {
			console.log("token is null");
		}		
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
		const {access_token, refresh_token, id_token, expires} = this.state;
		if (access_token != null) {
			return (<div></div>);
		} else {
			return (<Redirect to='/'/>);
		}
	}
}

export default Callback;
