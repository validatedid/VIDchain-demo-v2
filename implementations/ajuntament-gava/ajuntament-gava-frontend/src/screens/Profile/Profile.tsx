import React, { Component } from "react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from "../../components/Official/Official";
import { UserInfo, CredentialData} from "../../interfaces/dtos";
import { Button } from "react-bootstrap";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from "../../libs/openid-connect/client";
import { VidchainClient } from "../../libs/openid-connect/vidchainClient";
import * as config from "../../config";

interface Props {
  user: string;
  location: any;
  history?: any;
}

interface State {
  userInfo: UserInfo;
  did: string;
  hasVerifiableId: boolean;
  largeFamily: boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {} as UserInfo,
      did: "",
      hasVerifiableId: false,
      largeFamily: false
    };
  }

  componentDidMount() {
    const userInfo = this.props.location.state.userData;
    this.setState({
      userInfo
    });
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log(userInfo.did);
    if (userInfo.did !== undefined && userInfo.did !== "") {
      this.setState({
        hasVerifiableId: true,
      });
    }
    var client = VidchainClient.getInstance().getClient();
    client.wipeTokens();
  }

  async loginWithVIDChain() {
    var client = VidchainClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "offline"],
        require: ["openid", "offline"],
      },
    });
  }
  /**
   *  VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateCredential() {
    const token = await vidchain.getAuthzToken();
    const credential: CredentialData = {
      type: ["VerifiableCredential", "LargeFamilyCard"],
      issuer: config.DID,
      id: "https://example.com/credential/2390",
      credentialSubject: {
        id: this.state.userInfo.did,
        name: "Large Family Card",
      },
    };
    await vidchain.generateVerifiableCredential(
      token,
      credential
    );
    this.setState({
      largeFamily: true,
    });
  }

  render() {
    const {
      did,
      userInfo,
      hasVerifiableId,
      largeFamily
    } = this.state;
    return (
      <div>
        <Official></Official>
        <Header></Header>
        <div className="content">
          <div className="wrapper">
            <div className="serviceCard">
              <div className="image-holder">
                <img src={require("../../assets/images/card.png")} alt="" />
              </div>
              <form action="">
                <h3 className="eID-text">Your profile</h3>
                <div className="form-row">
                  <h4>DID: </h4>
                  <p className="welcome">&nbsp;{userInfo.did}</p>
                </div>
                <div className="form-row">
                  <h4>Identifier: </h4>
                  <p className="welcome">&nbsp;{userInfo.identifier || "-"}</p>
                </div>
                <div className="form-row">
                  <h4>Name: </h4>
                  <p className="welcome">&nbsp;{userInfo.name || "-"}</p>
                </div>
                <div className="form-row">
                  <h4>Surnames: </h4>
                  <p className="welcome">&nbsp;{userInfo.surnames || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Surname1: </h4>
                  <p className="welcome">&nbsp;{userInfo.surname1 || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Surname2: </h4>
                  <p className="welcome">&nbsp;{userInfo.surname2 || "-"}</p>
                </div>
                <div className="form-row">
                  <h4>Method of Access: </h4>
                  <p className="welcome">&nbsp;{userInfo.method || "-"}</p>
                </div>
                <div className="form-row">
                  <h4>Prefix: </h4>
                  <p className="welcome">&nbsp;{userInfo.prefix || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Email: </h4>
                  <p className="welcome">&nbsp;{userInfo.email || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Country code: </h4>
                  <p className="welcome">&nbsp;{userInfo.countryCode|| "-"}</p>
                </div>
                <div className="form-row">
                  <h4>Assurance Level: </h4>
                  <p className="welcome">&nbsp;{userInfo.assuranceLevel || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Identifier Type: </h4>
                  <p className="welcome">&nbsp;{userInfo.identifierType || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Certificate Type: </h4>
                  <p className="welcome">&nbsp;{userInfo.certificateType || "-"}</p>
                </div>
                <div className="form-row">
                  <h4>Company ID: </h4>
                  <p className="welcome">&nbsp;{userInfo.companyId || "-"}</p>
                  &nbsp;&nbsp;
                  <h4>Company name: </h4>
                  <p className="welcome">&nbsp;{userInfo.companyName || "-"}</p>
                </div>
                {!hasVerifiableId && (
                  <Button
                    type="button"
                    className="collect-button"
                    onClick={() => this.loginWithVIDChain()}
                  >
                    Get official government ID
                  </Button>
                )}
              </form>
            </div>
            {hasVerifiableId && !largeFamily && (
              <div className="services">
                <div className="service">
                  <br />
                  <h5 className="eID-text">
                    <b>Request your Large Family credential.</b>
                  </h5>
                  <br></br>
                  <h5 className="eID-text">
                    <i>
                      You can use it wherever you go: Public Service Providers,
                      Universities, Schools,...
                    </i>
                  </h5>
                  <button
                    className="custom-button"
                    onClick={() => this.generateCredential()}
                  >
                    <b>Get Large Family credential</b>
                  </button>
                </div>
              </div>
            )}
            {hasVerifiableId && largeFamily && (
              <div className="services">
                <div className="service">
                  <br />
                  <h5 className="eID-text">
                    <i>Your credential has been sent.</i>
                  </h5>
                  <br></br>
                  <h4 className="eID-text">
                    <b>Check your wallet.</b>
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Profile;
