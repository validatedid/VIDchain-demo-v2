import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import Banner from '../../components/Banner/Banner';
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
    console.log(process.env.REACT_APP_BACKEND_URL);
    const socket = io(config.BACKEND_URL)
    socket.on('login', (msg:any) => {
      console.log(msg);
      this.props.history.push(
        {
          pathname: '/profile',
          state: { did: msg, jwt: this.state.jwt }
        }
      ); 
    });
    socket.on('access', (msg:any) => {
      console.log(msg);
      var msgParsed = JSON.parse(msg);
      this.props.history.push(
        {
          pathname: '/profile',
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
    <Header></Header>
    <div className="App">
      <div id="wrapper" className="home-page">
        <Banner></Banner>

        <section id="call-to-action-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-11">
                <h3>Welcome to the University of Barcelona</h3>
                <p>Sign In to access to your profile and handle your credentials</p>
              </div>
            </div>
            <div className="row">
              <div className= "content">
                <div className="login_form">
                    <div className="sign_in_vidchain">
                        <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Sign in with ViDChain</a>
                    </div>
                    <div className="login_manual_form">
                        <p>or</p>
                        <form action="#" method="post">
                            <div className="form-group">
                                <i className="fa fa-user"></i>
                                <input type="text" name="username" id="user" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <input type="password" name="username" id="pass" placeholder="Password" />
                            </div>
                                <button type="submit" className="btn btn-default" id="login_submit">Sign in</button>
                        </form> 
                        <div className="forget_pass one">
                            <a href="#"><i className="fa fa-question-circle" aria-hidden="true"></i>Forget Password</a>
                        </div>
                        <div className="forget_pass">
                            <a href="register.html"><i className="fa fa-user-plus" aria-hidden="true"></i>Didn't have a account? Register</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </section>
          
        <Content></Content>  
        <Footer></Footer>  
        </div>

          
        <a href="#" className="scrollup"><i className="fa fa-angle-up active"></i></a>
    </div>

    </div>
    
    );
  }
}

export default Home;
