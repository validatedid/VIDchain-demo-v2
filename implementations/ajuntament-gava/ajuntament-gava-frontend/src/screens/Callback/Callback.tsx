import React, { Component } from "react";
import "./Callback.css";
import { OpenIDClient } from "../../libs/openid-connect/client";
import { Redirect } from "react-router-dom";
import Official from "../../components/Official/Official";
import Header from "../../components/Header/Header";
import io from "socket.io-client";
import Footer from "../../components/Footer/Footer";
import * as governmentBackend from "../../apis/governmentBackend";
import * as vidchain from "../../apis/vidchain";
import * as utils from "../../utils/utils";
import { verifiableKYC } from "../../interfaces/dtos";
import { Ring } from "react-spinners-css";
import { ICredentialData } from "../../interfaces/dtos";
import * as config from "../../config";
import axios from "axios";

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires: number;
  verifiableKYC: verifiableKYC;
  socketSession: string;
  showCallback: boolean;
  error: boolean;
}

class Callback extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      access_token: "",
      refresh_token: "",
      id_token: "",
      expires: 0,
      verifiableKYC: {} as verifiableKYC,
      socketSession: "",
      showCallback: false,
      error: false,
    };
  }

  async componentDidMount() {
    var client = OpenIDClient.getInstance().getClient();
    try {
      await client.callback();
    } catch (error) {
      console.log(error);
    }
    let token = await client.checkToken({
      scopes: {
        request: ["autenticacio_usuari"],
        require: ["autenticacio_usuari"],
      },
    });
    console.log("TOKEN: "+token);
    if (token !== null) {
      this.setState({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        id_token: token.id_token,
        expires: token.expires,
      });
    }
      this.setState({
        showCallback: true,
      });
      // this.initiateSocket();
      // /**
      //  *  VIDCHAIN API REQUEST: Claim Verifiable Presentation (forwarded to backend)
      //  * The request of a Verifiable presentation is handled in the backend so as to process the whole flow there and receive a response from the API in a callback
      //  */
      // governmentBackend.claimVP(utils.getUserDid(this.state.id_token), "Login");
  }


  goToProfile() {
    const { access_token, refresh_token, id_token, verifiableKYC } = this.state;
    this.props.history.push({
      pathname: "/profile",
      state: {
        access_token: access_token,
        refresh_token: refresh_token,
        id_token: id_token,
        verifiableKYC: verifiableKYC,
      },
    });
  }

  render() {
    const { access_token, error, showCallback } = this.state;
    if (access_token != null && !error) {
      return (
        <div>
          <Official></Official>
          <Header></Header>
          <div className="content">
            {showCallback && (
              <div className="wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h2>We have sent you a request to your wallet,</h2>
                <h2>please provide your Verifiable ID.</h2>
                <br></br>
                <p>Waiting to receive your credential...</p>
                <br></br>
                <div className="spinnerContainer">
                  <Ring color="red" />
                </div>
              </div>
            )}
            {!showCallback && (
              <div className="wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="spinnerContainer">
                  <Ring color="red" />
                </div>
              </div>
            )}
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Callback;
