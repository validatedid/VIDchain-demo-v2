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
  requested: boolean;
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
      requested: false,
      socketSession: "",
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
        request: ["openid", "offline"],
        require: ["openid", "offline"],
      },
    });
    if (token !== null) {
      console.log("Token: ", token);
      this.setState({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        id_token: token.id_token,
        expires: token.expires,
      });
    }
    if (!this.state.requested) {
      this.setState({
        requested: true,
      });
      this.initiateSocket();
      /**
       *  VIDCHAIN API REQUEST: Claim Verifiable Presentation (forwarded to backend)
       * The request of a Verifiable presentation must be handled in the backend so as to receive a response from the API in a callback
       */
      universityBackend.claimVP(utils.getUserDid(this.state.id_token), "Login");
    }
  }

  async initiateSocket() {
    const socket = io(config.BACKEND_WS, {
      path: "/universityws",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("socket connect!");
      this.setState({
        socketSession: socket.id,
      });
      const socketClient = {
        did: utils.getUserDid(this.state.id_token),
        clientId: this.state.socketSession,
      };
      socket.emit("whoami", socketClient);
      console.log("whoami.did: " + socketClient.did);
      console.log("whoami.clientId: " + socketClient.clientId);
    });

    socket.on("presentation", (msg: any) => {
      console.log("socket presentation notification!");
      console.log(msg);
      let presentation = JSON.parse(
        JSON.stringify(utils.strB64dec(msg.data.base64))
      );
      let details = JSON.stringify(
        utils.decodeJWT(presentation.verifiableCredential[0])
      );
      let detailsJSON = JSON.parse(details);
      /**
       *  This information is now only used to retrieve the user info whereas in a real scenario, the backend would take some of these attributes to map the information registered in the system's database (check) and authenticate the user
       */
      this.setState({
        verifiableKYC: {
          id: detailsJSON.vc.credentialSubject.id,
          documentNumber: detailsJSON.vc.credentialSubject.documentNumber,
          documentType: detailsJSON.vc.credentialSubject.documentType,
<<<<<<< HEAD
          name: detailsJSON.vc.credentialSubject.firstName,
          surname: detailsJSON.vc.credentialSubject.lastName,
=======
          name: detailsJSON.vc.credentialSubject.name,
          surname: detailsJSON.vc.credentialSubject.surname,
>>>>>>> master
          fullName: detailsJSON.vc.credentialSubject.fullName,
          nationality: detailsJSON.vc.credentialSubject.nationality,
          stateIssuer: detailsJSON.vc.credentialSubject.stateIssuer,
          issuingAuthority: detailsJSON.vc.credentialSubject.issuingAuthority,
          dateOfExpiry: detailsJSON.vc.credentialSubject.dateOfExpiry,
          dateOfBirth: detailsJSON.vc.credentialSubject.dateOfBirth,
          placeOfBirth: detailsJSON.vc.credentialSubject.placeOfBirth,
<<<<<<< HEAD
          sex: detailsJSON.vc.credentialSubject.gender,
=======
          sex: detailsJSON.vc.credentialSubject.sex,
>>>>>>> master
          personalNumber: detailsJSON.vc.credentialSubject.personalNumber,
        },
      });
      this.goToProfile();
    });
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
