import React, { Component } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {SignInButton} from "../../components/SignInButton/SignInButton";
import { OpenIDClient } from "../../libs/openid-connect/client";
import {Grid, Typography} from '@material-ui/core';



interface Props {
  history?: any;
}

interface State {
  name: string;
}



class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens();
    var tutorial = sessionStorage.getItem("tutorial");
    localStorage.clear();
    if (tutorial) sessionStorage.setItem("tutorial", tutorial);
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
      <div className="home">
        <Header />
        <Grid container 
          direction="column"
          justify="center"
          alignItems="flex-start"
          className="content">
          <Grid item className="titleHome">
            <Typography variant="h2">{"Welcome to your Health Care Center"}</Typography>
            <Typography variant="h5">From this website you can request your vaccination certificate, manage your appointments...</Typography>
          </Grid>
          <Grid item>
            <SignInButton variant="contained" className="buttonSignIn" color="primary" onClick={() => this.loginWithVIDChain()}>
              Sign in with VIDchain
            </SignInButton>
            </Grid>
          </Grid>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
