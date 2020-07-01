import React, { Component } from "react";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Footer from "../../components/Footer/Footer";
import "./Diploma.css";
import { Button, Form } from "react-bootstrap";
import * as utils from "../../utils/utils";
import { ICredentialData } from "../../interfaces/ICredentialData";
import * as vidchain from "../../apis/vidchain";
import { ICredentialSubject } from "../../interfaces/ICredentialSubject";

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
class Diploma extends Component<Props,State> {

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
  }
  
  componentDidMount(){
    this.getCurrentDay();
		if(this.props.location.state){
			this.setState ({
				access_token: this.props.location.state.access_token,
				refresh_token: this.props.location.state.refresh_token,
				id_token: this.props.location.state.id_token,
            did: utils.getUserDid(this.props.location.state.id_token),
            sw: this.props.location.state.sw,
            bigdata:this.props.location.state.bigdata,
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

 async issueCredential(){
    let degreeName;
    
    if (this.state.sw){
      degreeName = "Software Engineering Degree";
    } else {
      degreeName = "Big Data Degree";
    }

    let subject:ICredentialSubject = {
      id: this.state.did,
      university: "University of Barcelona - Computer Science Department",
      degree: degreeName,
      date: this.state.today,
    };

    const token = await vidchain.getAuthzToken();

    let credentialBody:ICredentialData = {
      type: ['VerifiableCredential','EuropassCredential'],
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
                   <h2 className="pageTitle">Collect your diploma</h2>
                 </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="about-logo">
                        <h3>Congratulations for your achievenments!</h3>
                        <p>Here you can request your eDiploma credential.</p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="wrapper">
                     <div className="inner">
                        <div className="image-holder">
                           {sw && 
                           <img className="imageSoftware" src={require("../../assets/images/software_engineer.png")} alt=""/>
                           }
                           {bigdata && 
                           <img className="imageSoftware" src={require("../../assets/images/bigdata.png")} alt=""/>
                           }
                        </div>
                        <form action="">
                           <div className="form-row">
                           {sw && 
                           <h4><b>Bachelor's in Software Engineering eDiploma</b></h4>
                           }
                           {bigdata && 
                           <h4><b>Bachelor's in Big Data eDiploma</b></h4>
                           }
                           </div>
                           <br/>
                           <div className="form-row">
                              <h4>Description</h4>
                              {sw && 
                              <p>This electronic diploma proofs you have successfully finished the Bachelor’s degree in Software Engineering which provides the knowledge needed to conceive, design, develop, maintain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation. You will also become an expert in new methods and technologies in the field of ICTs. </p>
                              }
                              {bigdata && 
                              <p>This electronic diploma proofs you have successfully finished the Bachelor’s degree in Big Data which demonstrates you have the knowledge needed to deal with collecting large amounts of data and analysing user behaviour. Thanks to this science, information can be then used to draw conclusions, make plans, implement policies and make better, data-driven decisions. </p>
                              }
                           </div>
                           <br/>
                           <div className="form-row">
                              <h4>Issuer</h4>
                              <p>University of Barcelona - Computer Science Department</p>
                           </div>
                           <br/>
                           <div className="form-row">
                              <h4>Completed at:</h4>
                              <p>{today}</p>
                           </div>
                           <br/>
                           {successGeneration && 
                           <div>
                              <p style={{color: "#00cc00"}}> Check your VIDchain App</p>
                           </div>
                           }
                           <Button type="button" className="collect-button" onClick={() =>this.issueCredential()}><b>Get your credential</b></Button>
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

export default Diploma;
