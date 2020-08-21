import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import io from 'socket.io-client'
import axios from 'axios'
import * as config from '../../config';
import {
  Modal
} from "react-bootstrap";

var QRCode = require('qrcode.react');
interface Props {
	history?: any;
}
  
interface State {
  jwt: string,
  showQR: boolean,
  contentQR: string
}
class Home extends Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      jwt: "",
      showQR: false,
      contentQR: ""
    }
  }

  componentDidMount(){
    console.log(process.env.REACT_APP_BACKEND_URL);
    const socket = io(config.BACKEND_URL)
    socket.on('login', (msg:any) => {
      console.log(msg);
      
      this.props.history.push(
        {
          pathname: '/CV',
          state: { did: msg, jwt: this.state.jwt }
        }
      ); 
    });
    socket.on('access', (msg:any) => {
      console.log(msg);
      var msgParsed = JSON.parse(msg);
      this.props.history.push(
        {
          pathname: '/CV',
          state: { did: msgParsed.credentialSubject.id }
        }
      ); 
    });
    this.startConnection();
  }

  async startConnection(){
    var jwt = await this.connectWithBackend();
    //Check if there is an error
    this.setState({
      jwt: jwt
    });
  }

  async connectWithBackend(){
    let data = {
        enterpriseName: config.Name,
        nonce: config.nonce
    };
    const response = await axios.post(config.API_URL + "token", data);
    return response.data.jwt;
  }

  async loginWithVIDChain(){
    var qrCodeContent = await this.generateContent();
    //Check if there is an error
    console.log(qrCodeContent);
    this.setState({
      contentQR: qrCodeContent,
      showQR: true
    });
  }

  async generateContent(){
    let authorization = {
      headers: {
        Authorization: "Bearer " + this.state.jwt
      }
    };
    let data = {
      issuer: config.DID,
      payload: {
        did: config.DID,
        url: config.BACKEND_URL + "/validate",
        nonce: this.randomIntFromInterval(100000,999999999)
      }
    };
    const response = await axios.post(config.API_URL + "signature", data, authorization);
    return response.data.signatureJWS;
  }
  private randomIntFromInterval(min: number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  closeQR(){
    this.setState({
      showQR: false,
      contentQR: ""
    });
  }



  render() {
    const {showQR, contentQR} = this.state;
    return (
        <div>
          <Modal animation={false} show={showQR} onHide={() => this.closeQR()} className="modal">
          <Modal.Header
            className="ModalHeader"
            closeButton
          >
            <Modal.Title className="ModalTitle">Sign In with VIDchain</Modal.Title>
          </Modal.Header>
          <Modal.Body className="ModalBody">
            <h5> Please  scan the QR code with the VIDchain mobile App </h5><br/>
            <QRCode value={contentQR} size={300}/>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
     <nav className="navbar navbar-default navbar-sticky bootsnav">

      <div className="container">      
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
            <i className="fa fa-bars"></i>
          </button>
          <a className="navbar-brand" href="index.html"><img src={require("../../assets/images/logo.png")} className="logo" alt="" /></a>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
              <li><a href="index.html">Home</a></li> 
              <li><Link to="/login">Login</Link></li>
              <li><a href="companies.html">Companies</a></li> 
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Browse</a>
                <ul className="dropdown-menu animated fadeOutUp">
                  <li className="active"><a href="browse-job.html">Browse Jobs</a></li>
                  <li><a href="company-detail.html">Job Detail</a></li>
                  <li><a href="resume.html">Resume Detail</a></li>
                </ul>
              </li>
            </ul>
        </div>
      </div>   
      </nav>

      <section className="main-banner">
      <div className="container">
        <div className="caption">
          <h2>Build Your Career</h2>
          <form>
            <fieldset>
              <div className="col-md-4 col-sm-4 no-pad">
                <input type="text" className="form-control border-right" placeholder="Skills, Designation, Companies" />
              </div>
              <div className="col-md-3 col-sm-3 no-pad">
                <select className="selectpicker border-right">
                  <option>Experience</option>
                  <option>0 Year</option>
                  <option>1 Year</option>
                  <option>2 Year</option>
                  <option>3 Year</option>
                  <option>4 Year</option>
                  <option>5 Year</option>
                  <option>6 Year</option>
                  <option>7 Year</option>
                  <option>8 Year</option>
                  <option>9 Year</option>
                <option>10 Year</option>
                </select>
              </div>
              <div className="col-md-3 col-sm-3 no-pad">
                <select className="selectpicker">
                  <option>Select Category</option>
                  <option>Accounf & Finance</option>
                  <option>Information & Technology</option>
                  <option>Marketing</option>
                  <option>Food & Restaurent</option>
                </select>
              </div>
              <div className="col-md-2 col-sm-2 no-pad">
                <input type="submit" className="btn seub-btn" value="submit" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      </section>

      <section className="features">
      <div className="container">
        <div className="col-md-4 col-sm-4">
          <div className="features-content">
            <span className="box1"><span aria-hidden="true" className="icon-dial"></span></span>
            <h3>Create An Account</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-4">
          <div className="features-content">
            <span className="box1"><span aria-hidden="true" className="icon-search"></span></span>
            <h3>Search Desired Job</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-4">
          <div className="features-content">
            <span className="box1"><span aria-hidden="true" className="icon-printer"></span></span>
            <h3>Send Your Resume</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-4">
          <div className="features-content">
            <span className="box1"><span aria-hidden="true" className="icon-dial"></span></span>
            <h3>Create An Account</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-4">
          <div className="features-content">
            <span className="box1"><span aria-hidden="true" className="icon-search"></span></span>
            <h3>Search Desired Job</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-4">
          <div className="features-content">
            <span className="box1"><span aria-hidden="true" className="icon-printer"></span></span>
            <h3>Send Your Resume</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua.</p>
          </div>
        </div>

      </div>
      </section>

      <section className="counter">
      <div className="container">
        <div className="col-md-3 col-sm-3">
          <div className="counter-text">
            <span aria-hidden="true" className="icon-briefcase"></span>
            <h3>1000</h3>
            <p>Jobs Posted</p>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-3">
          <div className="counter-text">
            <span className="box1"><span aria-hidden="true" className="icon-expand"></span></span>
            <h3>207</h3>
            <p>All Companies</p>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-3">
          <div className="counter-text">
            <span className="box1"><span aria-hidden="true" className="icon-profile-male"></span></span>
            <h3>700+</h3>
            <p>Total Members</p>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-3">
          <div className="counter-text">
          <span className="box1"><span aria-hidden="true" className="icon-sad"></span></span>
            <h3>802+</h3>
            <p>Happy Members</p>
          </div>
        </div>
      </div>
      </section>

      <section className="jobs">
      <div className="container">
        <div className="row heading">
          <h2>Find Popular Jobs</h2>
          <p>Click on the job you want to apply, and login with your mobile wallet</p>
        </div>
        <div className="companies">
        <div className="company-list">
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <div className="company-logo">
                  <img src={require("../../assets/images/validatedid.png")} className="img-responsive" alt="" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="company-content">
                  <h3>Software developer<span className="full-time">Full Time</span></h3>
                  <p><span className="company-name"><i className="fa fa-briefcase"></i>Validated ID</span><span className="company-location"><i className="fa fa-map-marker"></i> C/ Aragó 179, Barcelona, Spain</span><span className="package"><i className="fa fa-money"></i>$24,000-$52,000</span></p>
                </div>
              </div>
              <div className="sign_in_vidchain">
                  <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Apply with ViDChain</a>
              </div>
            </div>
          </div>

          <div className="company-list">
            <div className="row">

              <div className="col-md-2 col-sm-2">
                <div className="company-logo">
                  <img src={require("../../assets/images/google.png")} className="img-responsive" alt="" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="company-content">
                  <h3>IOS Developer<span className="internship">Internship</span></h3>
                  <p><span className="company-name"><i className="fa fa-briefcase"></i>Google</span><span className="company-location"><i className="fa fa-map-marker"></i> 07th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money"></i>$22,000-$50,000</span></p>
                </div>
              </div>
              <div className="sign_in_vidchain special">
                  <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Apply with ViDChain</a>
              </div>
            </div>
          </div>
          
          <div className="company-list">
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <div className="company-logo">
                  <img src={require("../../assets/images/microsoft.png")} className="img-responsive" alt="" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="company-content">
                  <h3>Back-End developer<span className="part-time">Part Time</span></h3>
                  <p><span className="company-name"><i className="fa fa-briefcase"></i>Microsoft</span><span className="company-location"><i className="fa fa-map-marker"></i> 7th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money"></i>$20,000-$52,000</span></p>
                </div>
                
              </div>
              <div className="sign_in_vidchain special">
                  <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Apply with ViDChain</a>
              </div>
            </div>
          </div>
          
          <div className="company-list">
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <div className="company-logo">
                  <img src={require("../../assets/images/apple.png")} className="img-responsive" alt="" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="company-content">
                  <h3>UI/UX Designer<span className="freelance">Freelance</span></h3>
                  <p><span className="company-name"><i className="fa fa-briefcase"></i>Apple</span><span className="company-location"><i className="fa fa-map-marker"></i> 7th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money"></i>$22,000-$50,000</span></p>
                </div>
              </div>
              <div className="sign_in_vidchain special">
                  <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Apply with ViDChain</a>
              </div>
            </div>
          </div>
        
          
          <div className="company-list">
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <div className="company-logo">
                  <img src={require("../../assets/images/twitter.png")} className="img-responsive" alt="" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="company-content">
                  <h3>Marketing Holder<span className="full-time">Full Time</span></h3>
                  <p><span className="company-name"><i className="fa fa-briefcase"></i>Twitter</span><span className="company-location"><i className="fa fa-map-marker"></i> 4th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money"></i>$24,000-$48,000</span></p>
                </div>
              </div>
            </div>
            <div className="sign_in_vidchain">
                  <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Apply with ViDChain</a>
              </div>
          </div>
        </div>
        <div className="row">
          <input type="button" className="btn brows-btn" value="Brows All Jobs" />
        </div>
      </div>
      </section>

      <section className="testimonials dark">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="testimonial-slider" className="owl-carousel">
              <div className="testimonial">
                <div className="pic">
                  <img src={require("../../assets/images/client-1.jpg")} alt="" />
                </div>
                <p className="description">
                  " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                </p>
                <h3 className="testimonial-title">williamson</h3>
                <span className="post">Web Developer</span>
              </div>

              <div className="testimonial">
                <div className="pic">
                  <img src={require("../../assets/images/client-2.jpg")} alt="" />
                </div>
                <p className="description">
                  " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                </p>
                <h3 className="testimonial-title">kristiana</h3>
                <span className="post">Web Designer</span>
              </div>
              
              <div className="testimonial">
                <div className="pic">
                  <img src={require("../../assets/images/client-3.jpg")} alt="" />
                </div>
                <p className="description">
                  " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                </p>
                <h3 className="testimonial-title">kristiana</h3>
                <span className="post">Web Designer</span>
              </div>
              
              <div className="testimonial">
                <div className="pic">
                  <img src={require("../../assets/images/client-4.jpg")} alt="" />
                </div>
                <p className="description">
                  " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                </p>
                <h3 className="testimonial-title">kristiana</h3>
                <span className="post">Web Designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      <section className="pricind">
      <div className="container">
        <div className="col-md-4 col-sm-4">
          <div className="package-box">
            <div className="package-header">
              <i className="fa fa-cog" aria-hidden="true"></i>
              <h3>Professional</h3>
            </div>
            <div className="package-info">
              <ul>
              <li>3 Designs</li>
              <li>3 PSD Designs</li>
              <li>4 color Option</li>
              <li>10GB Disk Space</li>
              <li>Full Support</li>
              </ul>
            </div>
            <div className="package-price">
              <h2><sup>$ </sup>10<sub>/Month</sub></h2>
            </div>
            <button type="submit" className="btn btn-package">Sign Up</button>
          </div>
        </div>
        <div className="col-md-4 col-sm-4">
          <div className="package-box">
            <div className="package-header">
              <i className="fa fa-star-half-o" aria-hidden="true"></i>
              <h3>Standard</h3>
            </div>
            <div className="package-info">
              <ul>
              <li>3 Designs</li>
              <li>3 PSD Designs</li>
              <li>4 color Option</li>
              <li>10GB Disk Space</li>
              <li>Full Support</li>
              </ul>
            </div>
            <div className="package-price">
              <h2><sup>$ </sup>110<sub>/Month</sub></h2>
            </div>
            <button type="submit" className="btn btn-package">Sign Up</button>
          </div>
        </div>
        <div className="col-md-4 col-sm-4">
          <div className="package-box">
            <div className="package-header">
              <i className="fa fa-cube" aria-hidden="true"></i>
              <h3>Premium</h3>
            </div>
            <div className="package-info">
              <ul>
              <li>3 Designs</li>
              <li>3 PSD Designs</li>
              <li>4 color Option</li>
              <li>10GB Disk Space</li>
              <li>Full Support</li>
              </ul>
            </div>
            <div className="package-price">
              <h2><sup>$ </sup>170<sub>/Month</sub></h2>
            </div>
            <button type="submit" className="btn btn-package">Sign Up</button>
          </div>
        </div>
      </div>
      </section>

      <section className="membercard dark">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="left-widget-sidebar">
              <div className="card-widget bg-white user-card">
                <div className="u-img img-cover img-style"></div>
                <div className="u-content">
                  <div className="avatar box-80">
                    <img className="img-responsive img-circle img-70 shadow-white" src={require("../../assets/images/avatar3.jpg")} alt="" />
                    <i className="fa fa-circle-o fa-green"></i>
                  </div>
                  <h5>Sazzel Shi</h5>
                  <p className="text-muted">UX/ Designer</p>
                </div>
                <div className="user-social-profile">
                  <ul>
                    <li><a href=""><i className="fa fa-facebook"></i></a></li>
                    <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                    <li><a href=""><i className="fa fa-twitter"></i></a></li>
                    <li><a href=""><i className="fa fa-instagram"></i></a></li>
                    <li><a href=""><i className="fa fa-linkedin"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="left-widget-sidebar">
              <div className="card-widget bg-white user-card">
                <div className="u-img img-cover img-style2"></div>
                <div className="u-content">
                  <div className="avatar box-80">
                    <img className="img-responsive img-circle img-70 shadow-white" src={require("../../assets/images/avatar2.jpg")} alt="" />
                    <i className="fa fa-circle-o fa-green"></i>
                  </div>
                  <h5>Daniel Dezox</h5>
                  <p className="text-muted">CEO Founder</p>
                </div>
                <div className="user-social-profile">
                  <ul>
                    <li><a href=""><i className="fa fa-facebook"></i></a></li>
                    <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                    <li><a href=""><i className="fa fa-twitter"></i></a></li>
                    <li><a href=""><i className="fa fa-instagram"></i></a></li>
                    <li><a href=""><i className="fa fa-linkedin"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="left-widget-sidebar">
              <div className="card-widget bg-white user-card">
                <div className="u-img img-cover img-style3"></div>
                <div className="u-content">
                  <div className="avatar box-80">
                    <img className="img-responsive img-circle img-70 shadow-white" src={require("../../assets/images/avatar1.jpg")} alt="" />
                    <i className="fa fa-circle-o fa-green"></i>
                  </div>
                  <h5>Silp Sizzer</h5>
                  <p className="text-muted">Human Resource</p>
                </div>
                <div className="user-social-profile">
                  <ul>
                    <li><a href=""><i className="fa fa-facebook"></i></a></li>
                    <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                    <li><a href=""><i className="fa fa-twitter"></i></a></li>
                    <li><a href=""><i className="fa fa-instagram"></i></a></li>
                    <li><a href=""><i className="fa fa-linkedin"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>


      <section className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
          <h2>Want More Job & Latest Job? </h2>
          <p>Subscribe to our mailing list to receive an update when new Job arrive!</p>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Type Your Email Address..." />
            <span className="input-group-btn">
              <button type="button" className="btn btn-default">subscribe!</button>
            </span>
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
          <li>1201, Murakeu Market, QUCH07<br />
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

export default Home;
