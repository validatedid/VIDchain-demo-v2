import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import io from 'socket.io-client'
import axios from 'axios'
import * as config from '../../config';
import {
  Modal
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

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
    console.log(process.env.REACT_APP_BACKEND_URL
      );
    const socket = io(config.BACKEND_URL)
    socket.on('login', (msg:any) => {
      console.log(msg);
      this.props.history.push(
        {
          pathname: '/registration',
          state: { did: msg, jwt: this.state.jwt }
        }
      ); 
    });
    socket.on('access', (msg:any) => {
      console.log(msg);
      this.props.history.push(
        {
          pathname: '/profile',
          state: { user: msg }
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

    //this.props.history.push("/registration"); 
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
    console.log(showQR);
    return (
    <div>
      <Modal show={showQR} onHide={() => this.closeQR()} className="modal">
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

    {/* <Official></Official> */}
    <Header></Header>
    <div className="App">
      <div id="wrapper" className="home-page">
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="pull-left hidden-xs">Barcelona University</p>
                <p className="pull-right"><i className="fa fa-phone"></i>Tel No. (+001) 123-456-789</p>
              </div>
            </div>
          </div>
        </div>

        <header>
              <div className="navbar navbar-default navbar-static-top">
                  <div className="container">
                      <div className="navbar-header">
                          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                          </button>
                          <a className="navbar-brand" href="index.html"><img src={require("../../assets/images/logo.png")} alt="logo"/>University of Barcelona</a>
                      </div>
                      <div className="navbar-collapse collapse ">
                          <ul className="nav navbar-nav">
                              <li className="active"><a href="index.html">Home</a></li> 
                  <li className="dropdown">
                              <a href="#" data-toggle="dropdown" className="dropdown-toggle">About Us <b className="caret"></b></a>
                              <ul className="dropdown-menu">
                                  <li><a href="about.html">Our Institute</a></li>
                                  <li><a href="#">Our Team</a></li>
                                  <li><a href="#">News</a></li> 
                                  <li><a href="#">Investors</a></li>
                              </ul>
                          </li> 
                  <li><a href="courses.html">Courses</a></li>
                              <li><a href="portfolio.html">Portfolio</a></li>
                              <li><a href="pricing.html">Fees</a></li>
                              <li><a href="contact.html">Contact</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
        </header>
        
        <section id="banner">
              <div id="main-slider" className="flexslider">
                  <ul className="slides">
                    <li>
                      <img src={require("../../assets/images/slides/1.jpg")} alt="" />
                      <div className="flex-caption">
                          <h3>Quality Education</h3> 
                <p>We Teach Students for Sucessful Fututre</p> 
                
                      </div>
                    </li>
                    <li>
                      <img src={require("../../assets/images/slides/2.jpg")} alt="" />
                      <div className="flex-caption">
                          <h3>Learn to be Sucessful</h3> 
                <p>Lorem ipsum dolo amet, consectetur  provident.</p> 
                
                      </div>
                    </li>
                  </ul>
              </div>
        </section> 

        <section id="call-to-action-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-11">
                <h3>Welcome to the Univesity of Barcelona</h3>
                <p>Sign In to access to your profile and handle your credentials</p>
              </div>
            </div>
            <div className="row">
              <Content></Content>
            </div>
          </div>
        </section>
          
        <section id="content">
          <div className="container">
                <div className="row">
              <div className="col-md-12">
                <div className="aligncenter"><h2 className="aligncenter">Courses</h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident, doloribus omnis minus ovident, doloribus omnis minus temporibus perferendis nesciunt..</div>
                <br/>
              </div>
            </div>
              <div className="row">
            <div className="skill-home"> <div className="skill-home-solid clearfix"> 
            <div className="col-md-3 text-center">
            <span className="icons c1"><i className="fa fa-book"></i></span> <div className="box-area">
            <h3>Vocational Courses</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p></div>
            </div>
            <div className="col-md-3 text-center"> 
            <span className="icons c2"><i className="fa fa-users"></i></span> <div className="box-area">
            <h3>MassComm Courses</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p></div>
            </div>
            <div className="col-md-3 text-center"> 
            <span className="icons c3"><i className="fa fa-trophy"></i></span> <div className="box-area">
            <h3>Accounts</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p></div>
            </div>
            <div className="col-md-3 text-center"> 
            <span className="icons c4"><i className="fa fa-globe"></i></span> <div className="box-area">
            <h3>Business Management</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p>
            </div></div>
            </div></div>
            </div> 
          

          </div>
        </section>
          
        <section className="section-padding gray-bg">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title text-center">
                    <h2>Our Institute</h2>
                    <p>Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada Pellentesque <br/>ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="about-text">
                    <p>Grids is a responsive Multipurpose Template. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.</p>

                    <ul className="withArrow">
                      <li><span className="fa fa-angle-right"></span> Lorem ipsum dolor sit amet</li>
                      <li><span className="fa fa-angle-right"></span> consectetur adipiscing elit</li>
                      <li><span className="fa fa-angle-right"></span> Curabitur aliquet quam id dui</li>
                      <li><span className="fa fa-angle-right"></span> Donec sollicitudin molestie malesuada.</li>
                    </ul>
                    <a href="#" className="btn btn-primary">Learn More</a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="about-image">
                    <img src={require("../../assets/images/about.jpg")} alt="About Images" />
                  </div>
                </div>
              </div>
            </div>
        </section>	  
          
        <div className="about home-about">
                <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="block-heading-two">
                          <h3><span>Programes</span></h3>
                        </div>
                        <p>Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur. <br/><br/>Sed ut perspiciaatis iste natus error sit voluptatem probably haven't heard of them accusamus.</p>
                      </div>
                      <div className="col-md-4">
                        <div className="block-heading-two">
                          <h3><span>Latest News</span></h3>
                        </div>
                        <div className="panel-group" id="accordion-alt3">
                          <div className="panel">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseOne-alt3">
                              <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 1
                              </a>
                            </h4>
                          </div>
                          <div id="collapseOne-alt3" className="panel-collapse collapse">
                            <div className="panel-body">
                              Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                            </div>
                          </div>
                          </div>
                          <div className="panel">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseTwo-alt3">
                              <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 2
                              </a>
                            </h4>
                          </div>
                          <div id="collapseTwo-alt3" className="panel-collapse collapse">
                            <div className="panel-body">
                              Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                            </div>
                          </div>
                          </div>
                          <div className="panel">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseThree-alt3">
                              <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 3
                              </a>
                            </h4>
                          </div>
                          <div id="collapseThree-alt3" className="panel-collapse collapse">
                            <div className="panel-body">
                              Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                            </div>
                          </div>
                          </div>
                          <div className="panel">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseFour-alt3">
                              <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 4
                              </a>
                            </h4>
                          </div>
                          <div id="collapseFour-alt3" className="panel-collapse collapse">
                            <div className="panel-body">
                              Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="timetable">
                          <h3><span className="fa fa-clock-o"></span> Time Table</h3>
                          <hr/> 
                          <dl>
                          <dt>Monday - Friday:</dt>
                          <dd>9am-3pm</dd>
                          </dl>
                          <dl>
                          <dt>Saturday:</dt>
                          <dd>9am-1pm</dd>
                          </dl>  
                          <h4>Music Classes</h4>
                          <dl>
                          <dt>Saturday:</dt>
                          <dd>2pm-5pm</dd>
                          </dl>  
                        </div>
                      </div>
                      
                    </div>
                    
                                
                    
                    <br/>
                  
            </div>
            
          </div>
                  
                  

          <footer>
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="widget">
                    <h5 className="widgetheading">Our Contact</h5>
                    <address>
                    <strong>Barcelona University company Inc</strong><br/>
                    JC Main Road<br/>
                    Barcelona.</address>
                    <p>
                      <i className="icon-phone"></i> (123) 456-789 - 1255-12584 <br/>
                      <i className="icon-envelope-alt"></i> email@barcelonauniversity.com
                    </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="widget">
                  <h5 className="widgetheading">Quick Links</h5>
                  <ul className="link-list">
                    <li><a href="#">Latest Events</a></li>
                    <li><a href="#">Terms and conditions</a></li>
                    <li><a href="#">Privacy policy</a></li>
                    <li><a href="#">Career</a></li>
                    <li><a href="#">Contact us</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="widget">
                  <h5 className="widgetheading">Latest posts</h5>
                  <ul className="link-list">
                    <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
                    <li><a href="#">Pellentesque et pulvinar enim. Quisque at tempor ligula</a></li>
                    <li><a href="#">Natus error sit voluptatem accusantium doloremque</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="widget">
                  <h5 className="widgetheading">Recent News</h5>
                  <ul className="link-list">
                    <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
                    <li><a href="#">Pellentesque et pulvinar enim. Quisque at tempor ligula</a></li>
                    <li><a href="#">Natus error sit voluptatem accusantium doloremque</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="sub-footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="copyright">
                    <p>
                      <span>&copy; Cambridge 2018 All right reserved. <br/></span> This <a href="http://webthemez.com/free-bootstrap-templates" target="_blank">Free Bootstrap Template</a> provided by WebThemez.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <ul className="social-network">
                    <li><a href="#" data-placement="top" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#" data-placement="top" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#" data-placement="top" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="#" data-placement="top" title="Pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li><a href="#" data-placement="top" title="Google plus"><i className="fa fa-google-plus"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </footer>
        </div>
        <a href="#" className="scrollup"><i className="fa fa-angle-up active"></i></a>
    </div>
    
    <div className="footer">
      <Footer></Footer>
    </div>

    </div>
    
    );
  }
}

export default Home;
