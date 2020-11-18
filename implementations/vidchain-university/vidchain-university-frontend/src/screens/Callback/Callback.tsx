import React, { Component } from "react";
import "./Callback.css";
import Footer from "../../components/Footer/Footer";
import { OpenIDClient } from "../../libs/openid-connect/client";
import { Redirect } from "react-router-dom";
import { verifiableKYC } from "../../interfaces/dtos"; 
import * as utils from "../../utils/utils";
import * as universityBackend from "../../apis/universityBackend";
import io from "socket.io-client";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import { Ring } from "react-spinners-css";
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

        this.parseResponse();
      }

        this.initiateSocket();
        /**
         *  VIDCHAIN API REQUEST: Claim Verifiable Presentation (forwarded to backend)
         * The request of a Verifiable presentation must be handled in the backend so as to receive a response from the API in a callback
         */
        //universityBackend.claimVP(utils.getUserDid(this.state.id_token), "Login", "");
        
    }
  }

  parseResponse(){
    /**
     *  This information is not used here, just want to login
     */
    this.goToProfile();

  }

  async getAuthToken(code: string){
    try {
      const response = await universityBackend.getToken(
        {
            code: code,
            client_id: config.CLIENT_ID,
            redirect_uri: config.REDIRECT_CALLBACK,
            grant_type: "authorization_code",
          }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async initiateSocket() {
    const socket = io(config.BACKEND_WS, {
      path: "/universityws",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      this.setState({
        socketSession: socket.id,
      });
      const socketClient = {
        did: utils.getUserDid(this.state.id_token),
        clientId: this.state.socketSession,
        lastSessionId: ""
      };
      if(socketClient.clientId && socketClient.did && socketClient.clientId !== "" && socketClient.did !== "") socket.emit("whoami", socketClient);
    });

    socket.on("presentation", (msg: any) => {
      let presentation = strB64dec(msg.data.decrypted);

      let details = utils.decodeJWT(presentation.verifiableCredential[0]);
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
      /**
       *  This information is not used here, just want to login
       */
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
        id_token: id_token,
      },
    });
  }

  render() {
    const { access_token } = this.state;
    if (access_token != null) {
      return (
        <div>
          <HeaderLogin></HeaderLogin>
          <div className="fullContent">
            <section id="inner-headline">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="pageTitle">Authenticate</h2>
                  </div>
                </div>
              </div>
            </section>
            <section id="content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="about-logo">
                      <br></br>
                      <br></br>
                      <br></br>
                      <h3>
                        We have sent you a request to your wallet. Please,
                        provide your Verifiable ID.
                      </h3>
                      <br></br>
                      <p>Waiting to receive your credential...</p>
                      <br></br>
                      <br></br>
                      <div className="spinnerContainer">
                        <Ring color="orange" />
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer></Footer>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Callback;
