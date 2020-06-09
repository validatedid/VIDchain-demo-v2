import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import io from 'socket.io-client'
import axios from 'axios'
import * as config from '../../config';
import {
  Modal
} from "react-bootstrap";
import { startFlow } from "../../libs/openid-connect/openid-connect";
import { OpenIDClient } from '../../libs/openid-connect/client';
import * as utils from "../../utils/utils";
var ClientOAuth2 = require('client-oauth2')
var OAuth = require('@zalando/oauth2-client-js');
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
    // console.log(client);
    // console.log(process.env.REACT_APP_BACKEND_URL
    //   );
    // const socket = io(config.BACKEND_URL)
    // socket.on('login', (msg:any) => {
    //   console.log(msg);
    //   this.props.history.push(
    //     {
    //       pathname: '/registration',
    //       state: { did: msg, jwt: this.state.jwt }
    //     }
    //   ); 
    // });
    // socket.on('access', (msg:any) => {
    //   console.log(msg);
    //   this.props.history.push(
    //     {
    //       pathname: '/profile',
    //       state: { user: msg }
    //     }
    //   ); 
    // });
    // this.startConnection();
  }

  // async startConnection(){
  //   var jwt = await this.connectWithBackend();
  //   //Check if there is an error
  //   this.setState({
  //     jwt: jwt
  //   });
  // }

  // async connectWithBackend(){
  //   let data = {
  //       enterpriseName: config.Name,
  //       nonce: config.nonce
  //   };
  //   const response = await axios.post(config.API_URL + "token", data);
  //   return response.data.jwt;
  // }

  async loginWithVIDChain(){
    // var qrCodeContent = await this.generateContent();
    // //Check if there is an error
    // console.log(qrCodeContent);
    // this.setState({
    //   contentQR: qrCodeContent,
    //   showQR: true
    // });
    var client = OpenIDClient.getInstance().getClient();
    const ur = client.callback();
    client.getToken({
			scopes: {
				request: ["openid", "offline"],
				require: ["openid", "offline"]
      },
      response_type: "code"
		})
    console.log(ur);
    //const urlToRedirect = startFlow();
    // const nonce = utils.randomString(24);
    // const state = utils.randomString(24);
    // var client = OpenIDClient.getInstance().getClient();
    // var provider = OpenIDClient.getInstance().getProvider();
    // const urlToRedirect = provider.requestToken(client);
    // const urlToRedirect = client.code.getUri()
    //const urlToRedirect = OpenIDClient.getInstance().requestToken();
    //console.log(urlToRedirect);
    //window.location.href = urlToRedirect;
  }

  
  // async generateContent(){
  //   let authorization = {
  //     headers: {
  //       Authorization: "Bearer " + this.state.jwt
  //     }
  //   };
  //   let data = {
  //     issuer: config.DID,
  //     payload: {
  //       did: config.DID,
  //       url: config.BACKEND_URL + "/validate",
  //       nonce: this.randomIntFromInterval(100000,999999999)
  //     }
  //   };
  //   const response = await axios.post(config.API_URL + "signature", data, authorization);
  //   return response.data.signatureJWS;
  // }
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

    <Official></Official>
    <Header></Header>
    <div className= "content">
      <div className="login_form">
          <h4 className="mt-0">Manage your account online</h4><br/>
          <p>You can access your payment history, balance, bills, letters and set up or change a direct debit.</p>
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
    <div className="footer">
      <Footer></Footer>
    </div>

    </div>
    
    );
  }
}

export default Home;
