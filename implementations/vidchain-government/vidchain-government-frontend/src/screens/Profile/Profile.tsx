import React, { Component } from "react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ICredentialData, CredentialData } from "../../interfaces/dtos";
import { Button } from "react-bootstrap";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from "../../libs/openid-connect/client";
import * as utils from "../../utils/utils";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
import { Modal } from "react-bootstrap";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import ServicePanel from "../../components/ServicePanel/ServicePanel";

import profileIcon from "../../assets/images/profileIcon.svg";
import largeFamilyIcon from "../../assets/images/iconLargeFamily.svg";



interface Props {
  user: string;
  location: any;
  history?: any;
}

interface State {
  user: ICredentialData;
  did: string;
  largeFamily: boolean;
  verifiableKYC: verifiableKYC;
  popUpisOpen: boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {} as ICredentialData,
      largeFamily: false,
      did: "",
      verifiableKYC: {} as verifiableKYC,
      popUpisOpen: false
    };

    this.generateCredential = this.generateCredential.bind(this);
  }

  componentDidMount() {
    const {id_token} = this.props.location.state;
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
            did: utils.getUserDid(this.props.location.state.id_token)
          });
        }
      }
    var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens();
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
    if (sessionStorage.getItem("tutorial")) {
      this.openModal();
    }
  }

  openModal = () => this.setState({ popUpisOpen: true });
  closeModal = () => {
    this.setState({ popUpisOpen: false });
    sessionStorage.clear();
    window.location.replace("/demo/tutorial?step=3");
  };

  render() {
    const {
      did,
      verifiableKYC,
      largeFamily
    } = this.state;
    return (
      <div className="profileHome">
        {/* <Header></Header> */}
        <ProfilePanel 
          title="Your Profile"
          userData={verifiableKYC}
          did={did}
          icon={profileIcon}
          />
        
      {/* {!largeFamily && (
        <ServicePanel 
          title="Request your Large Family credential"
          description="You can use it wherever you go: Public Service Providers, Universities, Schools..."
          requirements="In order to get this discount in your students ffees you will have to prove you are in a Large Family"
          credentialName="Present your Large Family Card Credential"
          icon={largeFamilyIcon}
          functionClickButton={this.generateCredential}
        />
      )}
      {largeFamily && (
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
      )} */}
            <Modal show={this.state.popUpisOpen} onHide={this.closeModal} style={{opacity:1}}>
              <Modal.Header closeButton>
                <Modal.Title>Good Job!</Modal.Title>
                    </Modal.Header>
                      <Modal.Body>You have completed this step successfully.</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Go back to tutorial
                        </Button>
              </Modal.Footer>
            </Modal>
      </div>
    );
  }
}

export default Profile;
