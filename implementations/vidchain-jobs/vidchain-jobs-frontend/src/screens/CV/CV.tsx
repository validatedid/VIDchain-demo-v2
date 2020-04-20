import React, { Component } from "react";
import "./CV.css";
import { Button, Form } from "react-bootstrap";
import * as config from '../../config';
import {fullCredential} from '../../models/Credential';
import axios from 'axios'
import io from 'socket.io-client'

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

class CV extends Component<Props,State> {

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

  async apply(){
    let authorization = {
        headers: {
          Authorization: "Bearer " + this.state.jwt
        }
    };
    let data = fullCredential;
    data.credentialSubject.id = this.state.did;
    data.credentialSubject.learningActivity.endedAtTime = this.state.today;
    console.log(data);
    const response = await axios.post(config.API_URL + "educreds/", data, authorization);
    //Check response
    console.log(response);
    this.sendUserToServer(data);
    this.setState ({
        successGeneration: true
    })

  }
  sendUserToServer(credential: any){
    const socket = io(config.BACKEND_URL);
    socket.emit('registration', JSON.stringify(credential));
  }

  render() {
    const { did,today, successGeneration} = this.state;
    return (
        <div className= "content">
            <nav className="navbar navbar-default navbar-sticky bootsnav">
                <div className="container">      
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                            <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="index.html"><img src={require("../../assets/images/logo.png")} className="logo" alt=""/></a>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                                <li><a href="index.html">Home</a></li> 
                                <li><a href="login.html">Login</a></li>
                                <li><a href="companies.html">Companies</a></li> 
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Browse</a>
                                    <ul className="dropdown-menu animated fadeOutUp" style={{display: "none", opacity: 1}}>
                                        <li className="active"><a href="browse-job.html">Browse Jobs</a></li>
                                        <li><a href="company-detail.html">Job Detail</a></li>
                                        <li><a href="resume.html">Resume Detail</a></li>
                                    </ul>
                                </li>
                            </ul>
                    </div>
                </div>   
                </nav>

                <section className="inner-banner banner">
                <div className="container">
                    <div className="caption">
                        <h2>Apply to a Job</h2>
                        <p>Get your Popular jobs <span>202 New job</span></p>
                    </div>
                </div>
                </section>


                <section className="profile-detail">
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="basic-information">
                                <div className="col-md-3 col-sm-3">
                                <img src={require("../../assets/images/validatedid.png")} alt="" className="img-responsive"/>
                                </div>
                                <div className="col-md-9 col-sm-9">
                                    <div className="profile-content">
                                            <h2>Software Developer<span>Validated ID</span></h2>
                                            <i className="fa fa-map-marker fa-fw"></i> Barcelona
                                            <br/><br/>
                                            <h6>Your Decentralized Indentifier (DID):</h6>
                                            <p>{did}</p>
                                            <Button disabled={successGeneration} type="button" className="collect-button" onClick={() => this.apply()}>Apply for the job</Button>
                                        </div>
                                    </div>
                                {/* <ul className="social">
                                    <li><a href="" className="facebook"><i className="fa fa-facebook"></i>Facebook</a></li>
                                    <li><a href="" className="google"><i className="fa fa-google-plus"></i>Google Plus</a></li>
                                    <li><a href="" className="twitter"><i className="fa fa-twitter"></i>Twitter</a></li>
                                    <li><a href="" className="linkedin"><i className="fa fa-linkedin"></i>Linked In</a></li>
                                    <li><a href="" className="instagram"><i className="fa fa-instagram"></i>Instagram</a></li>
                                </ul> */}
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-user fa-fw"></i> About the company
                                    </div>
                               
                                    <div className="panel-body">
                                    <p>Validated ID was created in 2012 by several enthusiasts from the world of digital ID and electronic signatures. We were never a start-up as such. Between us all we had over 50 years’ experience within the field of ID and signature systems. We knew exactly what we wanted to achieve and where we were starting from. We had worked on countless authentication and signature projects, often complicated in nature, and as a result got to work in deploying services that put simplicity first, whilst maintaining the highest levels of technical and legal security. A clear business plan was drawn up, not merely for a product, but for a service. This, naturally, was challenging in itself.
With the above objectives laid down, we drew upon our years of experience in different areas: cryptography, digital certification, biometry, provision of high availability services, cloud computing, mobility and legal services. We put them all into a cocktail shaker and what was created was what continues to be our star service: VIDsigner Bio. This handwritten electronic signature service is easy to use, easy to integrate and incredibly robust legally.
Over time, new services have been added to VIDsigner that also strive to fulfil the same objectives: VIDsigner Mobile, VIDsigner DNIe, VIDstamp, VIDdelivery y Docusign (vía partnership).
Thanks to the knowledge and efforts of our founders, to date, since 2012, we have successfully maintained growth typical of a bootstrap, improving turnover and consolidating the company.
We have achieved recognition in the market and gathered both a partner and client base that provide us with stability and the drive to continue growing.
We are currently focusing our efforts on the creation of a new ID and signature system applicable to contracts. This system will incorporate various technologies and aim to make life easier for both buyers and sellers. We want to revolutionise the market with something completely new and make it available universally.</p>	
                                    </div>
                                </div>
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-leaf fa-fw"></i> Responsibilities of the job:
                                    </div>
                                                     
                                    <div className="panel-body">
                                    <p>The front end is the part that users see and interact with, includes the User Interface, the animations, and usually a bunch of logic to talk to the backend. It is the visual bit that the user interacts with.</p>	
                                    <ul>
                                        <li>Software testing in a Web Applications/Mobile environment.</li>
                                        <li>Software Test Plans from Business Requirement Specifications for test engineering group.</li>
                                        <li>Software testing in a Web Applications environment.</li>
                                        <li>Translate designs into responsive web interfaces</li>
                                        <li>Software testing in a Web Applications/Mobile environment.</li>
                                        <li>Software testing in a Web Applications environment.</li>
                                        <li>Translate designs into responsive web interfaces</li>
                                        <li>Software Test Plans from Business Requirement Specifications for test engineering group.</li>
                                        <li>Run production tests as part of software implementation; Create, deliver and support test plans for testing group to execute.</li>
                                        <li>Run production tests as part of software implementation; Create, deliver and support test plans for testing group to execute.</li>
                                    </ul>
                                    </div>
                                </div>
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-cog fa-fw"></i> Skills fo the job
                                    </div>
                                                   
                                    <div className="panel-body">
                                    <p>The front end is the part that users see and interact with, includes the User Interface, the animations, and usually a bunch of logic to talk to the backend.</p>	
                                    <span className="service-tag">Blockchain</span>
                                    <span className="service-tag">SSI</span>
                                    <span className="service-tag">Development</span>
                                    <span className="service-tag">App design</span>
                                    <span className="service-tag">IOS Apps</span>
                                    <span className="service-tag">React</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

   
                <footer>
                <div className="container">
                    <div className="col-md-3 col-sm-6">
                        <h4>Featured Job</h4>
                        <ul>
                            <li><a href="#">Browse Jobs</a></li>
                            <li><a href="#">Premium MBA Jobs</a></li>
                            <li><a href="#">Access Database</a></li>
                            <li><a href="#">Manage Responses</a></li>
                            <li><a href="#">Report a Problem</a></li>
                            <li><a href="#">Mobile Site</a></li>
                            <li><a href="#">Jobs by Skill</a></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-3 col-sm-6">
                        <h4>Latest Job</h4>
                        <ul>
                            <li><a href="#">Browse Jobs</a></li>
                            <li><a href="#">Premium MBA Jobs</a></li>
                            <li><a href="#">Access Database</a></li>
                            <li><a href="#">Manage Responses</a></li>
                            <li><a href="#">Report a Problem</a></li>
                            <li><a href="#">Mobile Site</a></li>
                            <li><a href="#">Jobs by Skill</a></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-3 col-sm-6">
                        <h4>Reach Us</h4>
                        <address>
                        <ul>
                        <li>1201, Murakeu Market, QUCH07<br/>
                        United Kingdon</li>
                        <li>Email: Support@job.com</li>
                        <li>Call: 044 123 458 65879</li>
                        <li>Skype: job@skype</li>
                        <li>FAX: 123 456 85</li>
                        </ul>
                        </address>
                    </div>
                    
                    <div className="col-md-3 col-sm-6">
                        <h4>Drop A Mail</h4>
                        <form>
                            <input type="text" className="form-control input-lg" placeholder="Your Name" />
                            <input type="text" className="form-control input-lg" placeholder="Email..." />
                            <textarea className="form-control" placeholder="Message"></textarea>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                    
                    
                </div>
                <div className="copy-right">
                <p>&copy;Copyright 2018 Jober Desk | Design By <a href="https://themezhub.com/">ThemezHub</a></p>
                </div>
                </footer>
            
        </div>
    );
  }
}

export default CV;
