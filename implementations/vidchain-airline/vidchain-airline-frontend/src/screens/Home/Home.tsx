import React, { Component } from "react";
import "./Home.css";
import {Grid, Typography} from '@material-ui/core';
import QRCode from 'qrcode.react';
import Header from "../../components/Header/Header";
import {SignInButton} from "../../components/SignInButton/SignInButton";
import Footer from "../../components/Footer/Footer";
import { OpenIDClient } from "../../libs/openid-connect/client";
import * as airlineBackend from '../../apis/airlineBackend';

interface Props {
  history?: any;
}

interface State {
  isQRdisplayed: boolean,
  qrContent: string
}

class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isQRdisplayed: false,
      qrContent: ''
    };
  }
  async componentDidMount() {
    var client = OpenIDClient.getInstance().getClient();
    await client.wipeTokens();
  }

  async loginWithVIDChain() {
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "VerifiableIdCredential"]
      }, 
    });
  }

  async loginWithDIDKeys() {
    var qr = await airlineBackend.didAuthResponse();
    this.setState({
      isQRdisplayed: true,
      qrContent: qr
    })
  }

  render() {
    const {isQRdisplayed, qrContent} = this.state;
    return (
      <div>
        <Header />
        <Grid container 
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className="content">
          <div className="subcontent"></div>
        <Grid item>
          <Typography variant="h2" className="title">Welcome to Oceanic Airlines</Typography> 
          <Typography variant="h5" className="subtitle"><b>We're happy to have you onboard. Login to your site to get your tickets.</b></Typography>
          
          {/* {isQRdisplayed && 
                <div className="QRDidKeys">
                  <Typography variant="h5" className="scanTitle"><b>Scan the QR code to login.</b></Typography>
                  <QRCode value={qrContent}  size={window.innerWidth <  1501 ? "136" : "286"}/>
                  </div>
                } */}
          <SignInButton variant="contained" color="primary" className="buttonSignIn" onClick={() => this.loginWithVIDChain()}>
                Sign in with VIDchain
          </SignInButton>
          {/* <SignInButton variant="contained" color="primary" className="buttonSignInDidKeys" onClick={() => this.loginWithDIDKeys()}>
                Sign in with did:keys
          </SignInButton> */}

          
          </Grid>
          
          </Grid>
          
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
