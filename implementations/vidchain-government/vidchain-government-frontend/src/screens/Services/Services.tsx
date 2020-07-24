import React, { Component } from 'react';
import './Services.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {Presentation} from "../../interfaces/dtos";
import * as vidchain from "../../apis/vidchain";
import io from 'socket.io-client';

interface Props {
	user: string;
	location: any;
	history?: any;
}
  
interface State {
	did: string;
	bicingCompleted: boolean;
	libraryCompleted: boolean;
	credential: boolean;
	error: boolean
}

class Services extends Component<Props,State> {
	constructor(props:any) {
		super(props);
		this.state = {
			did: "",
			bicingCompleted: false,
			libraryCompleted: false,
			credential: false,
			error: false
		}
		this.initiateSocket();
	}

  componentDidMount(){
  }

  async claimVP(card:string){
	let sessionDid = sessionStorage.getItem('id') || "";
    const presentation: Presentation = {
		target: sessionDid,
		name: card,
		type: [
			[
				"VerifiableCredential",
				"VerifiableIdCredential"
			]
		],
	}
	const token = await vidchain.getAuthzToken();
	const response = await vidchain.requestVP(token, presentation);
	console.log(response)
	//Check response
	if(response !== "Error"){
		if (card == "Bicing"){
			this.setState ({
				bicingCompleted: true
			})
		}else{
			this.setState ({
				libraryCompleted: true
			})
		}
	}
	else{
		this.setState ({
			error: true
		})
	}
  }

  async initiateSocket(){
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
	const { bicingCompleted, libraryCompleted, credential} = this.state;
		return (
			<div>
			<Official></Official>
			<Header></Header>
			<div className= "content">
			<div className="container">
			<div className="row">
				<div className="services-wrapper">
					<div className="services">
					<div className="service">
							<h1>Ride the city</h1>
							<br></br>
							<br></br>
							<img src={require("../../assets/images/bicing.svg")} className="service-img" alt="/"/>
							<br></br>
							<br></br>
							<br></br>
							<h5 className="eID-text">Get your Bicing card and start using the bicycle sharing system of Government of Freedonia. </h5>
							<br></br>
							<h5 className="eID-text"><i>Remember you have to provide a presentation of your verifiable credential in order to use this service.</i></h5>
							<br></br>
							{bicingCompleted && !credential &&
								<h4>Check your mobile wallet</h4>
							}
							{!bicingCompleted &&
								<button className="custom-button" onClick={() => this.claimVP("Bicing")}>
									<b>Claim your Bicing Card</b>
								</button>							}
							{bicingCompleted && credential && 
								<h2 style={{color: "#00cc00"}}>You are ready to go!</h2>
							}
						</div>
					</div>	
				</div>
				<div className="services-wrapper">
					<div className="services">
					<div className="service">
							<h1>Discover the council library</h1>
							<br></br>
							<br></br>
							<img src={require("../../assets/images/library.png")} className="service-img" alt="/"/>
							<br></br>
							<br></br>
							<br></br>
							<h5 className="eID-text">Get your Library card and discover the library books and ebooks offer.</h5>
							<br></br>
							<h5 className="eID-text"><i>Remember you have to provide a presentation of your verifiable credential in order to use this service.</i></h5>
							<br></br>
							{libraryCompleted && !credential &&
								<h4>Check your mobile wallet</h4>
							}
							{!libraryCompleted &&
								<button className="custom-button" onClick={() => this.claimVP("Library")}>
									<b>Claim your Library Card</b>
								</button>							}
							{libraryCompleted && credential && 
								<h2 style={{color: "#00cc00"}}>You are ready to go!</h2>
							}
						</div>
					</div>
					<br></br><br></br><br></br><br></br><br></br>
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
