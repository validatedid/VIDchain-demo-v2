import React, { Component,Fragment } from 'react';
import './Callback.css';
import * as utils from "../../utils/utils";
import { OpenIDClient } from '../../libs/openid-connect/client';
import queryString from "query-string";
import * as governmentBackend from "../../apis/governmentBackend";
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
	signUp: boolean,
	callback: boolean,
	user: any
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
			callback: true,
			user: ""
		}
		
	}

	async componentDidMount(){
		const { location,history, match } = this.props;
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
				expires: token.expires,
			});
			this.goToProfile();
		}
	}

	goToProfile(){
		const { history } = this.props;
		const { access_token,refresh_token,id_token,user } = this.state;
		this.props.history.push(
			{
			  pathname: '/profile',
			  state: { 
				access_token: access_token,
				refresh_token: refresh_token,
				id_token: id_token,
			 }
			}
		  ); 
	}

  render() {
	const {access_token, refresh_token, id_token, expires, signUp} = this.state;
    if (access_token != null) {
			return (<div></div>);
		} else {
			return (<Redirect to='/'/>);
		}
   }
}

export default Callback;
