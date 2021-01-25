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
    sessionStorage.clear();
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

  async login() {
    if (this.state.name.toLowerCase() === "santi") {
      this.props.history.push({
        pathname: "/profile",
        state: {
          fakeLogin: true
        }
      });
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        <Grid container 
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className="content">
          <Grid item className="titleProfile">
            <Typography variant="h1">{"Welcome to Freedonia"}</Typography>
            <Typography variant="h6">You can manage all the city services from this website: subscriptions, taxes...</Typography>
          </Grid>
          <Grid item>
            <SignInButton variant="contained" color="primary" onClick={() => this.loginWithVIDChain()}>
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
