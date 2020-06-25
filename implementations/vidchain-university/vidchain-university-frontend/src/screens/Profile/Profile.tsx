import React, { Component } from "react";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";
import { Button, Form } from "react-bootstrap";
import * as utils from "../../utils/utils";
import { ICredentialData } from "../../interfaces/ICredentialData";
import * as vidchain from "../../apis/vidchain";
import { ICredentialSubject } from "../../interfaces/ICredentialSubject";
import { IPresentation } from "../../interfaces/IPresentation";
import io from 'socket.io-client';
import * as config from '../../config';

interface Props {
	did: string;
	jwt: string;
	history?: any;
	location: any;
}

interface State {
	access_token: string,
	refresh_token: string,
	id_token: string,
  did: string,
  today: string,
  successGeneration: boolean,
  enrolement: boolean,
  credential: boolean,
  error: boolean
}

class Profile extends Component<Props,State> {

  constructor(props:any) {
		super(props);
		this.state = {
			access_token: "",
			refresh_token: "",
			id_token: "",
      did: "",
      today: "",
      successGeneration: false,
      enrolement: false,
      credential: false,
      error: false
    }
    this.initiateSocket();	
  }
  
  componentDidMount(){
    this.getCurrentDay();
		if(this.props.location.state){
			this.setState ({
				access_token: this.props.location.state.access_token,
				refresh_token: this.props.location.state.refresh_token,
				id_token: this.props.location.state.id_token,
        did: utils.getUserDid(this.props.location.state.id_token),
      });
    }
  }
  
  getCurrentDay(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.setState ({
      today: dd + '/' + mm + '/' + yyyy
    });
  }
  
  async initiateSocket(){
    console.log("initiateSocket(): "+ config.BACKEND_URL);
    //const socket = io(config.BACKEND_URL);
    const socket = io('https://dev.api.vidchain.net', {
      path: '/universitybackenddemo'
    });
    socket.emit("client working");
    socket.on('presentation', (msg: any) => {
      console.log("socket.on('presentation')");
      console.log(msg);
      this.setState ({
				credential: true
			})
    });
  }

  async issueCredential(){

    let subject:ICredentialSubject = {
      id: this.state.did,
      firstName: "Mauro",
      lastName: "Lucchini",
      university: "UPC",
      degree: "Telecos",
      date: "Jan 2018",
    };

    const token = await vidchain.getAuthzToken();

    let credentialBody:ICredentialData = {
      type: "['VerifiableCredential','EuropassCredential']",
      issuer: utils.getIssuerDid(token),
      id: this.state.did,
      credentialSubject: subject,
    };

    const response = await vidchain.generateVerifiableCredential(token, credentialBody);
		if(response !== "Error"){
			this.setState ({
				successGeneration: true
			})
		} else{
			this.setState ({
				error: true
			})
		}
    
  }

  async claimVP(){
    const presentation: IPresentation = {
		target: this.state.did,
		name: "ITSecurityDegree",
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
		this.setState ({
			enrolement: true
		})
	}
	else{
		this.setState ({
			error: true
		})
  }
  
  }
  render() {
    const { did,today, successGeneration, enrolement, credential} = this.state;
    return (
      <div>
        <HeaderLogin></HeaderLogin>
        <div className="fullContent">
        <section id="inner-headline">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="pageTitle">My Profile</h2>
              </div>
            </div>
          </div>
        </section>
        <section id="content">
          <div className="container">	 
            <div className="row"> 
                      <div className="col-md-12">
                        <div className="about-logo">
                          <h3>Request your Software Engineer eID Diploma</h3>
                          <p>This is your student profile section, where you can find your personal data from the University, as well as the completed degrees.</p>
                          <p>In this section, you can also download your completed education degree in your wallet.</p>
                        </div>  
                      </div>
                    </div>
            <div className="row">
            <div className="wrapper">
              <div className="inner">
                <div className="image-holder">
                  <img className="imageSoftware" src={require("../../assets/images/software_engineer.png")} alt=""/>
                </div>
                <form action="">
                  <div className="form-row">
                    <h4>Your Decentralized Indentifier (DID):</h4>
                    <p>{did}</p>
                  </div><br/>
                  <div className="form-row">
                    <h4>Title</h4>
                    <p>Degree in Software Engineering</p>
                  </div><br/>
                  <div className="form-row">
                    <h4>Description</h4>
                    <p>The bachelor’s degree in Software Engineering provides the knowledge needed to conceive, design, develop, maintain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation. You will also become an expert in new methods and technologies in the field of ICTs. </p>
                  </div><br/>
                  <div className="form-row">
                    <h4>Organization</h4>
                    <p>University Of Barcelona</p>
                  </div><br/>
                  <div className="form-row">
                    <h4>Completed at:</h4>
                    <p>{today}</p>
                  </div><br/>
                {successGeneration &&
                  <div>
                    <h2 style={{color: "#00cc00"}}> The VC has been successfully issued </h2>
                    <p style={{color: "#00cc00"}}> Open your VIDchain App</p>
                  </div>
                }
                <Button type="button" className="collect-button" onClick={() =>this.issueCredential()}>Collect the eID in my VIDchain Wallet</Button>
                </form>
                <form action="">
        </form>
			</div>
    </div>
            </div>
            <div className="row">
              <h1>Keep pushing</h1>
			  <div className="services">
				<div className="service">
					<img src={require("../../assets/images/security.svg")} className="service-img" alt=""/>
					<h1>Get enrolled to the latest new IT Security degree</h1>
					<h5 className="eID-text">You will need to have a eID Verifiable Credential to enrol this new brand course and become a security expert.</h5>
					{enrolement && !credential &&
						<h4>Check your mobile wallet</h4>
					}
          {credential &&
						<h2 style={{color: "#00cc00"}}> You could enrol successfully </h2>
					}
					{!enrolement &&
						<button className="custom-button" onClick={() => this.claimVP()}>
							<b>Enrol</b>
						</button>
					}
				</div>
        </div>
            </div>
          </div>
        </section>
        </div>
       	<Footer></Footer>
      </div>
    );
  }
}

export default Profile;
