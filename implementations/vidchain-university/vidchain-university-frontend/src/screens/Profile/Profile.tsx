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
import { Redirect } from "react-router-dom";

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
  
  getDiploma(){
   const { history } = this.props;
   const { access_token,refresh_token,id_token, sw, bigdata } = this.state;
   history.push(
      {
        pathname: '/diploma',
        state: { 
         access_token: access_token,
         refresh_token: refresh_token,
         id_token: id_token,
         sw: sw,
         bigdata: bigdata
         }
      }
     ); 
}
  render() {
    const { did,today, successGeneration, enrolement, credential, sw, bigdata} = this.state;
    let swbutton, bdbutton;
    swbutton = <Button type="button" className="collect-button" onClick={() =>this.claimVP("Software Engineering Degree")}><b>Enrol with VIDchain</b></Button>
    bdbutton = <Button type="button" className="collect-button" onClick={() =>this.claimVP("Big Data Degree")}><b>Enrol with VIDchain</b></Button>

    if (enrolement && credential) {
      if(sw){
         swbutton =  <Button type="button" className="collect-button" onClick={() => this.getDiploma()}><b>Collect your diploma</b></Button>
      }else{
         bdbutton =  <Button type="button" className="collect-button" onClick={() => this.getDiploma()}><b>Collect your diploma</b></Button>
      }
    } 
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
                           <p>University of Barcelona - Computer Science Department</p>
                        </div>
                        <br/>
                        {enrolement && !credential && sw &&
                        <div>
                           <p style={{color: "#00cc00"}}> Check your VIDchain App</p>
                        </div>
                        }
                        {credential && sw &&
                        <h2 style={{color: "#00cc00"}}> You have successfully enrolled </h2>
                        }
                        {swbutton}
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
                           <p>University of Barcelona - Computer Science Department</p>
                        </div>
                        <br/>
                        {enrolement && !credential && bigdata &&
                        <div>
                           <p style={{color: "#00cc00"}}> Check your VIDchain App</p>
                        </div>
                        }
                        {credential && sw &&
                        <h2 style={{color: "#00cc00"}}> You have successfully enrolled </h2>
                        }
                        {bdbutton}
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
