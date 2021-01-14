import React, { Component } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {SignInButton} from "../../components/SignInButton/SignInButton";
import { OpenIDClient } from "../../libs/openid-connect/client";
import {Container} from '@material-ui/core';



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
      <div>
        <Header></Header>
        <Container className="content">
          <h1 className="title">Welcome to Freedonia</h1>
          <h5 className="subtitle">You can manage all the city services from this website: subscriptions, taxes...</h5>
          <SignInButton variant="contained" color="primary" onClick={() => this.loginWithVIDChain()}>
            Sign in with VIDchain
          </SignInButton>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
