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
import { strB64dec } from "../../utils/utils";

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
    const code = new URLSearchParams(this.props.location.search).get("code");
    if(code){
    const token = await this.getAuthToken(code);
    if (token !== null) {
      this.setState({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        id_token: token.id_token,
        expires: token.expires,
      });
      this.goToProfile();
    }

    if (localStorage.getItem("userPass")) {
      localStorage.clear();
      const verifiableKYC = utils.generateFakeCredential();
      let credentialSubject: ICredentialData = {
        id: verifiableKYC.id,
        firstName: verifiableKYC.name,
        lastName: verifiableKYC.surname,
        dateOfBirth: verifiableKYC.dateOfBirth,
        placeOfBirth: verifiableKYC.placeOfBirth,
        gender: verifiableKYC.sex,
        currentAddress: "Arago 179",
        city: "Barcelona",
        state: "Barcelona",
        zip: "08011",
      };
      /**
       *  VIDCHAIN API REQUEST: Generate VerifiableID
       * An authorization token is requested and it is used to request the generation of a verifiableID
       */
      const authToken = await vidchain.getAuthzToken();
      await vidchain.generateVerifiableID(authToken, credentialSubject);
      this.goToProfile();
    } else {
      this.setState({
        showCallback: true,
      });
    }
      this.initiateSocket();
      /**
       *  VIDCHAIN API REQUEST: Claim Verifiable Presentation (forwarded to backend)
       * The request of a Verifiable presentation is handled in the backend so as to process the whole flow there and receive a response from the API in a callback
       */
      //governmentBackend.claimVP(utils.getUserDid(this.state.id_token), "Login");
    }
  }

  async getAuthToken(code: string){
    try {
      const response = await governmentBackend.getToken(
        {
            code: code,
            client_id: config.CLIENT_ID,
            redirect_uri: config.REDIRECT_CALLBACK,
            grant_type: "authorization_code",
          }
      );
      return response;
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  parseResponse(){
    /**
     *  This information is not used here, just want to login
     */
    this.goToProfile();

  }


  async initiateSocket() {
    const socket = io(config.BACKEND_WS, {
      path: "/governmentws",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      this.setState({
        socketSession: socket.id,
      });
      const socketClient = {
        did: utils.getUserDid(this.state.id_token),
        clientId: this.state.socketSession,
      };
      socket.emit("whoami", socketClient);
    });

    socket.on("presentation", (msg: any) => {
      let presentation = strB64dec(msg.data.decrypted);

      let details = utils.decodeJWT(presentation.verifiableCredential[0]);

      /**
       *  This information is now only used to retrieve the user info whereas in a real scenario, the backend would take some of these attributes to map the information registered in the system's database (check) and authenticate the user
       */
      this.setState({
        verifiableKYC: {
          id: details.vc.credentialSubject.id,
          documentNumber: details.vc.credentialSubject.documentNumber,
          documentType: details.vc.credentialSubject.documentType,
          name: details.vc.credentialSubject.firstName,
          surname: details.vc.credentialSubject.lastName,
          fullName: details.vc.credentialSubject.fullName,
          nationality: details.vc.credentialSubject.nationality,
          stateIssuer: details.vc.credentialSubject.stateIssuer,
          issuingAuthority: details.vc.credentialSubject.issuingAuthority,
          dateOfExpiry: details.vc.credentialSubject.dateOfExpiry,
          dateOfBirth: details.vc.credentialSubject.dateOfBirth,
          placeOfBirth: details.vc.credentialSubject.placeOfBirth,
          sex: details.vc.credentialSubject.gender,
          personalNumber: details.vc.credentialSubject.personalNumber,
        },
      });
      this.goToProfile();
    });
  }

  goToProfile() {
    const { access_token, refresh_token, id_token } = this.state;
    this.props.history.push({
      pathname: "/profile",
      state: {
        access_token: access_token,
        refresh_token: refresh_token,
        id_token: id_token
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
