import React, { Component } from "react";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";
import { Button, Form } from "react-bootstrap";
import * as config from '../../config';
import {fullCredential} from '../../models/Credential';
import axios from 'axios'
import io from 'socket.io-client'
import * as transform from "../../utils/StringTransformer";
interface Props {
	did: string;
	jwt: string;
	history?: any;
	location: any;
}

interface State {
	jwt: string,
	did: string
  today: string
	successGeneration: boolean
}

class Profile extends Component<Props,State> {

  constructor(props:any) {
		super(props);
		this.state = {
			jwt: "",
			did: "",
      today: "",
      successGeneration: false
		}
  }
  
  componentDidMount(){
    this.getCurrentDay();
		if(this.props.location.state){
			this.setState ({
				did: this.props.location.state.did,
				jwt: this.props.location.state.jwt
      });
      if(this.props.location.state.jwt === undefined){
        this.setState ({
          successGeneration: true
        })
      }
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

  render() {
    const { did,today, successGeneration} = this.state;
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
						<p>{transform.replaceDID(did)}</p>
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
        <Button disabled={successGeneration} type="button" className="collect-button">Collect the eID in my VIDchain Wallet</Button>
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
