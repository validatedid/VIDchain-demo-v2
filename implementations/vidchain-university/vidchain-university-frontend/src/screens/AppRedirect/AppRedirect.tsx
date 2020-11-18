import React, { Component } from "react";
import "./AppRedirect.css";
import Footer from "../../components/Footer/Footer";
import { Redirect } from "react-router-dom";
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
  data: any;
  sessionId: string;
  type: string;
  did: string;
  socketSession: string;
}

class AppRedirect extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
      socketSession: "",
      sessionId: "",
      type: "",
      did: ""
    };
  }

  async componentDidMount() {
    const sessionId = new URLSearchParams(this.props.location.search).get("sessionId");
    const type = new URLSearchParams(this.props.location.search).get("type");
    const did = new URLSearchParams(this.props.location.search).get("did");
    if(sessionId && type && did){
      
        this.setState({
          sessionId,
          type,
          did,
        });

        this.initiateSocket();
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
        did: this.state.did,
        clientId: this.state.socketSession,
        lastSessionId: this.state.sessionId,
      };
      if(socketClient.clientId && socketClient.did && socketClient.lastSessionId && socketClient.clientId !== "" && socketClient.did !== "" && socketClient.lastSessionId !== "") socket.emit("whoami", socketClient);
    });

    socket.on("largeFamilyPresentation", (msg: any) => {
      console.log("arrived Presentation");
      let presentation = strB64dec(msg.data.decrypted);

      let details = utils.decodeJWT(presentation.verifiableCredential[0]);
      this.setState({
          data: details
      })
      /**
       *  This information is not used here, just want to login
       */
      this.goToProfile();
    });
  }

  goToProfile() {
    const { did, data, type } = this.state;
    this.props.history.push({
      pathname: "/profile",
      state: {
        did: did,
        type: type,
        data: data,
      },
    });
  }

  render() {
    const { did } = this.state;
    if (did != null) {
      return (
        <div>
          <HeaderLogin></HeaderLogin>
          <div className="fullContent">
            <section id="inner-headline">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="pageTitle">Validating</h2>
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
                        We are processing your query.
                      </h3>
                      <br></br>
                      <p>Waiting to validate your credential...</p>
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

export default AppRedirect;
