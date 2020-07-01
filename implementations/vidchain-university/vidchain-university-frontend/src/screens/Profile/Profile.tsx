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
  sw: boolean,
  bigdata: boolean,
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
      sw: false,
      bigdata: false,
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
    console.log("initiateSocket(): "+ config.BASE_URL);
    const socket = io('/', {
      path: '/universityws',
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

 /* async issueCredential(){

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
    
  }*/

  async claimVP(course:string){
    const presentation: IPresentation = {
		target: this.state.did,
		name: course,
		type: [
			[
				"VerifiableCredential",
				"VerifiableIdCredential"
			]
		],
   }
   console.log("Check presentation:");
   console.log(presentation);
   const token = await vidchain.getAuthzToken();
   const response = await vidchain.requestVP(token, presentation);
   console.log(response)
	//Check response
	if(response !== "Error"){
      if(course == "Software Engineering Degree"){
         this.setState ({
            sw:true
         })
      }else{
         this.setState ({
            bigdata:true
         })
      }
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
    const { did,today, successGeneration, enrolement, credential, sw, bigdata} = this.state;
    return (
      <div>
   <HeaderLogin></HeaderLogin>
   <div className="fullContent">
      <section id="inner-headline">
         <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="pageTitle">Bachelor's</h2>
              </div>
            </div>
         </div>
      </section>
      <section id="content">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="about-logo">
                     <h3>Give a look to our new bachelor's degrees</h3>
                     <p>Here you have the list of bachelor's degrees that you can currently enrol.</p>
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
                           <h4><b>Bachelor's in Software Engineering</b></h4>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Description</h4>
                           <p>The bachelor’s degree in Software Engineering provides the knowledge needed to conceive, design, develop, maintain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation. You will also become an expert in new methods and technologies in the field of ICTs. </p>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Organization</h4>
                           <p>University Of Barcelona</p>
                        </div>
                        <br/>
                        {enrolement && !credential && sw &&
                        <div>
                           <p style={{color: "#00cc00"}}> Open your VIDchain App</p>
                        </div>
                        }
                        {credential && sw &&
                        <h2 style={{color: "#00cc00"}}> You enroled successfully</h2>
                        }
                        <Button type="button" className="collect-button" onClick={() =>this.claimVP("Software Engineering Degree")}><b>Enrol with VIDchain</b></Button>
                     </form>
                     <form action="">
                     </form>
                  </div>
               </div>
               <div className="wrapper">
                  <div className="inner">
                     <div className="image-holder">
                        <img className="imageSoftware" src={require("../../assets/images/bigdata.png")} alt=""/>
                     </div>
                     <form action="">
                        <div className="form-row">
                           <h4><b>Bachelor's in Big Data</b></h4>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Description</h4>
                           <p>The bachelor’s degree in Big Data provides the knowledge needed to deal with collecting large amounts of data and analysing user behaviour. Thanks to this science, information can be then used to draw conclusions, make plans, implement policies and make better, data-driven decisions. </p>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Organization</h4>
                           <p>University Of Barcelona</p>
                        </div>
                        <br/>
                        {enrolement && !credential && bigdata &&
                        <div>
                           <p style={{color: "#00cc00"}}> Open your VIDchain App</p>
                        </div>
                        }
                        {credential && bigdata &&
                        <h2 style={{color: "#00cc00"}}> You enroled successfully</h2>
                        }
                        <Button type="button" className="collect-button" onClick={() =>this.claimVP("Big Data Degree")}><b>Enrol with VIDchain</b></Button>
                     </form>
                     <form action="">
                     </form>
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
