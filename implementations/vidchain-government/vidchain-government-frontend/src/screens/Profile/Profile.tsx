import React, { Component } from "react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from "../../components/Official/Official";
import { ICredentialData, CredentialData } from "../../interfaces/dtos";
import { Button } from "react-bootstrap";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from "../../libs/openid-connect/client";
import * as utils from "../../utils/utils";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";


interface Props {
  user: string;
  location: any;
  history?: any;
}

interface State {
  user: ICredentialData;
  did: string;
  largeFamily: boolean;
  hasVerifiableId: boolean;
  verifiableKYC: verifiableKYC;
  fakeLogin: boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {} as ICredentialData,
      largeFamily: false,
      did: "",
      verifiableKYC: {} as verifiableKYC,
      hasVerifiableId: false,
      fakeLogin: false,
    };
  }

  componentDidMount() {
    const {id_token, fakeLogin} = this.props.location.state;
    if (fakeLogin) {
      this.setState({
        did: "Not yet provided",
        verifiableKYC: utils.generateFakeCredential(),
        fakeLogin: true,
      });
    }
    if(id_token){
        const decodedIdToken = utils.decodeJWT(id_token);
        const jwt = decodedIdToken.jwt;
        if(jwt){
            const presentation: PresentationPayload = utils.decodeJWT(jwt);
            const credential: VerifiableCredential = presentation.vp.verifiableCredential[0] as VerifiableCredential;
            this.setState({
              verifiableKYC: {
                id: credential.credentialSubject.id as string,
                documentNumber: credential.credentialSubject.documentNumber as string,
                documentType: credential.credentialSubject.documentType as string,
                name: credential.credentialSubject.firstName as string,
                surname: credential.credentialSubject.lastName as string,
                fullName: credential.credentialSubject.fullName as string,
                nationality: credential.credentialSubject.nationality as string,
                stateIssuer: credential.credentialSubject.stateIssuer as string,
                issuingAuthority: credential.credentialSubject.issuingAuthority as string,
                dateOfExpiry: credential.credentialSubject.dateOfExpiry as string,
                dateOfBirth: credential.credentialSubject.dateOfBirth as string,
                placeOfBirth: credential.credentialSubject.placeOfBirth as string,
                sex: credential.credentialSubject.gender as string,
                personalNumber: credential.credentialSubject.personalNumber as string,
              },
            did: utils.getUserDid(this.props.location.state.id_token),
            hasVerifiableId: true,
          });
        }
    }
    if (this.state.did !== "") {
      this.setState({
        hasVerifiableId: true,
      });
    }
    var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens();
  }

  async loginWithVIDChain() {
    localStorage.setItem("userPass", "fakePass");
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid"]
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
        id: this.state.did,
        name: "Large Family Card",
      },
    };
    const response = await vidchain.generateVerifiableCredential(
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
      hasVerifiableId,
      fakeLogin,
      verifiableKYC,
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
                  <p className="welcome">&nbsp;{did}</p>
                </div>
                <div className="form-row">
                  <h4>Name: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.name}</p>
                </div>
                <div className="form-row">
                  <h4>Surname: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.surname}</p>
                </div>
                <div className="form-row">
                  <h4>Date Of Birth: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.dateOfBirth}</p>
                </div>
                <div className="form-row">
                  <h4>Document number: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.personalNumber}</p>
                </div>
                <div className="form-row">
                  <h4>Document type: </h4>
                  <p>&nbsp;{verifiableKYC.documentType}</p>
                </div>
                <div className="form-row">
                  <h4>Nationality: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.nationality}</p>
                </div>
                <div className="form-row">
                  <h4>State Issuer: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.stateIssuer}</p>
                </div>
                <div className="form-row">
                  <h4>Date of expiry: </h4>
                  <p className="welcome">&nbsp;{verifiableKYC.dateOfExpiry}</p>
                </div>
                {!hasVerifiableId && fakeLogin && (
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
