import React, { Component } from 'react';
import './Services.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {Presentation} from "../../interfaces/dtos";
import * as vidchain from "../../apis/vidchain";
import * as config from '../../config';

interface Props {
	user: string;
	location: any;
	history?: any;
}
  
interface State {
	did: string;
	bicingCompleted: boolean;
	hasVerifibleId: boolean;
	error: boolean
}

class Services extends Component<Props,State> {
	constructor(props:any) {
		super(props);
		this.state = {
			did: "",
			bicingCompleted: false,
			hasVerifibleId: false,
			error: false
		}
		this.initiateSocket();	
	}

  componentDidMount(){}

  async claimVP(){
	let sessionDid = sessionStorage.getItem('id') || "";
    const presentation: Presentation = {
		target: sessionDid,
		name: "Bicing",
		type: [
			[
				"VerifiableCredential",
				"VerifiablhasDidCredential"
			]
		],
	}
	const token = await vidchain.getAuthzToken();
	const response = await vidchain.requestVP(token, presentation);
	console.log(response)
	//Check response
	if(response !== "Error"){
		this.setState ({
			bicingCompleted: true
		})
	}
	else{
		this.setState ({
			error: true
		})
	}
  }

  async initiateSocket(){
    console.log("initiateSocket(): "+ config.BACKEND_URL);
    const socket = io('/', {
      path: '/governmentws',
      transports: ['websocket']
    });
    socket.on('presentation', (msg: any) => {
      console.log("socket.on('presentation')");
      console.log(msg);
      this.setState ({
				credential: true
			})
    });
  }

  render() {
	const { did, error, bicingCompleted} = this.state;

		return (
			<div>
			<Official></Official>
			<Header></Header>
			<div className= "content">
				<div className="wrapper">
					<div className="serviceCard">
					<div className="service">
							<h1>Ride the city</h1>
							<br></br>
							<br></br>
							<img src={require("../../assets/images/bicing.svg")} className="service-img" alt="/"/>
							<br></br>
							<br></br>
							<br></br>
							<h5 className="eID-text">Get your Bicing card and start using the bicycle sharing system of Your City. </h5>
							<h5 className="eID-text">You have to provide a presentation of your verifiable credential in order to use this service.</h5>
							{bicingCompleted &&
								<h4>Check you mobile wallet</h4>
							}
							{!bicingCompleted &&
								<button className="custom-button" onClick={() => this.claimVP()}>
									<b>Claim your Card</b>
								</button>
							}
						</div>
					</div>
				</div>
				</div>
			<div className="footer">
			  <Footer></Footer>
			</div>
			</div>
			);
  }
}

export default Services;
