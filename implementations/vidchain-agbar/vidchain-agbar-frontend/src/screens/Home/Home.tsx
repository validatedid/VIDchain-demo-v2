import React, { Component } from "react";
import "./Home.css";
import {Grid, Typography} from '@material-ui/core';
import Header from "../../components/Header/Header";
import {SignInButton} from "../../components/SignInButton/SignInButton";
import Footer from "../../components/Footer/Footer";
import { OpenIDClient } from "../../libs/openid-connect/client";

interface Props {
  history?: any;
}

interface State {}

class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);
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

  render() {
    return (
      <div>
        <Header />
        <Grid container 
          justify="space-between"
          alignItems="flex-start"
          className="content">
        <Grid
          item
          xs={12} >
          <Typography variant="h1"className="title">Accede a tu cuenta</Typography> 
        </Grid>
          <Grid xs={6} item className="gridFormLeft">
           <form id="formHome" action="/profile" method="post">
             <ul className="flex-outer">
               <li>
                 <label className="labelForm" htmlFor="fnif"> NIF / NIE(*)</label>
                 <input id="fname" className="inputForm" type="text" name="fname" required></input>
               </li>
               <li>
               <label className="labelForm" htmlFor="fpassw"> Contraseña(*) </label>
               <input id="fpassw" className="inputForm" type="password" name="fpassw" required ></input>
               </li>
               <li>
                 <input id = "submitButton" type="submit" value="Submit"></input>
               </li>
             </ul>
           </form>
          </Grid>
          <Grid xs={6}item className="gridFormRight">
            <img className="imageHome" src="https://www.aiguesdebarcelona.cat/ofexabpublic-theme/images/bg_userlogin_particular.jpg" alt="agbar imag home" />
          </Grid>
          {/* <SignInButton variant="contained" color="primary" className="buttonSignIn" onClick={() => this.loginWithVIDChain()}>
                Sign in with VIDchain
          </SignInButton> */}
          </Grid>
          <Grid xs={6}item className="test2">

          </Grid>
        <Footer></Footer>
      </div>
    );
  }
}


export default Home;
