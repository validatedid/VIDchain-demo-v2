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
interface Props {
	AccessToken: string;
	TokenType: string;
	RefreshToken: any;
	IDToken: any;
	Expiry: any;
}
  
interface State {
	
}

class Callback extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			jwt: "",
			did: "",
			firstname: "",
			lastname: "",
			gender: "Male",
			dateOfBirth: "",
			placeOfBirth: "",
			currentAddress: "",
			city: "",
			state: "",
			zip: "",
			checkFields: false,
			successGeneration: false
		}
	}

	componentDidMount(){
		console.log(this.props.AccessToken);
		console.log(this.props.TokenType);
		console.log(this.props.RefreshToken);
		console.log(this.props.IDToken);
		console.log(this.props.Expiry);
	}

	continue(){
		
	}
	


  render() {
    return (
    <div>
    <Official></Official>
	<Header></Header>
	<div className="page">
      <main className="main">
	  	<p>
        	OAuth2 authorize code flow was performed successfully!
		</p>
		<dl>
			{/* <dt>AccessToken</dt>
			<dd><code>{{.AccessToken}}</code></dd>
			<dt>TokenType</dt>
			<dd><code>{{.TokenType}}</code></dd>
			<dt>RefreshToken</dt>
			<dd><code>{{.RefreshToken}}</code></dd>
			<dt>Expiry</dt>
			<dd><code>{{.Expiry}}</code></dd>
			<dt>ID Token</dt>
			<dd><code>{{.IDToken}}</code></dd> */}
		</dl>
		<p>
			<a href="/">Do it again</a>
		</p>
	
	</main>
	</div>
	<Footer></Footer>
    
    </div>
    
    );
  }
}

export default Callback;
