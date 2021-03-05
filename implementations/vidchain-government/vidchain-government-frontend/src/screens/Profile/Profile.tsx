import React, { Component } from "react";
import "./Profile.css";
import {Typography, Grid, Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText} from '@material-ui/core';
import Header from "../../components/Header/Header";
import { ICredentialData, CredentialData, InputCredential, InputOptions } from "../../interfaces/dtos";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from "../../libs/openid-connect/client";
import * as utils from "../../utils/utils";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
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
    this.closeModal = this.closeModal.bind(this);
    this.gotBackToTutorial = this.gotBackToTutorial.bind(this);
  }

  componentDidMount() {
    try{
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
                  name: (credential.credentialSubject.firstName ? credential.credentialSubject.firstName : credential.credentialSubject.name) as string,
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
    catch(error){
      window.location.replace("/demo/government");
    }
  }
  /**
   *  VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateCredential() {
    const token = await vidchain.getAuthzToken();
    const credential: CredentialData = {
      credential: {
        type: ["VerifiableCredential", "LargeFamilyCard"],
        issuer: utils.getIssuerDid(token),
        id: "https://example.com/credential/2390",
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: this.state.did,
          name: "Large Family Card",
        }
      } as InputCredential,
        options: {
          eidasBridge: {
            password: config.eidasCertificatePassword,
          }
        } as InputOptions,
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
    
  };

  gotBackToTutorial = () => {
    sessionStorage.setItem("step", String(3))
    window.location.replace("/demo/tutorial?step=3");
  }

  render() {
    const {
      did,
      verifiableKYC,
      largeFamily,
      popUpisOpen
    } = this.state;
    return (
      <div className="profileHome">
        <Header />
      <Grid container 
        direction="column"
        justify="center"
        alignItems="center"
        className="profileHome">

        <Grid item className="titleProfile">
          <Typography variant="h2">{"Welcome to your\nFreedonia Citizen Portal"}</Typography>
          {/* <Typography variant="h1">{'Freedonia Citizen Portal'}</Typography> */}
          <Typography variant="h5">Here you can check your profile details and manage your activity within the Freedonia Citizen</Typography>
        </Grid>
        <Grid container
          direction="column"
          justify="space-between"
          alignItems="center" 
          className="panels">
            <ProfilePanel 
              title="Your Profile"
              userData={verifiableKYC}
              did={did}
              icon={profileIcon}
            />
            
            <ServicePanel 
              title="Request your Large Family credential"
              description="You can use it wherever you go: Public Service Providers, Universities, Schools..."
              requirements="In order to get this discount in your students ffees you will have to prove you are in a Large Family"
              credentialName="Present your Large Family Card Credential"
              icon={largeFamilyIcon}
              textButton="Get large family credential"
              functionClickButton={this.generateCredential}
              hasBeenRequested={largeFamily} />

            <Dialog
              open={popUpisOpen}
              onClose={this.closeModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Good Job!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                You have completed this step successfully.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.gotBackToTutorial} color="primary" autoFocus>
                Go back to tutorial
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
      </Grid>
      </div>
    );
  }
}

export default Profile;
