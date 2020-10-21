import React, { Component } from "react";
import "./VidchainIdentity.css";
import { VidchainClient } from "../../libs/openid-connect/vidchainClient";
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
import { UserInfo} from "../../interfaces/dtos";
import { ICredentialData } from "../../interfaces/dtos";
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
  socketSession: string;
  userInfo: UserInfo;
  showCallback: boolean;
  error: boolean;
}

class VidchainIdentity extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {} as UserInfo,
      access_token: "",
      refresh_token: "",
      id_token: "",
      expires: 0,
      socketSession: "",
      showCallback: false,
      error: false,
    };
  }

  async componentDidMount() {
    var client = VidchainClient.getInstance().getClient();
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
      this.setState({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        id_token: token.id_token,
        expires: token.expires,
      });
   
    const userInfo: UserInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
    const did = utils.getUserDid(this.state.id_token);
    userInfo.did = did;
    console.log(JSON.stringify(userInfo));

    let credentialSubject: ICredentialData = {
        id: userInfo.did,
        firstName: userInfo.name || "-",
        lastName: userInfo.surnames || "-",
        dateOfBirth: userInfo.surnames || "-",
        placeOfBirth: userInfo.surnames || "-",
        gender: userInfo.surnames || "-",
        currentAddress: userInfo.surnames || "-",
        city: userInfo.surnames || "-",
        state: userInfo.surnames || "-",
        zip: userInfo.surnames || "-",
      }
      /**
       *  VIDCHAIN API REQUEST: Generate VerifiableID
       * An authorization token is requested and it is used to request the generation of a verifiableID
       */
      const authToken = await vidchain.getAuthzToken();
      await vidchain.generateVerifiableID(authToken, credentialSubject);
      this.goToProfile(userInfo);
    }
    else{
        this.setState({
            showCallback: true
          });
    }
   
  }

  goToProfile(userInfo: UserInfo) {
    const { access_token, refresh_token, id_token } = this.state;
    this.props.history.push({
      pathname: "/profile",
      state: {
        userData: userInfo,
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
                <h2>Error with the identifications,</h2>
                <h2>please try again.</h2>
                <br></br>
                <br></br>
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

export default VidchainIdentity;
